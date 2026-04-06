import React from "react";
import { NavLink } from "react-router-dom";
import {
  X,
  Menu,
  Home,
  Receipt,
  BarChart3,
  Lightbulb,
  Settings,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const Sidebar = ({ mobile = false, onClose }) => {
  const { theme } = useAppContext();

  const isLight = theme === "light";

  const navItems = [
    { to: "/", label: "Home", icon: Home, end: true },
    { to: "/transactions", label: "Transactions", icon: Receipt },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/insights", label: "Insights", icon: Lightbulb },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const handleNavClick = () => {
    if (mobile && onClose) onClose();
  };

  return (
    <aside
      className={`flex h-full flex-col border-r ${
        mobile ? "w-full" : "w-64 lg:w-72"
      } ${
        isLight ? "border-gray-200 bg-white" : "border-slate-800 bg-slate-900"
      }`}
    >
      {/* Top */}
      <div className="flex items-center justify-between border-b px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <BarChart3 size={20} />
          </div>

          <div className="min-w-0">
            <h2
              className={`truncate text-xl font-bold ${
                isLight ? "text-gray-800" : "text-white"
              }`}
            >
              FinTrack
            </h2>
            <p
              className={`text-xs ${
                isLight ? "text-gray-500" : "text-slate-400"
              }`}
            >
              Smart finance dashboard
            </p>
          </div>
        </div>

        {mobile ? (
          <button
            onClick={onClose}
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isLight
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-slate-800"
            }`}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        ) : (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isLight ? "text-gray-400" : "text-slate-500"
            }`}
          >
            <Menu size={20} />
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={handleNavClick}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? isLight
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-800 text-white"
                  : isLight
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-slate-300 hover:bg-slate-800",
              ].join(" ")
            }
          >
            <Icon size={20} className="shrink-0" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
