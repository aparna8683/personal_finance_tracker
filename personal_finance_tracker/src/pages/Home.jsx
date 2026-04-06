import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Wallet,
  Receipt,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import SummaryCard from "../components/dashboard/SummaryCard";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const {
    theme,
    totalBalance,
    totalIncome,
    totalExpense,
    highestSpendingCategory,
    totalTransactions,
    savingsStatus,
    transactions = [],
  } = useAppContext();

  const isLight = theme === "light";

  const pageBg = isLight
    ? "bg-gray-50 text-gray-900"
    : "bg-[#020817] text-white";

  const cardBg = isLight
    ? "bg-white border border-gray-200 shadow-sm"
    : "bg-slate-900 border border-slate-800 shadow-sm";

  const mutedText = isLight ? "text-gray-500" : "text-gray-400";

  const savings = (Number(totalIncome) || 0) - (Number(totalExpense) || 0);

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className={`w-full min-w-0 ${pageBg}`}>
      <div className="mx-auto w-full max-w-7xl space-y-5 p-4 sm:space-y-6 sm:p-6">
        {/* Header */}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Financial Overview</h1>
          <p className={`mt-1 text-sm sm:text-base ${mutedText}`}>
            Track your balance, income, and expenses in one place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Net Balance"
            amount={totalBalance}
            color="text-blue-600"
            theme={theme}
          />
          <SummaryCard
            title="Total Inflow"
            amount={totalIncome}
            color="text-green-600"
            theme={theme}
          />
          <SummaryCard
            title="Total Outflow"
            amount={totalExpense}
            color="text-red-600"
            theme={theme}
          />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {/* Recent Activity */}
          <div
            className={`min-w-0 rounded-2xl p-4 sm:p-6 ${cardBg} lg:col-span-2`}
          >
            <div>
              <h3 className="text-lg font-semibold sm:text-xl">
                Recent Activity
              </h3>
              <p className={`mt-1 text-sm ${mutedText}`}>
                Latest transactions from your account.
              </p>
            </div>

            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3 py-3 sm:rounded-2xl sm:px-4 ${
                      isLight ? "bg-gray-50" : "bg-slate-800/70"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {item.category || item.title || "Transaction"}
                      </p>
                      <p className={`text-xs ${mutedText}`}>
                        {item.date || "Recently added"}
                      </p>
                    </div>

                    <p
                      className={`shrink-0 text-sm font-semibold sm:text-base ${
                        item.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <div
                  className={`rounded-2xl border border-dashed p-6 text-center ${mutedText}`}
                >
                  No recent transactions yet.
                </div>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className={`min-w-0 rounded-2xl p-4 sm:p-6 ${cardBg}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold sm:text-xl">
                  Quick Insights
                </h3>
                <p className={`mt-1 text-sm ${mutedText}`}>
                  A short summary of your spending.
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>

            <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
              {/* Top Category */}
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className={`text-xs ${mutedText}`}>Top Category</p>
                  <p className="truncate font-semibold">
                    {highestSpendingCategory || "N/A"}
                  </p>
                </div>
              </div>

              {/* Transactions */}
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <p className={`text-xs ${mutedText}`}>Transactions</p>
                  <p className="font-semibold">{totalTransactions || 0}</p>
                </div>
              </div>

              {/* Savings */}
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <PiggyBank className="h-4 w-4" />
                </div>
                <div>
                  <p className={`text-xs ${mutedText}`}>Savings Status</p>
                  <p className="font-semibold">{savingsStatus || "Stable"}</p>
                </div>
              </div>

              {/* Savings Box */}
              <div className="rounded-xl border border-dashed border-blue-400/30 p-4">
                <p className={`text-sm ${mutedText}`}>Current savings:</p>
                <p className="mt-1 text-xl font-bold text-blue-500 sm:text-2xl">
                  {formatCurrency(savings)}
                </p>
              </div>

              {/* CTA */}
              <Link
                to="/insights"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
              >
                View Full Insights
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
