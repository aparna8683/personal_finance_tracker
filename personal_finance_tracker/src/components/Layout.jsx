import React from "react";

const Layout = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Finance Dashboard</h1>
        <p className="text-sm text-gray-500">
          Track your money, spending , and insights
        </p>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-600">Role</label>
        <select className="rounded-lg border border-gray-300 px-2 py-2 text-sm outline-none focus:border-blue-500">
          <option>Viewer</option>
          <option>Admin</option>
        </select>
      </div>
    </header>
  );
};

export default Layout;
