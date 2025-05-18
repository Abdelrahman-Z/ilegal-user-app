"use client";

import { useParams } from "next/navigation";
import Markdown from "markdown-to-jsx";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import {
  useGetConversationMessagesQuery,
  usePostConversationTitleMutation,
} from "@/redux/services/api";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/utils";

type Message = {
  text: string;
  isUser: boolean;
};

const schema = yup.object({
  message: yup.string().required("Message is required"),
  knowledge_set: yup
    .string()
    .oneOf(["plead"], "Invalid knowledge set selection")
    .required("Knowledge set is required"),
});
type ChatFormValues = yup.InferType<typeof schema>;

export default function ConversationPage() {
  const { id: conversation_id } = useParams() as { id: string };
  const [isFirst, setIsFirst] = useState(true);

  // 1️⃣ Fetch the history
  const {
    data: convo,
    isLoading: isLoadingHistory,
    isError,
    refetch,
  } = useGetConversationMessagesQuery(conversation_id);
  const [postTitle] = usePostConversationTitleMutation();

  // Our local UI state of messages (history + new ones)
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // react-hook-form for the input
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChatFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { message: "", knowledge_set: "plead" },
  });
  const messageValue = watch("message");

  // 2️⃣ When the history arrives, seed our local state
  useEffect(() => {
    if (convo?.messages) {
      setMessages(
        convo.messages.map((m) => ({
          text: m.text,
          isUser: m.sender === "human",
        }))
      );
    }
  }, [convo]);

  // 3️⃣ Scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 4️⃣ Your existing streaming send logic
  const handleSendMessage = handleSubmit(async (data) => {
    // append user message immediately
    setMessages((prev) => [...prev, { text: data.message, isUser: true }]);
    setIsLoading(true);

    const { tenantId } = jwtDecode((await getToken("token")) as string) as {
      tenantId: string;
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AI_ENDPOINT}/api/chatbot/ask?reasoning=false`,
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
              setMessages((prev) => {
                // update last AI bubble if exists
                if (prev[prev.length - 1]?.isUser === false) {
                  const copy = [...prev];
                  copy[copy.length - 1].text = aiText;
                  return copy;
                }
                return [...prev, { text: aiText, isUser: false }];
              });
            }
            if (json.done && json.conversation_id && isFirst) {
              setIsFirst(false);
              await postTitle({
                conversation_id: json.conversation_id,
              }).unwrap();
            }
          } catch (err) {
            console.error("Streaming error:", err);
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
        className="bg-white border-b p-4 text-center"
      >
        <h1 className="text-lg font-semibold">
          Conversation: {convo?.title || "Loading..."}
        </h1>
      </motion.div>

      {/* 1. HISTORY LOADING / ERROR */}
      {isLoadingHistory ? (
        <div className="flex-1 flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            viewBox="0 0 24 24"
          >
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      ) : isError ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <p className="text-red-600">Failed to load messages.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      ) : (
        /* 2. MESSAGE LIST */
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 && (
              <p className="text-center text-gray-500">
                No messages in this conversation yet.
              </p>
            )}
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
                    whileHover={{ scale: 1.02 }}
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
                        <p className="text-sm">{message.text}</p>
                      ) : (
                        <div className="mt-5 whitespace-pre-wrap prose prose-slate max-w-none">
                          <Markdown>{message.text}</Markdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* 3. INPUT */}
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
              className={`w-full p-4 pr-16 rounded-lg border ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}

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
