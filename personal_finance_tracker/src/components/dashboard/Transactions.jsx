import React from "react";

const Transactions = ({
  transactions,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  theme,
}) => {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        theme === "light"
          ? "border-gray-200 bg-white"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h3
          className={`text-lg font-semibold ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          Recent Transactions
        </h3>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by description or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`rounded-lg border px-4 py-2 text-sm outline-none ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-800"
                : "border-slate-700 bg-slate-800 text-white"
            }`}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`rounded-lg border px-4 py-2 text-sm outline-none ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-800"
                : "border-slate-700 bg-slate-800 text-white"
            }`}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div
          className={`rounded-xl border border-dashed py-10 text-center text-sm ${
            theme === "light"
              ? "border-gray-300 text-gray-500"
              : "border-slate-700 text-slate-400"
          }`}
        >
          No transactions found 😔
          <br />
          Try adjusting filters or add a new transaction.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr
                className={`border-b text-sm ${
                  theme === "light"
                    ? "border-gray-200 text-gray-500"
                    : "border-slate-700 text-slate-400"
                }`}
              >
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b transition ${
                    theme === "light"
                      ? "border-gray-100 hover:bg-gray-50"
                      : "border-slate-800 hover:bg-slate-800/50"
                  }`}
                >
                  <td
                    className={`py-4 text-sm ${
                      theme === "light" ? "text-gray-600" : "text-slate-300"
                    }`}
                  >
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td
                    className={`py-4 text-sm font-medium ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {item.description}
                  </td>

                  <td
                    className={`py-4 text-sm ${
                      theme === "light" ? "text-gray-600" : "text-slate-300"
                    }`}
                  >
                    {item.category}
                  </td>

                  <td
                    className={`py-4 text-sm capitalize ${
                      theme === "light" ? "text-gray-600" : "text-slate-300"
                    }`}
                  >
                    {item.type}
                  </td>

                  <td
                    className={`py-4 text-sm font-semibold ${
                      item.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.type === "income" ? "+" : "-"} ₹
                    {item.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
