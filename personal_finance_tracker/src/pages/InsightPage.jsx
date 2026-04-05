import React from "react";
import Insights from "../components/dashboard/Insights";
import { useAppContext } from "../context/AppContext";

const InsightPage = () => {
  const { theme, highestSpendingCategory, totalTransactions, savingsStatus } =
    useAppContext();

  return (
    <div>
      {/* <h2
        className={`mb-6 text-2xl font-semibold ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        Insights
      </h2> */}

      <Insights
        highestSpendingCategory={highestSpendingCategory}
        totalTransactions={totalTransactions}
        savingsStatus={savingsStatus}
        theme={theme}
      />
    </div>
  );
};

export default InsightPage;
