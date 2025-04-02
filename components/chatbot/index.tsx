import React, { useState } from "react";
            import { MessageSquare } from "lucide-react";
            import { getGeminiResponse } from "@/utils/gemini";

            export default function Chatbot() {
              type ChatMessage = {
                role: "user" | "assistant";
                content: string;
              };

              const [userInput, setUserInput] = useState("");
              const [messages, setMessages] = useState<ChatMessage[]>([
                {
                  role: "assistant",
                  content:
                    "Hello! I'm RiverBot, your assistant for river pollution information. How can I help you today?",
                },
                {
                  role: "user",
                  content: "What are the main causes of river pollution in India?",
                },
                {
                  role: "assistant",
                  content: `The main causes of river pollution in India include:
            1. Untreated sewage discharge
            2. Industrial effluents
            3. Agricultural runoff
            4. Religious/cultural waste
            5. Solid waste dumping
            6. Sand mining and construction activities
            About 70-80% of river pollution in India comes from untreated urban sewage.`,
                },
                {
                  role: "user",
                  content: "How can I organize a river cleanup event in my community?",
                },
                {
                  role: "assistant",
                  content: `Organizing a river cleanup is a great initiative! Here's a step-by-step guide:
            1. Scout the location
            2. Get permits
            3. Gather supplies
            4. Recruit volunteers
            5. Safety briefing
            6. Arrange disposal
            You can use our Community page to create and promote your cleanup event!`,
                },
              ]);

              const handleSendMessage = async () => {
                if (!userInput.trim()) return;
                const newUserMessage: ChatMessage = { role: "user", content: userInput };
                setMessages((prev) => [...prev, newUserMessage]);
                setUserInput("");

                try {
                  const geminiResponse = await getGeminiResponse(userInput);
                  const newAssistantMessage: ChatMessage = {
                    role: "assistant",
                    content: geminiResponse?.content || "No response available.",
                  };
                  setMessages((prev) => [...prev, newAssistantMessage]);
                } catch (error) {
                  const errorMsg: ChatMessage = {
                    role: "assistant",
                    content: "Oops! Something went wrong, please try again.",
                  };
                  setMessages((prev) => [...prev, errorMsg]);
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

                  <div className="h-[400px] p-6 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`${
                              msg.role === "assistant"
                                ? "bg-white text-gray-800 rounded-tl-none"
                                : "bg-blue-500 text-white rounded-tr-none"
                            } rounded-lg p-4 max-w-[80%] shadow-sm`}
                          >
                            <p>{msg.content}</p>
                          </div>
                        </div>
                      ))}
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
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
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
                        onClick={() => setUserInput("What is biochemical oxygen demand (BOD)?")}
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
                          setUserInput("How does industrial pollution affect river ecosystems?")
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
                          setUserInput("What is eutrophication and how does it harm rivers?")
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
                          setUserInput("How can I test the water quality of a river near me?")
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
                          setUserInput("What laws protect rivers from pollution in India?")
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