import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Crown, Settings, Key } from "lucide-react";
import { DATA } from "../data";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("openai_api_key") || "";
    }
    return "";
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Greetings, traveler! I am the Royal Jester. Ask me anything about King Jean's exploits, and I shall entertain thee with knowledge!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("openai_api_key", key);
    setShowSettings(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await getBotResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Alas! My connection to the magical realm (API) has failed. Please check your key.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = async (query: string): Promise<string> => {
    // If no API key, use the fallback logic
    if (!apiKey) {
      // Simulate delay for realism
      await new Promise((resolve) => setTimeout(resolve, 600));
      return getFallbackResponse(query);
    }

    // Call OpenAI API
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a Royal Jester for King Jean Alvarez's portfolio. 
              Your persona is funny, archaic, and loyal. 
              Here is the data about Jean: ${JSON.stringify(DATA)}. 
              Answer the user's questions based on this data. 
              Keep answers short (under 3 sentences) and entertaining.`,
            },
            { role: "user", content: query },
          ],
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      return data.choices[0].message.content;
    } catch (error) {
      console.error("AI Error:", error);
      return "My crystal ball is cloudy (API Error). I shall revert to my simple scroll of answers.";
    }
  };

  const getFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("hello") || q.includes("hi") || q.includes("greetings")) {
      return "Huzzah! A warm welcome to you, noble guest. What brings you to the King's digital court?";
    }
    if (q.includes("who") || q.includes("name")) {
      return `He is known as ${DATA.name}, the Grand Wizard of Data and Analytics!`;
    }
    if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
      return `Ah, the King's arsenal! He wields ${DATA.skills.languages.join(", ")} like a master swordsman, and crafts spells with ${DATA.skills.libraries.join(", ")}.`;
    }
    if (q.includes("project") || q.includes("work") || q.includes("built")) {
      return `The King has built many wonders! Like the ${DATA.projects[0].title}, or the legendary ${DATA.projects[1].title}. Scroll down to witness them in all their glory!`;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
      return "You wish to send a raven? You may reach His Majesty via the 'Contact' section, or simply shout really loud... (or just email him).";
    }
    if (q.includes("resume") || q.includes("cv")) {
      return "The Royal Scroll! You can view his resume by clicking the button in the Hero section. It is a document of great power.";
    }
    if (q.includes("joke")) {
      return "Why did the data scientist break up with the graph? Because there was no correlation! *Jingles bells*";
    }

    return "Alas, I am but a simple fool without my magic key. Ask me about his skills, projects, or how to contact him!";
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-zinc-100 px-4 py-3 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">The Royal Jester</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {apiKey ? "Powered by AI Magic" : "Simple Mode"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="rounded-full p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Settings / Messages */}
            {showSettings ? (
              <div className="h-80 p-6 bg-zinc-50 dark:bg-zinc-950/50">
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Magic Settings</h4>
                <p className="text-xs text-zinc-500 mb-4">
                  Enter your OpenAI API Key to enable the smart AI Jester. The key is stored only in your browser.
                </p>
                <div className="space-y-3">
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={() => handleSaveKey(apiKey)}
                    className="w-full rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Save Key
                  </button>
                  <button
                    onClick={() => handleSaveKey("")}
                    className="w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  >
                    Clear Key
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-80 overflow-y-auto p-4 bg-zinc-50 dark:bg-zinc-950/50">
                <div className="flex flex-col gap-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                          msg.sender === "user"
                            ? "bg-emerald-600 text-white rounded-br-none"
                            : "bg-white text-zinc-800 shadow-sm dark:bg-zinc-900 dark:text-zinc-200 rounded-bl-none border border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-none bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                        <span className="animate-pulse">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Input */}
            {!showSettings && (
              <div className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={apiKey ? "Ask AI Jester..." : "Ask simple questions..."}
                    className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
