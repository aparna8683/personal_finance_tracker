import React, { useState } from "react";

const AddTransactionForm = ({ setTransactions, setShowForm, theme }) => {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      date: formData.date,
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type,
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setFormData({
      date: "",
      description: "",
      amount: "",
      category: "",
      type: "expense",
    });

    setShowForm(false);
  };

  return (
    <div
      className={`mt-6 rounded-2xl border p-5 shadow-sm ${
        theme === "light"
          ? "border-gray-200 bg-white"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <h3
        className={`mb-4 text-lg font-semibold ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        Add New Transaction
      </h3>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`rounded-lg border px-4 py-2 text-sm outline-none ${
            theme === "light"
              ? "border-gray-300 bg-white text-gray-800"
              : "border-slate-700 bg-slate-800 text-white"
          }`}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={`rounded-lg border px-4 py-2 text-sm outline-none ${
            theme === "light"
              ? "border-gray-300 bg-white text-gray-800"
              : "border-slate-700 bg-slate-800 text-white"
          }`}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className={`rounded-lg border px-4 py-2 text-sm outline-none ${
            theme === "light"
              ? "border-gray-300 bg-white text-gray-800"
              : "border-slate-700 bg-slate-800 text-white"
          }`}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className={`rounded-lg border px-4 py-2 text-sm outline-none ${
            theme === "light"
              ? "border-gray-300 bg-white text-gray-800"
              : "border-slate-700 bg-slate-800 text-white"
          }`}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`rounded-lg border px-4 py-2 text-sm outline-none ${
            theme === "light"
              ? "border-gray-300 bg-white text-gray-800"
              : "border-slate-700 bg-slate-800 text-white"
          }`}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
