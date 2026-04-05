import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const CategoryChart = ({ data, theme }) => {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        theme === "light"
          ? "border-gray-200 bg-white"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <h3
        className={`mb-4 text-lg font-semibold ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        Expense Allocation
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
