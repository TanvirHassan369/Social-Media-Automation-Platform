import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { MenuIcon } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Social Accounts",
  "/schedule": "Post Schedule",
  "/ai-composer": "AI Composer",
};
const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
  const title = pageTitles[currentPath] || "Social AI";
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-slate-50">
      {/* {Mobile Overlay} */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        setIsOpen={setIsMobileSidebarOpen}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* {Top Bar} */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            className="md:hidden p-2 -ml-2 text-slate-500 "
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <MenuIcon className="size-6" />
          </button>

          <div>
            <h1 className="text-slate-900">{title}</h1>
            <p className="text-sm text-slate-400 hidden sm:block">
              Manage your social media accounts and schedule posts
            </p>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
