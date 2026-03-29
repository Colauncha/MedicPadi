import { useState } from "react";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import { INITIAL_MESSAGES } from "../../Data/DashboardData";

function ChatBubble({ from, text, isAi }) {
  return (
    <div className={`flex gap-2 mb-3 ${isAi ? "" : "flex-row-reverse"}`}>
      {isAi ? (
        <div className="w-7 h-7 rounded-full bg-[#150D5E] flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-[9px] font-bold">AI</span>
        </div>
      ) : (
        <Avatar name="D" size="w-7 h-7" bg="bg-gray-300" />
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
          isAi
            ? "bg-[#F3F4FF] text-gray-700 rounded-tl-sm"
            : "bg-[#150D5E] text-white rounded-tr-sm"
        }`}
      >
        <p className="font-semibold text-[10px] mb-0.5 opacity-60">{from}</p>
        {text}
      </div>
    </div>
  );
}

function AiPadiChat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "You", text: input, isAi: false }]);
    setInput("");
  };

  return (
    <div className="w-72 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col flex-shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#150D5E] flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">AI</span>
          </div>
          <span className="text-sm font-bold text-gray-800">Al Padi</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Icon name="expand" className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: "220px" }}>
        {messages.map((msg, i) => (
          <ChatBubble key={i} {...msg} />
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100">
        <button className="text-gray-400 hover:text-[#150D5E] transition-colors">
          <Icon name="plus" className="w-4 h-4" />
        </button>
        <input
          className="flex-1 text-xs text-gray-600 placeholder-gray-300 outline-none"
          placeholder="Type your question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="w-7 h-7 rounded-full bg-[#150D5E] text-white flex items-center justify-center hover:bg-[#1e1480] transition-colors"
        >
          <Icon name="send" className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default AiPadiChat;