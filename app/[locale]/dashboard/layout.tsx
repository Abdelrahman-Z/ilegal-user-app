import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { ChatBot } from "@/components/dashboard/AIChatBot/ChatBot";
// import { ChatbotWidget } from "@/components/dashboard/AIChatBot/ChatbotWidget";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-wrap sm:flex-nowrap">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-deepBlue">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-4 overflow-auto flex-grow flex">{children}</main>
        <ChatBot/>
      </div>
      {/* <ChatbotWidget/> */}
    </div>
  );
}