import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Minimize2,
  Maximize2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function AgriGPTPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "👋 Hi! I'm AgriGPT. Quick farming question? Ask me here or visit the full chat!",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  // Don't show popup on AgriGPT page itself
  const shouldShowPopup = location.pathname !== "/agri-gpt";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick responses for popup
  const getQuickResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("rice") || message.includes("ধান")) {
      return "🌾 Rice: Plant in June-July, maintain 2-5cm water level. Need detailed guidance? Visit AgriGPT full chat!";
    }

    if (message.includes("wheat") || message.includes("গম")) {
      return "🌾 Wheat: Sow Nov-Dec, harvest Mar-Apr. For complete cultivation guide, check AgriGPT!";
    }

    if (message.includes("fertilizer") || message.includes("সার")) {
      return "🧪 Quick tip: Use NPK 120:60:60 kg/ha for most crops. Visit AgriGPT for specific recommendations!";
    }

    if (message.includes("disease") || message.includes("রোগ")) {
      return "🔬 Describe symptoms in AgriGPT full chat for accurate disease diagnosis and treatment!";
    }

    // Default response encouraging full chat
    return `💡 Great question! For detailed farming advice, visit our full AgriGPT chat. I can give you comprehensive guidance there!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: getQuickResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return shouldShowPopup ? (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={togglePopup}
            className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
          >
            <Bot className="w-6 h-6" />

            {/* Notification Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
              ?
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Ask AgriGPT! 🌱
              <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-slate-800"></div>
            </div>
          </button>
        </div>
      )}

      {/* Popup Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`bg-white rounded-2xl shadow-2xl border border-slate-200 transition-all duration-300 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold flex items-center">
                    AgriGPT
                    <Sparkles className="w-4 h-4 ml-1" />
                  </h4>
                  <p className="text-xs opacity-90">Quick farming help</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content - Hidden when minimized */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                          message.type === "user"
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "bot" && (
                            <Bot className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="whitespace-pre-wrap">
                              {message.content}
                            </div>
                            <div className={`text-xs mt-1 opacity-70`}>
                              {message.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 px-3 py-2 rounded-2xl">
                        <div className="flex items-center space-x-1">
                          <Bot className="w-4 h-4 text-emerald-600" />
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-200">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Quick farming question..."
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white p-2 rounded-xl transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Full Chat Link */}
                  <div className="mt-3 text-center">
                    <Link
                      to="/agri-gpt"
                      className="text-emerald-600 hover:text-emerald-700 text-xs font-medium flex items-center justify-center space-x-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Open Full AgriGPT Chat</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  ) : null;
}
