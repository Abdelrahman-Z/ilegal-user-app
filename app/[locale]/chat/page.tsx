// app/chat/page.tsx
"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePostConversationTitleMutation } from "@/redux/services/api";
import { getToken } from "@/utils";
import { jwtDecode } from "jwt-decode";
import { PhaseContentRenderer } from "@/components/chat/phaseContentRenderer";

type Message = {
  isUser: boolean;
  thinkingContent?: string;
  answerContent?: string;
};

const schema = yup.object({
  message: yup.string().required("Message is required"),
  knowledge_set: yup
    .string()
    .oneOf(["plead"], "Invalid knowledge set selection")
    .required("Knowledge set is required"),
});

type ChatFormValues = yup.InferType<typeof schema>;

export default function Page() {
  const [useReasoning, setUseReasoning] = useState(false);
  const [conversation_id, setConversation_id] = useState("");
  const path = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [postTitle] = usePostConversationTitleMutation();

  const { register, handleSubmit, reset, watch } = useForm<ChatFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { message: "", knowledge_set: "plead" },
  });

  const messageValue = watch("message");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = handleSubmit(async (data) => {
    setMessages((prev) => [
      ...prev,
      { isUser: true, thinkingContent: undefined, answerContent: data.message },
    ]);
    setIsLoading(true);
    const { tenantId } = jwtDecode((await getToken("token")) as string) as {
      tenantId: string;
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AI_ENDPOINT}/api/chatbot/ask?reasoning=${useReasoning}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            conversation_id,
            user_id: tenantId,
          }),
        }
      );

      if (!res.body) throw new Error("No response body");
      reset();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let aiText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;

        for (let line of lines) {
          if (!line.trim()) continue;
          line = line.replace(/^data:\s*/, "");
          try {
            const json = JSON.parse(line);
            if (json.full_content) {
              aiText = json.full_content;
              const phase = json.phase as "think" | "answer" | undefined;

              setMessages((prev) => {
                if (prev.length === 0 || prev[prev.length - 1].isUser) {
                  // No AI message yet, create new one
                  if (phase === "think") {
                    return [
                      ...prev,
                      {
                        isUser: false,
                        thinkingContent: aiText,
                        answerContent: "",
                      },
                    ];
                  } else if (phase === "answer") {
                    return [
                      ...prev,
                      {
                        isUser: false,
                        thinkingContent: "",
                        answerContent: aiText,
                      },
                    ];
                  }
                } else {
                  // Update last AI message
                  const updated = [...prev];
                  const lastMsg = updated[updated.length - 1];
                  if (phase === "think") {
                    lastMsg.thinkingContent = aiText;
                  } else if (phase === "answer") {
                    const cleanedAnswer = lastMsg.thinkingContent
                      ? aiText.replace(lastMsg.thinkingContent, "").trim()
                      : aiText;
                    lastMsg.answerContent = cleanedAnswer;
                  }
                  return updated;
                }
                return prev;
              });
            }
            if (json.done && json.conversation_id && isFirst) {
              setConversation_id(json.conversation_id);
              window.history.replaceState(
                null,
                "",
                `${path}/${json.conversation_id}`
              );
              setIsFirst(false);
              await postTitle({
                conversation_id: json.conversation_id,
              }).unwrap();
            }
          } catch (err) {
            console.error("JSON parse failed:", err, line);
          }
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 p-4"
      >
        <h1 className="text-lg font-semibold text-center">Chat Assistant</h1>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <AnimatePresence>
              <motion.p
                className="text-2xl font-medium text-gray-800 mb-6 flex justify-center items-center h-full"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                Welcome to the chat! How can I assist you today?
              </motion.p>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              {messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex ${
                      message.isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <motion.div
                      className={`flex items-start gap-2.5 max-w-3xl ${
                        message.isUser ? "ml-4" : "mr-4"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isUser
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {message.isUser ? "U" : "AI"}
                      </div>
                      <div
                        className={`p-4 rounded-lg ${
                          message.isUser
                            ? "bg-purple-500 text-white"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        {message.isUser ? (
                          <p className="text-sm">
                            {message.thinkingContent || message.answerContent}
                          </p>
                        ) : (
                          <div>
                            {message.thinkingContent && (
                              <PhaseContentRenderer
                                phase="think"
                                content={message.thinkingContent}
                              />
                            )}
                            {message.answerContent && (
                              <PhaseContentRenderer
                                phase="answer"
                                content={message.answerContent}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-gray-200 bg-white p-4"
      >
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              {...register("message")}
              placeholder="Type your message here..."
              className={`w-full p-4 pr-16 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            <motion.button
              type="button"
              onClick={() => setUseReasoning((prev) => !prev)}
              className={`absolute right-24 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md text-sm font-medium ${
                useReasoning
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Reasoning
            </motion.button>
            <motion.button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 text-white p-2 rounded-md disabled:bg-purple-300"
              disabled={!messageValue?.trim() || isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M1.20308 1.04312C1.00328 0.954998 0.772015 0.989787 0.603214 1.13461C0.434412 1.27943 0.355492 1.50146 0.394999 1.7224L1.52147 8.39169L8.53198 7.50061L1.20308 1.04312ZM1.52147 10.6087L0.394999 13.278C0.355492 13.4989 0.434412 13.721 0.603214 13.8658C0.772015 14.0106 1.00328 14.0454 1.20308 13.9573L14.7031 7.95729C14.8836 7.87878 15 7.70201 15 7.50061C15 7.29921 14.8836 7.12244 14.7031 7.04393L1.20308 1.04312L1.52147 8.39169V10.6087Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="text-xs text-center mt-2 text-gray-500"
        >
          Assistant is designed to be helpful, harmless, and honest.
        </motion.p>
      </motion.div>
    </div>
  );
}