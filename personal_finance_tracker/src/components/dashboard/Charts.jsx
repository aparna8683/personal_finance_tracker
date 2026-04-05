import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const Charts = ({ data = [], theme }) => {
  const isLight = theme === "light";

  const hasData = data.length > 0;

  const totalIncome = data.reduce(
    (sum, item) => sum + (Number(item.income) || 0),
    0,
  );
  const totalExpense = data.reduce(
    (sum, item) => sum + (Number(item.expense) || 0),
    0,
  );

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
          Cash Flow Overview
        </h3>
        <p
          className={`mt-1 text-sm ${
            isLight ? "text-gray-500" : "text-slate-400"
          }`}
        >
          Compare your income and expenses across dates.
        </p>
      </div>

      {hasData ? (
        <>
          <div className="mb-5 grid grid-cols-2 gap-4">
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
                Income Recorded
              </p>
              <p className="mt-2 text-xl font-semibold text-green-500">
                {formatCurrency(totalIncome)}
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
                Expense Recorded
              </p>
              <p className="mt-2 text-xl font-semibold text-red-500">
                {formatCurrency(totalExpense)}
              </p>
            </div>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isLight ? "#E5E7EB" : "#334155"}
                />

                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{
                    fill: isLight ? "#475569" : "#CBD5E1",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: isLight ? "#475569" : "#CBD5E1",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />

                <Tooltip
                  formatter={(value, name) => [formatCurrency(value), name]}
                  labelFormatter={(label) => formatDate(label)}
                  contentStyle={{
                    borderRadius: "12px",
                    border: isLight ? "1px solid #E5E7EB" : "1px solid #334155",
                    backgroundColor: isLight ? "#ffffff" : "#0f172a",
                  }}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Expense"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className={`mt-5 rounded-2xl border p-4 ${
              isLight
                ? "border-gray-200 bg-gray-50"
                : "border-slate-700 bg-slate-800/60"
            }`}
          >
            <h4
              className={`text-sm font-semibold ${
                isLight ? "text-gray-800" : "text-white"
              }`}
            >
              Quick Reading
            </h4>
            <p
              className={`mt-2 text-sm leading-6 ${
                isLight ? "text-gray-600" : "text-slate-300"
              }`}
            >
              The green line shows how much income was added on each date, while
              the red line shows your expenses. This helps compare earning and
              spending patterns clearly.
            </p>
          </div>
        </>
      ) : (
        <div
          className={`rounded-2xl border border-dashed p-8 text-center ${
            isLight
              ? "border-gray-300 text-gray-500"
              : "border-slate-700 text-slate-400"
          }`}
        >
          No chart data available yet.
        </div>
      )}
    </div>
  );
};

export default Charts;
