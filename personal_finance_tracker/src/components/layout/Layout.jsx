import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { theme } = useAppContext();

  return (
    <div
      className={`flex min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-slate-950"
      }`}
    >
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
