import React from "react";
import Transactions from "../components/dashboard/Transactions";
import AddTransactionForm from "../components/dashboard/AddTransactionForm";
import { useAppContext } from "../context/AppContext";

const TransactionPage = () => {
  const {
    theme,
    role,
    showForm,
    setShowForm,
    setTransactions,
    filteredTransactions,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
  } = useAppContext();

  const isLight = theme === "light";

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${
              isLight ? "text-gray-900" : "text-white"
            }`}
          >
            Transactions
          </h2>
          <p
            className={`mt-1 text-sm sm:text-base ${
              isLight ? "text-gray-500" : "text-slate-400"
            }`}
          >
            Manage and review your recent income and expense activity.
          </p>
        </div>

        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            {showForm ? "Close Form" : "+ Add Transaction"}
          </button>
        )}
      </div>

      {role === "admin" && showForm && (
        <div className="min-w-0">
          <AddTransactionForm
            setTransactions={setTransactions}
            setShowForm={setShowForm}
            theme={theme}
          />
        </div>
      )}

      <div className="min-w-0">
        <Transactions
          transactions={filteredTransactions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
