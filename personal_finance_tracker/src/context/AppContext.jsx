import React, { createContext, useContext, useEffect, useState } from "react";
import { transactions as initialTransactions } from "../data/MockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [role, setRole] = useState("viewer");
  const [showForm, setShowForm] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

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
      : "No expenses yet";

  const totalTransactions = transactions.length;

  const savingsStatus =
    totalIncome > totalExpense
      ? "💰 You are saving well"
      : "⚠️ Your expenses are high";

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        role,
        setRole,
        showForm,
        setShowForm,
        transactions,
        setTransactions,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        filteredTransactions,
        totalIncome,
        totalExpense,
        totalBalance,
        chartData,
        categoryData,
        highestSpendingCategory,
        totalTransactions,
        savingsStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
