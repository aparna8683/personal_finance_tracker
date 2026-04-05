import React from "react";

const SummaryCard = ({ title, amount, color, theme }) => {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        theme === "light"
          ? "border-gray-200 bg-white"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wide ${
          theme === "light" ? "text-gray-500" : "text-slate-400"
        }`}
      >
        {title}
      </p>

      <h3 className={`mt-2 text-2xl font-bold ${color}`}>
        ₹{Number(amount).toLocaleString()}
      </h3>
    </div>
  );
};

export default SummaryCard;
