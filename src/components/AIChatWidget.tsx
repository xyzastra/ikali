import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Trash2, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string; id: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SUGGESTED_QUESTIONS = [
  "What projects can I explore?",
  "Tell me about this site",
  "What skills are featured?",
];

const generateId = () => Math.random().toString(36).substring(2, 9);

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 80) + "px";
    }
  }, [input]);

  const streamChat = useCallback(async (allMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: allMessages.map(m => ({ role: m.role, content: m.content })) }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";
    const assistantId = generateId();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent, id: assistantId }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim(), id: generateId() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (e) {
      console.error("Chat error:", e);
      toast.error(e instanceof Error ? e.message : "Failed to get response");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const copyMessage = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
    toast.success("Chat cleared");
  };

  return (
    <>
      {/* Floating button - smaller on mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-3 z-50",
          "flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "transition-shadow duration-200",
          "hover:shadow-xl"
        )}
        aria-label="Open chat assistant"
      >
        <Sparkles className="h-5 w-5" />
      </motion.button>

      {/* Chat panel - full screen on mobile, compact on desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed z-50",
              // Mobile: full screen with safe areas
              "inset-0 md:inset-auto",
              // Desktop: positioned bottom-right, compact size
              "md:bottom-4 md:right-3",
              "md:w-80 md:h-[26rem] md:rounded-2xl",
              "bg-background border-0 md:border md:border-border shadow-2xl",
              "flex flex-col overflow-hidden"
            )}
          >
            {/* Header - compact */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium text-xs">brainOS</span>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={clearChat}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages - optimized for mobile */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 overscroll-contain">
              {messages.length === 0 ? (
                <div className="text-center py-6 md:py-4">
                  <Sparkles className="h-8 w-8 mx-auto mb-3 text-primary/60" />
                  <p className="text-muted-foreground text-xs mb-3 px-4">
                    Ask me anything about this portfolio
                  </p>
                  <div className="flex flex-col gap-1.5 px-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-2 rounded-lg bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex group",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        )}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                      {msg.role === "assistant" && (
                        <button
                          onClick={() => copyMessage(msg.content, msg.id)}
                          className="absolute -bottom-5 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - compact with character count */}
            <form onSubmit={handleSubmit} className="p-2 border-t border-border bg-muted/20 shrink-0">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message..."
                    rows={1}
                    className="w-full px-3 py-2 text-xs bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none overflow-hidden"
                    disabled={isLoading}
                    style={{ minHeight: "36px", maxHeight: "80px" }}
                  />
                  {input.length > 0 && (
                    <span className="absolute bottom-1 right-2 text-[10px] text-muted-foreground">
                      {input.length}/500
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading || input.length > 500}
                  className="h-9 w-9 rounded-xl shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
