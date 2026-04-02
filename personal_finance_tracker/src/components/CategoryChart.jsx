import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const CategoryChart = ({ data }) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200 ">
      <h3 className="mb-4  text-lg font-semibold text-gray-800">Spending Breakdown</h3>
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
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
