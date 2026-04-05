import React, { useState } from "react";
import Layout from "./Layout";
import SummaryCard from "./dashboard/SummaryCard";
import Charts from "./dashboard/Charts";
import CategoryChart from "./dashboard/CategoryChart";
import Transactions from "./dashboard/Transactions";
import AddTransactionForm from "./dashboard/AddTransactionForm";
import { transactions as initialTransactions } from "../data/MockData";
import { useEffect } from "react";
import Insights from "./dashboard/Insights";

const Dashboard = () => {
  const [theme, setTheme] = useState("light");
  const [showForm, setShowForm] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  const [role, setRole] = useState("viewer");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ? true : item.type === filterType;

    return matchesSearch && matchesFilter;
  });

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
    (item) => item.type === "expense",
  );

  const categoryData = Object.values(
    expenseTransactions.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { name: item.category, value: 0 };
      }
      acc[item.category].value += item.amount;
      return acc;
    }, {}),
  );

  const highestSpendingCategory =
    categoryData.length > 0
      ? categoryData.reduce((max, item) =>
          item.value > max.value ? item : max,
        ).name
      : "";

  const totalTransactions = transactions.length;

  const savingsStatus =
    totalIncome > totalExpense ? "Saving well" : "Expenses are high";

  return (
    <div
      className={`min-h-screen ${theme === "light" ? " bg-gray-100" : "bg-slate-950"}`}
    >
      <Layout role={role} setRole={setRole} theme={theme} setTheme={setTheme} />
      <main className="p-6">
        <h2
          className={`mb-6 text-xl font-semibold ${theme === "light" ? "text-gray-800" : "text-white"}`}
        >
          Dashboard Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Total Balance"
            amount={totalBalance}
            color="text-blue-600"
            theme={theme}
          />
          <SummaryCard
            title="Total Income"
            amount={totalIncome}
            color="text-green-600"
            theme={theme}
          />
          <SummaryCard
            title="Total Expense"
            amount={totalExpense}
            color="text-red-600"
            theme={theme}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Charts data={chartData} />
          <CategoryChart data={categoryData} />
        </div>
        <div className="mt-6">
          <Insights
            highestSpendingCategory={highestSpendingCategory}
            totalTransactions={totalTransactions}
            savingsStatus={savingsStatus}
          />
        </div>

        {role === "admin" && (
          <div className="mt-6 flex justify-end">
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close Form" : "+ Add Transaction"}
            </button>
          </div>
        )}
        {role === "admin" && showForm && (
          <AddTransactionForm
            setTransactions={setTransactions}
            setShowForm={setShowForm}
          />
        )}

        <div className="mt-6">
          <Transactions
            transactions={filteredTransactions}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
