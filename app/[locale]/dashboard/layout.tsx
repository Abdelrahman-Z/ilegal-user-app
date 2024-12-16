import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen gap-5 p-2">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-800 rounded-3xl">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
