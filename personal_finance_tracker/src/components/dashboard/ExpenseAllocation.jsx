import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#22C55E",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const ExpenseAllocation = ({ data = [], theme }) => {
  const isLight = theme === "light";

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const totalExpense = sortedData.reduce(
    (sum, item) => sum + (Number(item.value) || 0),
    0,
  );

  const topCategory = sortedData[0]?.name || "N/A";
  const topAmount = sortedData[0]?.value || 0;

  return (
    <div
      className={`rounded-3xl border p-6 shadow-sm ${
        isLight ? "border-gray-200 bg-white" : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="mb-5">
        <h3
          className={`text-2xl font-semibold ${
            isLight ? "text-gray-800" : "text-white"
          }`}
        >
          Expense Allocation
        </h3>
        <p
          className={`mt-1 text-sm ${
            isLight ? "text-gray-500" : "text-slate-400"
          }`}
        >
          See where your expense amount is going.
        </p>
      </div>

      {sortedData.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sortedData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {sortedData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Expense"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: isLight ? "1px solid #E5E7EB" : "1px solid #334155",
                    backgroundColor: isLight ? "#ffffff" : "#0f172a",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`rounded-2xl border p-4 ${
                  isLight
                    ? "border-gray-200 bg-gray-50"
                    : "border-slate-700 bg-slate-800/60"
                }`}
              >
                <p
                  className={`text-xs ${
                    isLight ? "text-gray-500" : "text-slate-400"
                  }`}
                >
                  Total Expense
                </p>
                <p className="mt-2 text-lg font-semibold text-red-500">
                  {formatCurrency(totalExpense)}
                </p>
              </div>

              <div
                className={`rounded-2xl border p-4 ${
                  isLight
                    ? "border-gray-200 bg-gray-50"
                    : "border-slate-700 bg-slate-800/60"
                }`}
              >
                <p
                  className={`text-xs ${
                    isLight ? "text-gray-500" : "text-slate-400"
                  }`}
                >
                  Highest Category
                </p>
                <p className="mt-2 text-lg font-semibold text-blue-500">
                  {topCategory}
                </p>
              </div>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isLight
                  ? "border-gray-200 bg-gray-50"
                  : "border-slate-700 bg-slate-800/60"
              }`}
            >
              <h4
                className={`mb-4 text-sm font-semibold ${
                  isLight ? "text-gray-800" : "text-white"
                }`}
              >
                Category Breakdown
              </h4>

              <div className="space-y-4">
                {sortedData.map((item, index) => {
                  const percent = totalExpense
                    ? ((item.value / totalExpense) * 100).toFixed(1)
                    : 0;

                  return (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isLight ? "text-gray-800" : "text-white"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        <span
                          className={`text-sm ${
                            isLight ? "text-gray-600" : "text-slate-300"
                          }`}
                        >
                          {formatCurrency(item.value)} • {percent}%
                        </span>
                      </div>

                      <div
                        className={`h-2 w-full rounded-full ${
                          isLight ? "bg-gray-200" : "bg-slate-700"
                        }`}
                      >
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isLight
                  ? "border-gray-200 bg-blue-50"
                  : "border-slate-700 bg-slate-800/60"
              }`}
            >
              <p
                className={`text-sm leading-6 ${
                  isLight ? "text-gray-700" : "text-slate-300"
                }`}
              >
                Most of your expense is going to{" "}
                <span className="font-semibold text-blue-500">
                  {topCategory}
                </span>{" "}
                with a total of {formatCurrency(topAmount)}.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl border border-dashed p-8 text-center ${
            isLight
              ? "border-gray-300 text-gray-500"
              : "border-slate-700 text-slate-400"
          }`}
        >
          No expense data available yet.
        </div>
      )}
    </div>
  );
};

export default ExpenseAllocation;
