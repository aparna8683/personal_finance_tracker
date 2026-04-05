import React from "react";
import {
  Wallet,
  ArrowDownUp,
  PiggyBank,
  TrendingDown,
  Lightbulb,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const Insights = () => {
  const {
    theme,
    highestSpendingCategory,
    totalTransactions,
    savingsStatus,
    totalIncome,
    totalExpense,
  } = useAppContext();

  const isLight = theme === "light";
  const savings = (totalIncome || 0) - (totalExpense || 0);

  const cardBase = isLight
    ? "bg-white border border-gray-200 text-gray-900 shadow-sm"
    : "bg-slate-900 border border-slate-800 text-white shadow-sm";

  const mutedText = isLight ? "text-gray-500" : "text-gray-400";
  const subCardBg = isLight
    ? "bg-white border border-gray-200"
    : "bg-slate-900 border border-slate-800";

  return (
    <section className="space-y-6">
      <div>
        <h2
          className={`text-3xl font-bold ${isLight ? "text-gray-900" : "text-white"}`}
        >
          Insights
        </h2>
        <p className={`mt-1 text-sm ${mutedText}`}>
          A quick overview of your spending habits and savings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <InsightCard
          title="Top Spending Category"
          value={highestSpendingCategory || "N/A"}
          subtitle="Where most money goes"
          icon={<Wallet size={20} />}
          accent="text-blue-500"
          cardBase={cardBase}
          mutedText={mutedText}
        />

        <InsightCard
          title="Total Transactions"
          value={totalTransactions || 0}
          subtitle="Activity level"
          icon={<ArrowDownUp size={20} />}
          accent="text-violet-500"
          cardBase={cardBase}
          mutedText={mutedText}
        />

        <InsightCard
          title="Savings Status"
          value={savingsStatus || "Stable"}
          subtitle={`Net savings: ₹${savings.toLocaleString("en-IN")}`}
          icon={<PiggyBank size={20} />}
          accent="text-green-500"
          cardBase={cardBase}
          mutedText={mutedText}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className={`rounded-3xl p-6 ${subCardBg} shadow-sm`}>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                isLight
                  ? "bg-red-50 text-red-500"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              <TrendingDown size={20} />
            </div>
            <h3
              className={`text-xl font-semibold ${isLight ? "text-gray-900" : "text-white"}`}
            >
              Spending Insight
            </h3>
          </div>

          <p className={`text-sm leading-7 ${mutedText}`}>
            You are spending most on{" "}
            <span className="font-semibold text-blue-500">
              {highestSpendingCategory || "N/A"}
            </span>
            . Try reducing expenses in this category a little to improve your
            monthly balance.
          </p>
        </div>

        <div className={`rounded-3xl p-6 ${subCardBg} shadow-sm`}>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                isLight
                  ? "bg-amber-50 text-amber-500"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              <Lightbulb size={20} />
            </div>
            <h3
              className={`text-xl font-semibold ${isLight ? "text-gray-900" : "text-white"}`}
            >
              Smart Suggestion
            </h3>
          </div>

          <p className={`text-sm leading-7 ${mutedText}`}>
            If you reduce your top spending category by just 10%, you could save
            around
            <span className="font-semibold"> ₹500–₹1000 </span>
            every month.
          </p>
        </div>
      </div>
    </section>
  );
};

const InsightCard = ({
  title,
  value,
  subtitle,
  icon,
  accent,
  cardBase,
  mutedText,
}) => {
  return (
    <div
      className={`rounded-3xl p-5 transition-all duration-200 hover:-translate-y-1 ${cardBase}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className={`text-sm font-medium ${mutedText}`}>{title}</p>
        <div className={`rounded-xl p-2 ${accent} bg-current/10`}>
          <span className="text-current">{icon}</span>
        </div>
      </div>

      <h3 className={`text-3xl font-bold ${accent}`}>{value}</h3>
      <p className={`mt-2 text-sm ${mutedText}`}>{subtitle}</p>
    </div>
  );
};

export default Insights;
