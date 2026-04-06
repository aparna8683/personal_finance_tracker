import React from "react";

const SummaryCard = ({ title, amount, color, theme }) => {
  const isLight = theme === "light";

  return (
    <div
      className={`w-full min-w-0 rounded-2xl border p-4 shadow-sm transition sm:rounded-3xl sm:p-5 ${
        isLight ? "border-gray-200 bg-white" : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-xs uppercase tracking-wide ${
            isLight ? "text-gray-500" : "text-slate-400"
          }`}
        >
          {title}
        </p>
      </div>

      <h3 className={`mt-2 break-words text-xl font-bold sm:text-2xl ${color}`}>
        ₹{Number(amount || 0).toLocaleString("en-IN")}
      </h3>
    </div>
  );
};

export default SummaryCard;
