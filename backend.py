import os
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from googletrans import Translator
import re

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize models
model = SentenceTransformer('all-MiniLM-L6-v2')
translator = Translator()

# Global data storage
excel_data = []
embeddings = []
excel_df = None

def load_excel_data():
    """Load and process Excel/CSV data"""
    global excel_data, embeddings, excel_df
    
    csv_path = os.path.join(os.path.dirname(__file__), 'src', 'assets', 'asd.csv')
    
    try:
        excel_df = pd.read_csv(csv_path)
        
        # Convert each row to text
        excel_data = []
        for idx, row in excel_df.iterrows():
            # Create a descriptive text from each row
            row_text = create_row_text(row)
            excel_data.append({
                'index': idx,
                'text': row_text,
                'original_row': row.to_dict()
            })
        
        # Create embeddings
        texts = [item['text'] for item in excel_data]
        embeddings = model.encode(texts)
        
        print(f"✓ Loaded {len(excel_data)} rows from CSV")
        return True
    except Exception as e:
        print(f"✗ Error loading Excel: {str(e)}")
        return False

def create_row_text(row):
    """Convert a DataFrame row into readable text"""
    text_parts = []
    
    for col, value in row.items():
        if pd.notna(value):
            # Clean and format the value
            value_str = str(value).strip()
            if value_str:
                text_parts.append(f"{col}: {value_str}")
    
    return ". ".join(text_parts) + "."

def is_roman_urdu(text):
    """Detect if text is Roman Urdu (contains Urdu words written in Latin script)"""
    roman_urdu_patterns = [
        r'\b(kya|hai|hain|ki|ka|ke|se|ko|ek|aur|ya|nahi|nahi|hai|haan)\b',
        r'(ay|ain|ee|oo|aa)\b',
        r'\b(test|exam|fees|passing|marks|date|fields|topics|rules)\b'
    ]
    
    text_lower = text.lower()
    for pattern in roman_urdu_patterns:
        if re.search(pattern, text_lower):
            return True
    return False

def translate_roman_urdu_to_english(text):
    """Translate Roman Urdu to English"""
    if is_roman_urdu(text):
        try:
            translated = translator.translate(text, src_lang='ur', dest_lang='en')
            return translated['text']
        except:
            # If translation fails, return original
            return text
    return text

def search_relevant_rows(question, top_k=3):
    """Find the most relevant rows from Excel based on the question"""
    global excel_data, embeddings, model
    
    # Get embedding of the question
    question_embedding = model.encode([question])[0]
    
    # Calculate similarity with all rows
    similarities = []
    for i, row_embedding in enumerate(embeddings):
        # Cosine similarity
        similarity = np.dot(question_embedding, row_embedding) / (
            np.linalg.norm(question_embedding) * np.linalg.norm(row_embedding)
        )
        similarities.append((i, similarity))
    
    # Sort by similarity and get top_k
    similarities.sort(key=lambda x: x[1], reverse=True)
    top_indices = [i for i, _ in similarities[:top_k]]
    
    relevant_rows = [excel_data[i]['text'] for i in top_indices if similarities[top_indices.index(i)][1] > 0.2]
    
    return relevant_rows

def ask_mistral(question, relevant_data):
    """Query Mistral API with relevant Excel data"""
    try:
        from mistralai.client import MistralClient
        from mistralai.models.chat_message import ChatMessage
        
        api_key = os.getenv('MISTRAL_API_KEY')
        if not api_key:
            return "Error: Mistral API key not configured"
        
        client = MistralClient(api_key=api_key)
        
        # Prepare the context
        context = "\n".join(relevant_data) if relevant_data else "No relevant data found"
        
        system_prompt = """You are an education assistant chatbot. Answer questions ONLY based on the provided Excel data about entry tests and universities. 
        
If the answer is not found in the provided data, clearly state: "I don't have information about this in the database."

Be concise and helpful. Provide accurate information only."""
        
        user_message = f"""Based on the following Excel data about entry tests and universities, answer this question:

Data:
{context}

Question: {question}

Provide a clear, concise answer based only on the data provided above."""
        
        messages = [
            ChatMessage(role="system", content=system_prompt),
            ChatMessage(role="user", content=user_message)
        ]
        
        response = client.chat(
            model="mistralai/devstral-2512",
            messages=messages,
            temperature=0.3,
            max_tokens=500
        )
        
        return response.choices[0].message.content
    
    except Exception as e:
        return f"Error communicating with Mistral: {str(e)}"

@app.route('/api/ask-bot', methods=['POST'])
def ask_bot():
    """Handle chat requests"""
    try:
        data = request.json
        user_question = data.get('question', '').strip()
        
        if not user_question:
            return jsonify({'error': 'Empty question'}), 400
        
        if not excel_data:
            return jsonify({'error': 'Data not loaded'}), 500
        
        # Detect and translate Roman Urdu if needed
        translation_note = ""
        if is_roman_urdu(user_question):
            english_question = translate_roman_urdu_to_english(user_question)
            translation_note = f"(Translated from Roman Urdu: {english_question})"
        else:
            english_question = user_question
        
        # Search for relevant rows
        relevant_rows = search_relevant_rows(english_question, top_k=3)
        
        # Get answer from Mistral
        answer = ask_mistral(english_question, relevant_rows)
        
        return jsonify({
            'success': True,
            'original_question': user_question,
            'english_question': english_question,
            'translation_note': translation_note,
            'answer': answer
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/load-data', methods=['GET'])
def load_data():
    """Initialize and load Excel data"""
    try:
        if load_excel_data():
            return jsonify({
                'success': True,
                'message': f'Loaded {len(excel_data)} entries from CSV',
                'data_count': len(excel_data)
            })
        else:
            return jsonify({'error': 'Failed to load data'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'data_loaded': len(excel_data) > 0,
        'data_count': len(excel_data)
    })

@app.before_request
def initialize():
    """Initialize data on first request"""
    if not excel_data:
        load_excel_data()

if __name__ == '__main__':
    load_excel_data()
    app.run(debug=True, port=5000)
