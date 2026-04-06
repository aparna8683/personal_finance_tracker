import React from "react";
import { useAppContext } from "../context/AppContext";
import Charts from "../components/dashboard/Charts";
import ExpenseAllocation from "../components/dashboard/ExpenseAllocation";
import { TrendingUp, TrendingDown, Wallet, PieChart } from "lucide-react";

const Analytics = () => {
  const { theme, transactions = [] } = useAppContext();

  const isLight = theme === "light";

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  // Group transactions by date
  const groupedByDate = transactions.reduce((acc, tx) => {
    const date = tx.date;
    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }

    if (tx.type === "income") {
      acc[date].income += Number(tx.amount) || 0;
    } else {
      acc[date].expense += Number(tx.amount) || 0;
    }

    return acc;
  }, {});

  const chartData = Object.values(groupedByDate).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Expense allocation data
  const expenseMap = {};
  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      const category = tx.category || "Other";
      expenseMap[category] =
        (expenseMap[category] || 0) + (Number(tx.amount) || 0);
    }
  });

  const expenseData = Object.entries(expenseMap).map(([name, value]) => ({
    name,
    value,
  }));

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

  const netFlow = totalIncome - totalExpense;

  const sortedExpenseData = [...expenseData].sort((a, b) => b.value - a.value);
  const topCategory = sortedExpenseData[0]?.name || "N/A";

  const cardBg = isLight
    ? "bg-white border border-gray-200 shadow-sm"
    : "bg-slate-900 border border-slate-800 shadow-sm";

  const mutedText = isLight ? "text-gray-500" : "text-slate-400";

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">
      <div className="min-w-0">
        <h2
          className={`text-2xl font-bold tracking-tight sm:text-3xl ${
            isLight ? "text-gray-900" : "text-white"
          }`}
        >
          Analytics
        </h2>
        <p className={`mt-1 text-sm sm:text-base ${mutedText}`}>
          Understand your cash flow, expenses, and category-wise spending.
        </p>
      </div>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={<TrendingUp size={18} />}
          color="text-green-500"
          bg={cardBg}
          mutedText={mutedText}
        />
        <AnalyticsStatCard
          title="Total Expense"
          value={formatCurrency(totalExpense)}
          icon={<TrendingDown size={18} />}
          color="text-red-500"
          bg={cardBg}
          mutedText={mutedText}
        />
        <AnalyticsStatCard
          title="Net Flow"
          value={formatCurrency(netFlow)}
          icon={<Wallet size={18} />}
          color={netFlow >= 0 ? "text-blue-500" : "text-red-500"}
          bg={cardBg}
          mutedText={mutedText}
        />
        <AnalyticsStatCard
          title="Top Category"
          value={topCategory}
          icon={<PieChart size={18} />}
          color="text-violet-500"
          bg={cardBg}
          mutedText={mutedText}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
        <div className="min-w-0">
          <Charts data={chartData} theme={theme} />
        </div>

        <div className="min-w-0">
          <ExpenseAllocation data={expenseData} theme={theme} />
        </div>
      </div>
    </div>
  );
};

const AnalyticsStatCard = ({ title, value, icon, color, bg, mutedText }) => {
  return (
    <div className={`min-w-0 rounded-2xl p-4 sm:rounded-3xl sm:p-5 ${bg}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className={`text-sm ${mutedText}`}>{title}</p>
        <div className={`shrink-0 ${color}`}>{icon}</div>
      </div>

      <h3 className={`break-words text-xl font-bold sm:text-2xl ${color}`}>
        {value}
      </h3>
    </div>
  );
};

export default Analytics;
