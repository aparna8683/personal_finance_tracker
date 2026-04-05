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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2
          className={`text-2xl font-semibold ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Transactions
        </h2>

        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {showForm ? "Close Form" : "+ Add Transaction"}
          </button>
        )}
      </div>

      {role === "admin" && showForm && (
        <AddTransactionForm
          setTransactions={setTransactions}
          setShowForm={setShowForm}
          theme={theme}
        />
      )}

      <div className="mt-6">
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
