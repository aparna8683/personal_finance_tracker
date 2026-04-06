import React, { useState } from "react";

const AddTransactionForm = ({ setTransactions, setShowForm, theme }) => {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const isLight = theme === "light";

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    isLight
      ? "border-gray-300 bg-white text-gray-800 placeholder:text-gray-400"
      : "border-slate-700 bg-slate-800 text-white placeholder:text-slate-400"
  }`;

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
      className={`rounded-2xl border p-4 shadow-sm sm:rounded-3xl sm:p-6 ${
        isLight ? "border-gray-200 bg-white" : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="mb-5">
        <h3
          className={`text-lg font-semibold sm:text-xl ${
            isLight ? "text-gray-800" : "text-white"
          }`}
        >
          Add New Transaction
        </h3>
        <p
          className={`mt-1 text-sm ${
            isLight ? "text-gray-500" : "text-slate-400"
          }`}
        >
          Fill in the details to add a new income or expense entry.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition sm:w-auto ${
              isLight
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 sm:w-auto"
          >
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
