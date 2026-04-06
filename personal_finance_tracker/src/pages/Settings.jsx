import React from "react";
import { useAppContext } from "../context/AppContext";

const Settings = () => {
  const { theme, setTheme, role, setRole } = useAppContext();

  const isLight = theme === "light";

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">
      <div className="min-w-0">
        <h2
          className={`text-2xl font-bold tracking-tight sm:text-3xl ${
            isLight ? "text-gray-900" : "text-white"
          }`}
        >
          Settings
        </h2>
        <p
          className={`mt-1 text-sm sm:text-base ${
            isLight ? "text-gray-500" : "text-slate-400"
          }`}
        >
          Customize your dashboard preferences and account view.
        </p>
      </div>

      <div
        className={`max-w-2xl rounded-2xl border p-4 shadow-sm sm:p-6 ${
          isLight ? "border-gray-200 bg-white" : "border-slate-800 bg-slate-900"
        }`}
      >
        <div className="space-y-6">
          {/* Theme */}
          <div>
            <p
              className={`mb-2 text-sm font-medium ${
                isLight ? "text-gray-700" : "text-slate-300"
              }`}
            >
              Theme
            </p>

            <button
              onClick={() => setTheme(isLight ? "dark" : "light")}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Switch to {isLight ? "Dark" : "Light"} Mode
            </button>
          </div>

          {/* Role */}
          <div>
            <p
              className={`mb-2 text-sm font-medium ${
                isLight ? "text-gray-700" : "text-slate-300"
              }`}
            >
              Role
            </p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none sm:w-56 ${
                isLight
                  ? "border-gray-300 bg-white text-gray-800"
                  : "border-slate-700 bg-slate-800 text-white"
              }`}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
