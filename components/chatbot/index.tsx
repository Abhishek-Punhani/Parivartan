import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MessageSquare } from "lucide-react";
import { getGeminiResponse } from "@/utils/gemini";

export default function Chatbot() {
  type ChatMessage = {
    role: "user" | "assistant";
    content: string;
    isTyping?: boolean;
  };

  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({ top: messagesEndRef.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (content: string) => {
    let index = 0;
    const typingMessage: ChatMessage = { role: "assistant", content: "", isTyping: true };
    setMessages((prev) => [...prev, typingMessage]);

    const typingInterval = setInterval(() => {
      if (index < content.length) {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage.isTyping) {
            lastMessage.content = content.slice(0, index + 1);
          }
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(typingInterval);
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage.isTyping) {
            lastMessage.content = content;
            lastMessage.isTyping = false;
          }
          return updatedMessages;
        });
      }
    }, 30);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const geminiResponse = await getGeminiResponse(userInput);
      const combinedContent = geminiResponse.content.parts
        .map((part: { text: string }) => part.text)
        .join("");
      simulateTyping(combinedContent);
    } catch (error) {
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Oops! Something went wrong, please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Ask RiverBot</h3>
        <p className="text-gray-600">
          Our AI assistant can answer your questions about river pollution,
          cleanup methods, and more.
        </p>
      </div>

      <div className="h-[400px] p-6 overflow-y-auto bg-gray-50" ref={messagesEndRef}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${msg.role === "assistant"
                  ? "bg-white text-gray-800 rounded-tl-none"
                  : "bg-blue-500 text-white rounded-tr-none"
                  } rounded-lg p-4 max-w-[80%] shadow-sm`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-tl-none rounded-lg p-4 max-w-[80%] shadow-sm">
                <p className="animate-pulse">AI is typing...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question about river pollution..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!userInput.trim() || isLoading}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          This is a functional chatbot using Gemini for responses.
        </p>
      </div>
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Popular Questions
        </h3>
        <div className="space-y-3">
          <button
            className="w-full text-left px-4 py-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
            onClick={() =>{ setUserInput("What is biochemical oxygen demand (BOD)?")
              handleSendMessage();
            }}
          >
            <span className="text-gray-800">
              What is biochemical oxygen demand (BOD) and why is it important?
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
          <button
            className="w-full text-left px-4 py-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
            onClick={() =>
              {setUserInput("How does industrial pollution affect river ecosystems?")
                handleSendMessage();
              }
            }
          >
            <span className="text-gray-800">
              How does industrial pollution affect river ecosystems?
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
          <button
            className="w-full text-left px-4 py-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
            onClick={() =>
             { setUserInput("What is eutrophication and how does it harm rivers?")
              handleSendMessage();
             }
            }
          >
            <span className="text-gray-800">
              What is eutrophication and how does it harm rivers?
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
          <button
            className="w-full text-left px-4 py-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
            onClick={() =>
             { setUserInput("How can I test the water quality of a river near me?")
              handleSendMessage();
             }
            }
          >
            <span className="text-gray-800">
              How can I test the water quality of a river near me?
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
          <button
            className="w-full text-left px-4 py-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
            onClick={() =>
              {setUserInput("What laws protect rivers from pollution in India?")
                handleSendMessage();
              }
            }
          >
            <span className="text-gray-800">
              What laws protect rivers from pollution in India?
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
