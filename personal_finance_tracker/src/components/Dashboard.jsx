import React from "react";
import Layout from "./Layout";
import SummaryCard from "./SummaryCard";
import { transactions } from "../data/MockData";
import Charts from "./Charts";
import CategoryChart from "./CategoryChart";

const Dashboard = () => {
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalBalance = totalIncome - totalExpense;
  const chartData = transactions.map((item) => ({
    date: item.date,
    amount: item.type === "income" ? item.amount : -item.amount,
  }));
  const expenseTransactions = transactions.filter(
    (item) => (item) => item.type === "expemse",
  );

  const categoryObject = Object.values(
    expenseTransactions.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { name: item.category, value: 0 };
      }
      acc[item.category].value += item.amount;
      return acc;
    }, {}),
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <Layout />
      <main className="p-6 ">
        <h2 className="text-xl font-semibold text-gray-800">
          DashBoard Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Total Balance"
            amount={totalBalance}
            color="text-blue-600"
          />
          <SummaryCard
            title="Total Income"
            amount={totalIncome}
            color="text-green-600"
          />
          <SummaryCard
            title="Total Expense"
            amount={totalExpense}
            color="text-red-600"
          />
        </div>
        <div className="grid gap-6 lg: grid-cols-2">
          <Charts data={chartData} />
          <CategoryChart data={categoryObject} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
