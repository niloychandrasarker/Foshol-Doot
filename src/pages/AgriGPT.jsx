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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Bot className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                AgriGPT <Sparkles className="w-5 h-5 text-yellow-500 ml-2" />
              </h1>
              <p className="text-sm text-gray-600">
                Your AI-Powered Farming Assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-6 py-6 h-[calc(100vh-200px)] flex flex-col">
        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mb-6 bg-white rounded-lg p-4 shadow-md border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
              Quick Questions to Get Started:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl px-4 py-3 rounded-lg shadow-md ${
                  message.type === "user"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-800 border border-green-200"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === "bot" && (
                    <Bot className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  )}
                  {message.type === "user" && (
                    <User className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-line">{message.content}</div>
                    <div
                      className={`text-xs mt-2 ${
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
              <div className="bg-white text-gray-800 border border-green-200 px-4 py-3 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-green-600" />
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
                  <span className="text-sm text-gray-500">
                    AgriGPT is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4">
          <div className="flex space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about farming... (e.g., How to grow rice? Best fertilizer for wheat?)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows="2"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
            <Leaf className="w-4 h-4 text-green-500" />
            <span>
              AgriGPT can help with crops, diseases, fertilizers, weather, and
              more!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
