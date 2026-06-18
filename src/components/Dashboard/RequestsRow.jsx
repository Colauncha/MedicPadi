import { useState } from "react";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import { REQUESTS, INITIAL_MESSAGES } from "../../Data/DashboardData";
import { CheckCircle2, XCircle, Edit3, Copy, ArrowDown, Plus, Send, Sparkles } from "lucide-react";
import doctor from "../../assets/image.svg";

// Appointment Requests
function RequestRow({ name, type, date }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#eef0f6] last:border-0">
      <div className="flex items-center gap-3">
        <Avatar name={name} size="w-[46px] h-[46px]" bg="bg-[#2D1FA3]" />
        <div>
          <p className="text-sm font-medium text-[#3d3d3d]">{name}</p>
          <p className="text-xs text-[#888888]">{type}</p>
          <p className="text-[10px] text-[#888888]">{date}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <div className="flex gap-2.5">
          <button className="text-[#331eb9] w-7 h-7 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </button>
          <button className="text-[#e5334b] w-7 h-7 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <button className="text-[10px] text-[#331eb9] underline">
          View details
        </button>
      </div>
    </div>
  );
}

function AppointmentRequests() {
  return (
    <div className="flex-1 bg-white border border-[#e7e7e7] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#464646] text-base">Appointment Request</h2>
        <button className="text-[#464646] text-sm">View All</button>
      </div>
      <div className="flex flex-col">
        {REQUESTS.map((req, i) => (
          <RequestRow key={i} {...req} />
        ))}
      </div>
    </div>
  );
}

// AI Padi Chat 
function AiPadiChat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "You", text: input, isAi: false }]);
    setInput("");
  };

  return (
    <div className="w-[340px] bg-white border border-[#e7e7e7] flex flex-col flex-shrink-0 overflow-hidden h-[420px]">
      {/* Header — centered like Figma */}
      <div className="py-4 border-b border-[#eef0f6] flex items-center justify-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="font-medium text-[#1a1a4b]">AI Padi</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {msg.isAi ? (
                  <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-[15px] h-[15px]" />
                  </div>
                ) : (
                  <img
                    src={doctor}
                    alt="You"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-[#1a1a4b] text-[14px]">
                  {msg.isAi ? "AI Padi" : "You"}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                {msg.isAi
                  ? <Copy className="w-[18px] h-[18px]" />
                  : <Edit3 className="w-[18px] h-[18px]" />
                }
              </button>
            </div>
            <p className="text-[13px] text-gray-500 pl-[42px] leading-relaxed">
              {msg.text}
            </p>
          </div>
        ))}

        <div className="flex justify-center mt-2">
          <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-[#eef0f6]">
        <div className="flex items-center gap-3 p-1 rounded-full border border-gray-200 bg-white">
          <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#1a1a4b] bg-[#f8f9fc] rounded-full ml-0.5">
            <Plus className="w-[22px] h-[22px]" />
          </button>
          <input
            type="text"
            placeholder="Type your question"
            className="flex-1 bg-transparent border-none focus:outline-none text-[14px] px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 flex items-center justify-center text-[#1a1a4b] bg-blue-50 hover:bg-blue-100 rounded-full mr-0.5"
          >
            <Send className="w-4 h-4 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RequestsRow() {
  return (
    <div className="flex gap-6">
      <AppointmentRequests />
      <AiPadiChat />
    </div>
  );
}