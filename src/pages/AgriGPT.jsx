import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Leaf,
  Sparkles,
  MessageCircle,
  Mic,
  Copy,
  ThumbsUp,
  MoreVertical,
} from "lucide-react";

export default function AgriGPT() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "🌱 Hello! I'm AgriGPT, your AI-powered farming assistant. How can I help you with your agricultural needs today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample agricultural responses
  const getAgriResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("rice") || message.includes("ধান")) {
      return "🌾 Rice farming tips:\n• Plant during monsoon season (June-July)\n• Maintain 2-5cm water level in fields\n• Use 120-150 kg/hectare fertilizer\n• Harvest when grain is 80% golden\n• Consider hybrid varieties like BRRI dhan29 for better yield";
    }

    if (message.includes("wheat") || message.includes("গম")) {
      return "🌾 Wheat cultivation guide:\n• Sow in November-December\n• Plant 100-120 kg seeds per hectare\n• Apply NPK fertilizer (120:60:60 kg/ha)\n• Irrigate 4-6 times during growth\n• Harvest in March-April when moisture is 20-25%";
    }

    if (
      message.includes("disease") ||
      message.includes("পোকা") ||
      message.includes("রোগ")
    ) {
      return "🔬 Common crop diseases:\n• **Blast disease** - Use resistant varieties, proper drainage\n• **Leaf blight** - Apply fungicide, remove infected leaves\n• **Bacterial wilt** - Crop rotation, disease-free seeds\n• **Aphids** - Use neem oil or insecticidal soap\nNeed specific help? Describe the symptoms!";
    }

    if (message.includes("fertilizer") || message.includes("সার")) {
      return "🧪 Fertilizer recommendations:\n• **Urea**: 250-300 kg/hectare for rice\n• **TSP**: 150-200 kg/hectare\n• **MOP**: 80-100 kg/hectare\n• **Organic**: Compost 5-10 tons/hectare\n• Apply in 3 splits: 50% at planting, 25% at tillering, 25% at flowering";
    }

    if (message.includes("weather") || message.includes("আবহাওয়া")) {
      return "🌤️ Weather considerations:\n• Monitor rainfall for irrigation planning\n• Avoid planting before heavy rains\n• Use weather apps for 7-day forecasts\n• Plan harvesting during dry periods\n• Consider climate-resistant crop varieties";
    }

    if (message.includes("soil") || message.includes("মাটি")) {
      return "🌱 Soil health tips:\n• Test soil pH (ideal: 6.0-7.5)\n• Add organic matter regularly\n• Practice crop rotation\n• Maintain proper drainage\n• Use cover crops to prevent erosion\n• Apply lime if soil is too acidic";
    }

    if (message.includes("pest") || message.includes("পোকামাকড়")) {
      return "🐛 Integrated Pest Management:\n• **Prevention**: Crop rotation, resistant varieties\n• **Biological**: Beneficial insects, birds\n• **Organic**: Neem oil, garlic spray\n• **Chemical**: Use only when necessary\n• **Monitoring**: Regular field inspection\nWhich pest are you dealing with?";
    }

    if (
      message.includes("price") ||
      message.includes("দাম") ||
      message.includes("market")
    ) {
      return "💰 Market information:\n• Check local market prices daily\n• Use mobile apps for real-time rates\n• Consider contract farming\n• Store properly to reduce post-harvest losses\n• Connect with farmer groups for better prices\nWhich crop prices do you need?";
    }

    // Default responses
    const defaultResponses = [
      "🤔 That's an interesting question! Could you provide more details about your specific farming situation?",
      "🌱 I'd be happy to help! Can you tell me more about your crop, location, or the specific challenge you're facing?",
      "💡 Great question! For the best advice, could you share more context about your farming operation?",
      "🔍 I want to give you the most accurate advice. What type of crops are you growing and in which region?",
      "📚 I can help with many farming topics! Try asking about specific crops, diseases, fertilizers, or farming techniques.",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
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

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: getAgriResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How to grow rice?",
    "Best fertilizer for wheat?",
    "Common crop diseases?",
    "Weather farming tips",
    "Soil health advice",
    "Pest control methods",
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full bg-white/90 backdrop-blur-sm shadow-lg border-b border-green-200/50 py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between rounded-b-3xl mt-0 mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl flex items-center justify-center shadow-md">
            <Bot className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              AgriGPT <Sparkles className="w-6 h-6 text-yellow-500" />
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 font-medium">
              Your AI-Powered Farming Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-1 sm:px-4 py-2 sm:py-4 flex flex-col gap-2">
        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-green-200/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
              Quick Questions to Get Started:
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-2xl border border-green-200/50 transition-all duration-200 text-sm w-full shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <span className="font-medium text-gray-800">{question}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl px-5 py-4 rounded-3xl shadow-md break-words transition-all duration-200 ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white rounded-br-lg"
                    : "bg-white/90 backdrop-blur-sm text-gray-800 border border-green-200/50 rounded-bl-lg"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.type === "bot" && (
                    <div className="bg-green-100 p-2 rounded-full mt-1">
                      <Bot className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                  )}
                  {message.type === "user" && (
                    <div className="bg-white/20 p-2 rounded-full mt-1">
                      <User className="w-5 h-5 text-white flex-shrink-0" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-line text-base leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-3 font-medium ${
                        message.type === "user"
                          ? "text-green-100"
                          : "text-gray-500"
                      }`}
                    >
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
              <div className="bg-white/90 backdrop-blur-sm text-gray-800 border border-green-200/50 px-5 py-4 rounded-3xl shadow-md">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Bot className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    AgriGPT is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - GPT Style */}
        <div className="sticky bottom-0 left-0 w-full bg-gradient-to-t from-green-50/90 via-green-50/50 to-transparent pt-6 z-10">
          <div className="max-w-4xl mx-auto px-2 sm:px-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200/50 flex items-center px-3 py-2 sm:py-3 gap-2 sm:gap-4">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming... (e.g., How to grow rice? Best fertilizer for wheat?)"
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 resize-none text-base focus:ring-0 rounded-xl min-h-[48px] max-h-32 text-gray-800 placeholder-gray-500"
                rows={1}
                disabled={isTyping}
                style={{
                  minHeight: "48px",
                  maxHeight: "120px",
                  overflow: "auto",
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 text-white p-3 sm:p-3.5 rounded-xl transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2 my-3 text-xs text-gray-600 px-3">
              <Leaf className="w-4 h-4 text-green-500" />
              <span className="font-medium">
                AgriGPT can help with crops, diseases, fertilizers, weather, and
                more!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add custom scrollbar styles
const styles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #10b981 #f0fdf4;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f0fdf4;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #059669;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
