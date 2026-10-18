import { useState, type FormEvent } from "react";


type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
}

type ChatApiResponse = {
  success: boolean;
  data?: {
    answer: string;
    sources: Array<{
      section: string;
      source: string;
      score: number;
    }>;
  };
  message?: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! Welcome to HotelLair. 👋 Ask me about our properties, amenities, or booking process.",
    },
  ]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = input.trim();

    if (!question || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const result: ChatApiResponse = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message ?? "Unable to get a response. Please try again."
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.data!.answer,
        },
      ]);
    } catch {
      setError(
        "Sorry, we couldn't reach the assistant. Please try again shortly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <section
          aria-label="HotelLair chat assistant"
          className="mb-4 flex h-[min(580px,calc(100dvh-7rem)] w-[min(380px,calc(100vw-2rem))] min-h-0 flex-col overflow-hidden overscroll-contain touch-pan-y rounded-2xl border border-gray-200 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
            <div>
              <h2 className="font-semibold">HotelLair Assistant</h2>
              <p className="mt-1 text-xs text-slate-300">
                Ask us anything about your stay
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full px-3 py-2 text-xl hover:bg-white/10"
            >
              ×
            </button>
          </header>

          <div
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-gray-50 p-4"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {messages.map((message) => (
              <div key={message.id}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-sm bg-slate-900 text-white"
                      : "rounded-bl-sm border border-gray-200 bg-white text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div
                role="status"
                className="text-sm text-gray-500"
              >
                HotelLair is thinking…
              </div>
            )}

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex gap-2 border-t border-gray-200 bg-white p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              aria-label="Your question"
              maxLength={2000}
              className="min-w-0 flex-1 overflow-y-auto overscroll-contain rounded-xl border border-gray-300 px-3 py-3 text-sm outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          className="flex h-14 items-center gap-3 rounded-full bg-slate-900 px-5 text-white shadow-lg transition hover:bg-slate-700"
        >
          <span aria-hidden="true" className="text-xl">
            {isOpen ? "×" : "✦"}
          </span>
          <span className="font-medium">
            {isOpen ? "Close chat" : "Chat with us"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;