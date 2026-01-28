from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import requests
from urllib.parse import quote
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load Excel data
EXCEL_FILE = "../public/assets/Entry_Test_FAQ.csv"

def load_excel_data():
    """Load and process Excel data"""
    try:
        df = pd.read_csv(EXCEL_FILE)
        # Convert all data to strings
        df = df.astype(str)
        return df
    except Exception as e:
        print(f"Error loading Excel: {e}")
        return None

def simple_similarity(text1, text2):
    """Calculate simple similarity between two texts based on keyword matching"""
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())
    
    if not words1 or not words2:
        return 0
    
    intersection = words1.intersection(words2)
    union = words1.union(words2)
    
    return len(intersection) / len(union)

def convert_row_to_text(row):
    """Convert a row into readable text format"""
    text_parts = []
    for col, value in row.items():
        if pd.notna(value) and value != 'nan':
            # Format: "Column name is value"
            text_parts.append(f"{col} is {value}")
    return ". ".join(text_parts) + "."

def translate_urdu_to_english(text):
    """Translate Roman Urdu to English using Mistral API"""
    api_key = os.getenv('MISTRAL_API_KEY')
    if not api_key:
        print("Warning: MISTRAL_API_KEY not set")
        return text
    
    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"""Translate this Roman Urdu text to English. Only provide the English translation, nothing else.

Roman Urdu: {text}
English:"""
        
        payload = {
            "model": "mistral-small-latest",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 100
        }
        
        response = requests.post(
            "https://api.mistral.ai/v1/chat/completions",
            json=payload,
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            translated = result['choices'][0]['message']['content'].strip()
            return translated
        else:
            print(f"Mistral translation error: {response.status_code}")
            return text
    except Exception as e:
        print(f"Translation error: {e}")
        return text

def detect_roman_urdu(text):
    """Simple detection of Roman Urdu (contains Urdu words/patterns)"""
    roman_urdu_patterns = ['ki', 'kya', 'hain', 'hai', 'kya hain', 'se', 'tak', 'aur', 'ya']
    text_lower = text.lower()
    return any(pattern in text_lower for pattern in roman_urdu_patterns)

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.json
        user_question = data.get('message', '').strip()
        
        if not user_question:
            return jsonify({'error': 'Empty message'}), 400
        
        # Load Excel data
        df = load_excel_data()
        if df is None:
            return jsonify({'error': 'Failed to load data'}), 500
        
        # Detect and translate Roman Urdu
        is_roman_urdu = detect_roman_urdu(user_question)
        display_question = user_question
        
        if is_roman_urdu:
            print(f"Detected Roman Urdu: {user_question}")
            user_question = translate_urdu_to_english(user_question)
            print(f"Translated to: {user_question}")
        
        # Convert all rows to text
        row_texts = []
        for idx, row in df.iterrows():
            text = convert_row_to_text(row)
            row_texts.append(text)
        
        # Find similar rows using simple keyword matching
        print("Searching for relevant data...")
        similarities = []
        for text in row_texts:
            sim = simple_similarity(user_question, text)
            similarities.append(sim)
        
        # Get top 3 matching rows
        similarities = list(similarities)
        top_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:3]
        
        # Filter by relevance threshold
        relevant_threshold = 0.1
        relevant_data = []
        for idx in top_indices:
            if similarities[idx] > relevant_threshold:
                relevant_data.append(row_texts[idx])
        
        if not relevant_data:
            return jsonify({
                'answer': 'I could not find relevant information about your question in the available data. Please rephrase your question.',
                'display_question': display_question,
                'is_roman_urdu': is_roman_urdu
            })
        
        # Send to Mistral with context
        api_key = os.getenv('MISTRAL_API_KEY')
        if not api_key:
            return jsonify({'error': 'API key not configured'}), 500
        
        context = "\n".join(relevant_data)
        prompt = f"""You are a helpful assistant that answers questions based ONLY on the provided data.

Data:
{context}

Answer the following question based ONLY on the data provided above. If the answer is not in the data, clearly state that the information is not available.

Question: {user_question}
Answer:"""
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "mistralai/devstral-2512",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
            "max_tokens": 300
        }
        
        response = requests.post(
            "https://api.mistral.ai/v1/chat/completions",
            json=payload,
            headers=headers,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            answer = result['choices'][0]['message']['content'].strip()
        else:
            print(f"Mistral error: {response.status_code} - {response.text}")
            answer = "Sorry, I encountered an error while processing your question."
        
        return jsonify({
            'answer': answer,
            'display_question': display_question,
            'is_roman_urdu': is_roman_urdu
        })
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})

# ============ EduHire AI Counselor Endpoints ============

def extract_profile_info(message, current_profile):
    """Extract user profile information from message"""
    message_lower = message.lower()
    updated_profile = current_profile.copy()
    
    # Education level detection
    if any(word in message_lower for word in ['12th', 'fsc', 'o-level', 'intermediate']):
        updated_profile['educationLevel'] = 'High School'
    elif any(word in message_lower for word in ['bachelor', 'graduation', 'undergrad', 'bsc', 'ba']):
        updated_profile['educationLevel'] = 'Bachelor\'s'
    elif any(word in message_lower for word in ['master', 'msc', 'ma', 'graduate', 'postgrad']):
        updated_profile['educationLevel'] = 'Master\'s'
    
    # Budget detection
    if any(word in message_lower for word in ['scholarship', 'funded', 'free']):
        updated_profile['budget'] = 'Scholarship Required'
    elif any(word in message_lower for word in ['20000', '30000', '40000', 'limited', 'tight']):
        updated_profile['budget'] = 'Limited ($20K-40K/year)'
    elif any(word in message_lower for word in ['50000', '60000', '70000', 'good', 'comfortable']):
        updated_profile['budget'] = 'Comfortable ($50K+/year)'
    
    # Country preference
    if any(word in message_lower for word in ['usa', 'america', 'united states', 'us']):
        updated_profile['countryPreference'] = 'USA'
    elif any(word in message_lower for word in ['uk', 'britain', 'england', 'london']):
        updated_profile['countryPreference'] = 'UK'
    elif any(word in message_lower for word in ['canada', 'toronto', 'vancouver']):
        updated_profile['countryPreference'] = 'Canada'
    elif any(word in message_lower for word in ['germany', 'berlin', 'munich']):
        updated_profile['countryPreference'] = 'Germany'
    elif any(word in message_lower for word in ['australia', 'sydney', 'melbourne']):
        updated_profile['countryPreference'] = 'Australia'
    elif any(word in message_lower for word in ['pakistan', 'lahore', 'karachi', 'isb', 'islamabad']):
        updated_profile['countryPreference'] = 'Pakistan'
    
    # Career goals
    if any(word in message_lower for word in ['engineer', 'engineering', 'tech', 'programmer', 'coding']):
        if 'careerGoals' not in updated_profile:
            updated_profile['careerGoals'] = []
        if 'Engineering/Tech' not in updated_profile['careerGoals']:
            updated_profile['careerGoals'].append('Engineering/Tech')
    
    if any(word in message_lower for word in ['doctor', 'medical', 'mbbs', 'bds', 'dentist', 'medicine']):
        if 'careerGoals' not in updated_profile:
            updated_profile['careerGoals'] = []
        if 'Medical' not in updated_profile['careerGoals']:
            updated_profile['careerGoals'].append('Medical')
    
    if any(word in message_lower for word in ['business', 'management', 'mba', 'finance', 'marketing']):
        if 'careerGoals' not in updated_profile:
            updated_profile['careerGoals'] = []
        if 'Business/Management' not in updated_profile['careerGoals']:
            updated_profile['careerGoals'].append('Business/Management')
    
    if any(word in message_lower for word in ['law', 'legal', 'llb', 'lawyer']):
        if 'careerGoals' not in updated_profile:
            updated_profile['careerGoals'] = []
        if 'Law' not in updated_profile['careerGoals']:
            updated_profile['careerGoals'].append('Law')
    
    return updated_profile

def generate_counselor_response(message, user_profile, conversation_history):
    """Generate personalized counselor response using EduHire AI logic"""
    
    message_lower = message.lower()
    
    # Profile building phase - ask for missing info
    missing_info = []
    if not user_profile.get('educationLevel'):
        missing_info.append('education background')
    if not user_profile.get('budget'):
        missing_info.append('budget/financial situation')
    if not user_profile.get('countryPreference'):
        missing_info.append('country preference')
    if not user_profile.get('careerGoals'):
        missing_info.append('career goals')
    
    # If gathering profile
    if len(conversation_history) <= 2 and missing_info:
        if 'educationLevel' not in user_profile:
            return "Hi! Thanks for reaching out. First, let me understand your profile better.\n\nWhat's your current education level?\n\n• 12th/FSC/O-Level (High School)\n• Bachelor's Degree\n• Master's Degree\n• Other"
        elif 'careerGoals' not in user_profile:
            return "Got it! Now, what are your career interests?\n\n• Engineering & Technology\n• Medical & Healthcare\n• Business & Management\n• Law\n• Other fields"
        elif 'budget' not in user_profile:
            return "Great! Now tell me about your budget for higher education:\n\n• Scholarship required (free/fully funded)\n• Limited budget ($20K-40K/year)\n• Comfortable budget ($50K+/year)"
        elif 'countryPreference' not in user_profile:
            return "Perfect! Which countries interest you for studying?\n\n• Pakistan\n• USA\n• UK\n• Canada\n• Germany\n• Australia\n• Multiple options"
    
    # General education queries
    if any(word in message_lower for word in ['entrance exam', 'ecat', 'mdcat', 'nat', 'usat', 'lat', 'entry test']):
        goals = user_profile.get('careerGoals', [])
        
        exams = "Here are the major entrance exams available:\n\n"
        
        # Check if medical-related
        if any('medical' in str(g).lower() or 'doctor' in str(g).lower() or 'mbbs' in str(g).lower() for g in goals):
            exams += "Medical Programs:\n• MDCAT - For medical and dental colleges\n• NAT-IM - NTS pre-medical aptitude test\n\n"
        
        # Check if engineering-related
        if any('engineer' in str(g).lower() or 'tech' in str(g).lower() for g in goals):
            exams += "Engineering Programs:\n• ECAT - Engineering admission test\n• NUST NET - NUST entry test\n• GIKI Entry Test - Ghulam Ishaq Khan Institute\n• PIEAS Entry Test - Engineering & Applied Sciences\n• NAT-IE - NTS engineering aptitude\n• ETEA - Engineering test (KPK region)\n\n"
        
        # Check if business/commerce related
        if any('business' in str(g).lower() or 'commerce' in str(g).lower() or 'economics' in str(g).lower() for g in goals):
            exams += "Business & Commerce:\n• IBA Aptitude Test - Top business school\n• NAT-ICOM - NTS commerce test\n• LUMS Test - Lahore University\n• COMSATS Test - Multiple campuses\n\n"
        
        # Check if international
        if any('abroad' in str(g).lower() or 'international' in str(g).lower() or 'usa' in str(g).lower() or 'uk' in str(g).lower() for g in goals):
            exams += "International Universities:\n• SAT - For US universities (1600 scale)\n• ACT - American college test (36 scale)\n• GRE - Graduate programs worldwide\n• GMAT - MBA programs globally\n\n"
        
        # General tests
        exams += "General Tests:\n• NTS NAT - Available for multiple fields\n• HEC USAT - For public universities\n• GAT-General - For MS/MPhil programs\n• GAT-Subject - For PhD programs\n\n"
        
        exams += "Tip: Explore the Entry Tests section for detailed preparation guides, schedules, and university requirements!"
        return exams
    
    # Scholarship queries
    if any(word in message_lower for word in ['scholarship', 'funding', 'financial aid', 'fully funded']):
        profile_str = f"your {user_profile.get('countryPreference', 'preferred')} preference and {user_profile.get('budget', 'your financial needs')}" if user_profile.get('countryPreference') or user_profile.get('budget') else "your profile"
        return f"Excellent question! Based on {profile_str}:\n\nTop Scholarship Options:\n\n• Chevening (UK)\n• Fulbright (USA)\n• DAAD (Germany)\n• Australia Awards\n• Canada Government Scholarships\n\nNext Steps:\n\n• Check your eligibility for each\n• Meet deadline requirements\n• Prepare strong SOP & documents\n\nVisit our Scholarships section for detailed info!"
    
    # University queries
    if any(word in message_lower for word in ['university', 'uni', 'college', 'admission', 'apply']):
        if user_profile.get('countryPreference'):
            return f"Great! For your goal of studying in {user_profile['countryPreference']}:\n\nTop considerations:\n\n• Academic requirements (GPA/scores)\n• Entrance exam preparation\n• Application deadlines\n• Visa requirements\n• Cost & scholarships\n\nMy recommendation: Start with the Universities section to explore options matching your profile!"
        else:
            return "I'd love to help! To recommend the best universities for you, could you tell me:\n\n• Which country are you interested in?\n• What's your career goal (Engineering, Medical, Business, etc.)?\n\nThis will help me give personalized suggestions!"
    
    # Merit calculation
    if any(word in message_lower for word in ['merit', 'calculate', 'percentage', 'aggregate']):
        return "Merit calculation varies by university! Here's the general approach:\n\nStandard Formula:\n\nAggregate = (FSC marks/1100 × 0.30) + (Entry Test/100 × 0.50) + (Interview/20 × 0.20)\n\nDifferent universities use different weights:\n\n• Some give 50% weight to entry test\n• Others emphasize interviews (20%)\n• Academic marks typically 30%\n\nCheck the Merit Calculator tool for detailed calculations!"
    
    # Tutors
    if any(word in message_lower for word in ['tutor', 'coaching', 'classes', 'teach', 'prep']):
        return "Great idea! Tutoring can really boost your preparation.\n\nWhy get a tutor?\n\n• Personalized attention\n• Focused on weak areas\n• Mock tests & feedback\n• Time-efficient preparation\n\nFind qualified tutors in the Tutors section!\n\nWhat subject do you need help with?"
    
    # Study abroad
    if any(word in message_lower for word in ['study abroad', 'international', 'overseas', 'visa']):
        return f"Studying abroad is an amazing opportunity! For {user_profile.get('countryPreference', 'your preferred country')}:\n\nKey Requirements:\n\n• Valid passport\n• Entrance exam scores\n• English proficiency (IELTS/TOEFL)\n• Strong academic record\n• Visa documentation\n• Financial proof\n\nStart exploring in the Study Abroad section!"
    
    # Default helpful response
    return "I'm here to help! Tell me more about:\n\n• Your education background & current level\n• Career aspirations\n• Budget constraints\n• Geographic preferences\n• Specific entrance exams or universities\n\nThe more details you share, the better personalized guidance I can provide!\n\nWhat would you like to explore first?"

@app.route('/api/edubot', methods=['POST'])
def edubot():
    """EduHire AI Counselor Endpoint"""
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        user_profile = data.get('userProfile', {})
        conversation_history = data.get('conversationHistory', [])
        
        if not message:
            return jsonify({'error': 'Empty message'}), 400
        
        # Extract and update user profile
        updated_profile = extract_profile_info(message, user_profile)
        
        # Generate counselor response
        response = generate_counselor_response(message, updated_profile, conversation_history)
        
        return jsonify({
            'answer': response,
            'updatedProfile': updated_profile,
            'success': True
        })
    
    except Exception as e:
        print(f"EduHire AI Error: {e}")
        return jsonify({
            'answer': '🤔 Sorry, I encountered an unexpected error. Please try rephrasing your question.',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("Starting Education Gate Backend with EduHire AI...")
    app.run(debug=True, port=5000)

