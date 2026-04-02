import React from "react";

const SummaryCard = ({ title, amount, color }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`mt-2 text-2xl font-bold ${color}`}>Rs. {amount}</h3>
    </div>
  );
};

export default SummaryCard; 
