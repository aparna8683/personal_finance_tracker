import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { theme } = useAppContext();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isLight = theme === "light";

  return (
    <div className={`min-h-screen ${isLight ? "bg-gray-100" : "bg-slate-950"}`}>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw]">
              <Sidebar mobile onClose={() => setIsMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

          <main className="min-w-0 flex-1 p-4 sm:p-5 lg:p-6">
            <div className="mx-auto w-full max-w-7xl min-w-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
