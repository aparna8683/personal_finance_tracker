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
    <div className={`min-h-screen ${pageBg}`}>
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <p className={`mt-1 text-sm ${mutedText}`}>
            Track your balance, income, and expenses in one place.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

        <div className="grid gap-6 xl:grid-cols-3">
          <div className={`rounded-3xl p-6 xl:col-span-2 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <p className={`mt-1 text-sm ${mutedText}`}>
                  Latest transactions from your account.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
                      isLight ? "bg-gray-50" : "bg-slate-800/70"
                    }`}
                  >
                    <div>
                      <p className="font-medium">
                        {item.category || item.title || "Transaction"}
                      </p>
                      <p className={`text-xs ${mutedText}`}>
                        {item.date || "Recently added"}
                      </p>
                    </div>

                    <p
                      className={`font-semibold ${
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

          <div className={`rounded-3xl p-6 ${cardBg}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">Quick Insights</h3>
                <p className={`mt-1 text-sm ${mutedText}`}>
                  A short summary of your spending.
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-2xl p-2 ${
                    isLight
                      ? "bg-blue-50 text-blue-600"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <p className={`text-xs ${mutedText}`}>Top Category</p>
                  <p className="font-semibold">
                    {highestSpendingCategory || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`rounded-2xl p-2 ${
                    isLight
                      ? "bg-purple-50 text-purple-600"
                      : "bg-purple-500/10 text-purple-400"
                  }`}
                >
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <p className={`text-xs ${mutedText}`}>Transactions</p>
                  <p className="font-semibold">{totalTransactions || 0}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`rounded-2xl p-2 ${
                    isLight
                      ? "bg-green-50 text-green-600"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  <PiggyBank className="h-4 w-4" />
                </div>
                <div>
                  <p className={`text-xs ${mutedText}`}>Savings Status</p>
                  <p className="font-semibold">{savingsStatus || "Stable"}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-blue-400/30 p-4">
                <p className={`text-sm ${mutedText}`}>Current savings:</p>
                <p className="mt-1 text-2xl font-bold text-blue-500">
                  {formatCurrency(savings)}
                </p>
              </div>

              <Link
                to="/insights"
                className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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
