import { useState } from "react";
import Sidebar from "./Sidebar";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <main className="relative min-h-screen p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}