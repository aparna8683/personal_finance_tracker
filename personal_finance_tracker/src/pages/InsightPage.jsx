import React from "react";
import Insights from "../components/dashboard/Insights";
import { useAppContext } from "../context/AppContext";

const InsightPage = () => {
  const { theme, highestSpendingCategory, totalTransactions, savingsStatus } =
    useAppContext();

  const isLight = theme === "light";

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">
      <div className="min-w-0">
        <h2
          className={`text-2xl font-bold tracking-tight sm:text-3xl ${
            isLight ? "text-gray-900" : "text-white"
          }`}
        >
          Insights
        </h2>
        <p
          className={`mt-1 text-sm sm:text-base ${
            isLight ? "text-gray-500" : "text-slate-400"
          }`}
        >
          Get a quick summary of your spending behavior and savings trend.
        </p>
      </div>

      <div className="min-w-0">
        <Insights
          highestSpendingCategory={highestSpendingCategory}
          totalTransactions={totalTransactions}
          savingsStatus={savingsStatus}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default InsightPage;
