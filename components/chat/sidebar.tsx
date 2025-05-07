import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "@/utils";
import { jwtDecode } from "jwt-decode";
import { useGetConversationsQuery } from "@/redux/services/api";

interface ChatSidebarProps {
  onClose: () => void;
}

const ChatSidebar = ({ onClose }: ChatSidebarProps) => {
  const router = useRouter();
  const { locale, id } = useParams();
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetching conversations based on tenantId
  const {
    data: chatHistory,
    error: queryError,
    refetch,
  } = useGetConversationsQuery(tenantId, {
    skip: !tenantId, // Skip the request until tenantId is set
  });

  useEffect(() => {
    // Function to get and decode the token
    const getTokenAndDecode = async () => {
      try {
        const token = await getToken("token"); // replace with your actual token name
        if (token) {
          const decodedToken = jwtDecode(token) as { tenantId: string };
          setTenantId(decodedToken.tenantId); // Assuming tenantId is part of the payload
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        setError("Failed to decode token");
      }
    };
    getTokenAndDecode();
  }, []);

  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const chatItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (queryError || error) {
    return (
      <div className="h-screen w-[300px] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <motion.button
            onClick={() => router.push(`/${locale}/chat/`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-md flex items-center justify-center space-x-2"
          >
            <span>New Chat</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.70711 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H3.70711L6.85355 3.85355Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </motion.button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex justify-center items-center h-full">
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-[300px] bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <motion.button
          onClick={() => router.push(`/${locale}/chat/`)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-primary text-white rounded-md flex items-center justify-center space-x-2"
        >
          <span>New Chat</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.70711 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H3.70711L6.85355 3.85355Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <h2 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2 px-2">
          Recent chats
        </h2>
        <motion.ul
          className="space-y-1"
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          {chatHistory?.conversations?.map(
            (chat: {
              conversation_id: string;
              title: string;
              created_at: string;
            }) => (
              <motion.li
                key={chat.conversation_id}
                variants={chatItemVariants}
                onClick={() =>
                  router.push(`/${locale}/chat/${chat.conversation_id}`)
                }
                className={`rounded-lg cursor-pointer transition-all duration-200 ${
                  id === chat.conversation_id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <motion.div
                  className="flex justify-between items-center p-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-gray-600">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(chat.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            )
          )}
        </motion.ul>
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
            <span className="text-sm font-medium">U</span>
          </div>
          <div className="text-sm font-medium text-gray-700">User Account</div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
