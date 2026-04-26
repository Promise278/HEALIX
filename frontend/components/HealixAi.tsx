"use client";
import { useState } from "react";
import { MessageCircle, Send, X, Paperclip, Mic } from "lucide-react";
import { motion } from "framer-motion";

import Link from "next/link";

const HealixChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi, I’m Helara AI — your friendly health companion! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isFinal) return;

    const userMessage = { sender: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Map internal message format to AI role format
    const history = newMessages.map((msg) => ({
      role: msg.sender === "bot" ? "assistant" : "user",
      content: msg.text,
    }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ai/health`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ history }),
        }
      );

      const data = await res.json();

      if (data?.turnCount >= 4) {
        setIsFinal(true);
      }

      if (data?.content) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.content }]);
      } else if (data?.message) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "⚠️ Sorry, I couldn’t get a proper response from the AI.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Connection error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white p-4 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 md:w-[430px] w-96 md:h-[600px] h-96 max-h-[90vh] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#19c3ee] to-[#0cd660] text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold text-white">Helara 🤖</h3>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-sm max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-[#19c3ee] text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-3 bg-gray-100 rounded-xl text-sm text-gray-500">
                Helara is thinking...
              </div>
            )}
            {isFinal && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-xs text-emerald-800 font-medium mb-3">
                  Clinical assessment complete. You can now consult a verified specialist.
                </p>
                <Link href="/pages/doctors">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors shadow-sm w-full">
                    Find a Doctor
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Input Area */}
          {!isFinal && (
            <div className="flex items-center border-t border-gray-200">
              <label
                htmlFor="fileUpload"
                className="p-3 text-[#19c3ee] hover:text-[#0cd660] cursor-pointer"
                title="Upload health document"
              >
                <Paperclip className="w-5 h-5" />
              </label>
              <input
                type="file"
                id="fileUpload"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a health question..."
                className="flex-1 p-3 outline-none text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="p-3 text-[#19c3ee] hover:text-[#0cd660]"
                disabled={loading}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSend}
                className="p-3 text-[#19c3ee] hover:text-[#0cd660]"
                disabled={loading}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {isFinal && (
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Consultation Ready
              </p>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default HealixChatbot;