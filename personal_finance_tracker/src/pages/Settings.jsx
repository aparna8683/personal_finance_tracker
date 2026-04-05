import React from "react";
import { useAppContext } from "../context/AppContext";

const Settings = () => {
  const { theme, setTheme, role, setRole } = useAppContext();

  return (
    <div>
      <h2
        className={`mb-6 text-2xl font-semibold ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        Settings
      </h2>

      <div
        className={`rounded-2xl border p-5 shadow-sm ${
          theme === "light"
            ? "border-gray-200 bg-white"
            : "border-slate-800 bg-slate-900"
        }`}
      >
        <div className="mb-6">
          <p
            className={`mb-2 text-sm font-medium ${
              theme === "light" ? "text-gray-700" : "text-slate-300"
            }`}
          >
            Theme
          </p>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        <div>
          <p
            className={`mb-2 text-sm font-medium ${
              theme === "light" ? "text-gray-700" : "text-slate-300"
            }`}
          >
            Role
          </p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`rounded-lg border px-3 py-2 text-sm outline-none ${
              theme === "light"
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
  );
};

export default Settings;
