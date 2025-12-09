import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Mic, MicOff, Trash2, Plus, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function AiEdubotPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load session on selection
  useEffect(() => {
    if (currentSessionId) {
      const session = sessions.find(s => s.id === currentSessionId);
      if (session) {
        setMessages(session.messages);
      }
    }
  }, [currentSessionId, sessions]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${new Date().toLocaleDateString()}`,
      messages: [],
      createdAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (!currentSessionId) {
      createNewSession();
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      // Update session
      setSessions(sessions.map(s =>
        s.id === currentSessionId
          ? { ...s, messages: finalMessages }
          : s
      ));

      setIsLoading(false);
    }, 800);
  };

  const getBotResponse = (userInput: string): string => {
    const responses: { [key: string]: string } = {
      hello: "Hello! I'm your AI EduBot. How can I help you with your education today?",
      merit: "I can help you calculate merit scores, understand university requirements, and prepare for entrance exams.",
      university: "I have information about various universities, their admission criteria, programs, and fees.",
      admission: "For admission inquiries, I can provide information about application deadlines, required documents, and eligibility criteria.",
      exam: "I can assist with information about various entrance exams like ECAT, MCAT, and provide study resources.",
      tutor: "I can help you find qualified tutors in your area. What subject are you interested in?",
      study: "I provide guidance on study abroad programs, visa requirements, and international universities.",
      default: "That's a great question! Can you provide more details so I can give you a better answer?",
    };

    const input = userInput.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (input.includes(key)) {
        return value;
      }
    }

    return responses.default;
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  const handleDeleteSession = () => {
    if (sessionToDelete) {
      const newSessions = sessions.filter(s => s.id !== sessionToDelete);
      setSessions(newSessions);
      if (currentSessionId === sessionToDelete) {
        setCurrentSessionId(newSessions.length > 0 ? newSessions[0].id : null);
        setMessages([]);
      }
    }
    setShowDeleteDialog(false);
    setSessionToDelete(null);
  };

  const clearAllHistory = () => {
    setSessions([]);
    setCurrentSessionId(null);
    setMessages([]);
  };

  // Splash Screen Component
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 pt-20 flex items-center justify-center overflow-hidden">
        {/* Background gradient matching application */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Animated decorative elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          {/* Logo with animation */}
          <div className="mb-8 animate-bounce" style={{ animationDuration: '2s' }}>
            <img 
              src={logo} 
              alt="EDU360 Logo" 
              className="h-24 w-auto drop-shadow-lg"
            />
          </div>

          {/* Tagline with fade-in animation */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight animate-fade-in-up">
              <span className="text-gradient">AI EduBot</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-body animate-fade-in-up max-w-lg" style={{ animationDelay: '0.2s' }}>
              Education for Everyone
            </p>
            
            {/* Loading indicator */}
            <div className="pt-8 flex justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/3 pt-20">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/6 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative flex h-[calc(100vh-80px)]">
        {/* Sidebar - Chat History */}
        <div
          className={cn(
            "bg-gradient-to-b from-primary/5 to-background/50 backdrop-blur-lg border-r border-primary/15 transition-all duration-300 overflow-hidden shadow-sm",
            sidebarOpen ? "w-64" : "w-0"
          )}
        >
          <div className="flex flex-col h-full p-4">
            {/* Back Button */}
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="w-full mb-2 text-primary hover:bg-primary/10 justify-start"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            
            {/* New Chat Button */}
            <Button
              onClick={createNewSession}
              className="w-full mb-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </Button>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {sessions.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm pt-4">
                  No chats yet. Start a new conversation!
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-all flex items-center justify-between group",
                      currentSessionId === session.id
                        ? "bg-primary/20 border border-primary/30 shadow-sm"
                        : "hover:bg-primary/10 border border-transparent hover:border-primary/20"
                    )}
                  >
                    <button
                      onClick={() => setCurrentSessionId(session.id)}
                      className="flex-1 text-left flex items-center gap-2 min-w-0"
                    >
                      <MessageSquare className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className="text-sm text-foreground truncate font-medium">
                        {session.title}
                      </span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSessionToDelete(session.id);
                        setShowDeleteDialog(true);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Clear History Button */}
            {sessions.length > 0 && (
              <Button
                onClick={clearAllHistory}
                variant="outline"
                className="w-full text-destructive border-destructive/20 hover:bg-destructive/10"
                size="sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-primary/15 bg-gradient-to-r from-background/90 via-primary/3 to-background/90 backdrop-blur-lg px-6 py-4 flex items-center justify-between shadow-sm">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-primary/10 rounded transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-primary" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gradient">
                AI EduBot
              </h1>
              <p className="text-sm text-muted-foreground">Your intelligent education assistant</p>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageSquare className="w-16 h-16 text-primary/20 mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to AI EduBot</h2>
                <p className="text-muted-foreground max-w-md">
                  Ask me anything about universities, entrance exams, merit calculations, tutors, or study abroad opportunities!
                </p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4 flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-xs lg:max-w-md px-4 py-3 rounded-xl",
                    message.sender === "user"
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-br-none shadow-md"
                      : "bg-gradient-to-br from-primary/8 to-accent/6 text-foreground rounded-bl-none border border-primary/20 shadow-sm"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gradient-to-br from-primary/8 to-accent/6 border border-primary/20 rounded-xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-primary/15 bg-gradient-to-r from-background/90 via-primary/3 to-background/90 backdrop-blur-lg p-6 shadow-md">
            <div className="flex gap-3 max-w-4xl mx-auto">
              <Button
                onClick={handleVoiceInput}
                variant={isListening ? "default" : "outline"}
                size="icon"
                className={cn(
                  isListening && "bg-primary hover:bg-primary/90"
                )}
                title="Voice input"
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    if (!currentSessionId) {
                      createNewSession();
                    }
                    sendMessage(input);
                  }
                }}
                placeholder="Ask me anything about education..."
                className="bg-gradient-to-r from-primary/5 to-accent/3 border-primary/20 focus:border-primary shadow-sm"
                disabled={isLoading}
              />
              <Button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground disabled:opacity-50 shadow-md"
                size="icon"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-gradient-to-br from-background to-primary/3 border-primary/15">
          <DialogHeader>
            <DialogTitle className="text-foreground">Delete Chat</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete this chat? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setShowDeleteDialog(false)}
              variant="outline"
              className="border-primary/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteSession}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
