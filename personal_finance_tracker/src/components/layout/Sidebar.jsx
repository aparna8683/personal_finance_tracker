import React from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  Home,
  Receipt,
  BarChart3,
  Lightbulb,
  Settings,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { theme, isSidebarOpen, setIsSidebarOpen } = useAppContext();

  const baseClass =
    "flex items-center rounded-lg py-3 text-sm font-medium transition-all duration-300";
  const activeClass =
    theme === "light" ? "bg-blue-100 text-blue-700" : "bg-slate-800 text-white";
  const inactiveClass =
    theme === "light"
      ? "text-gray-700 hover:bg-gray-100"
      : "text-slate-300 hover:bg-slate-800";

  const navItems = [
    { to: "/", label: "Home", icon: Home, end: true },
    { to: "/transactions", label: "Transactions", icon: Receipt },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/insights", label: "Insights", icon: Lightbulb },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`border-r p-4 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      } ${
        theme === "light"
          ? "border-gray-200 bg-white"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <div
        className={`mb-8 flex items-center ${
          isSidebarOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isSidebarOpen && (
          <h2
            className={`text-2xl font-bold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            FinTrack
          </h2>
        )}

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`rounded-lg p-2 transition ${
            theme === "light"
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white hover:bg-slate-800"
          }`}
        >
          <Menu size={22} />
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass} ${
                isSidebarOpen ? "justify-start px-4" : "justify-center px-0"
              }`
            }
          >
            <Icon size={20} className="shrink-0" />
            {isSidebarOpen && <span className="ml-3">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
