import React from "react";

const Transactions = ({
  transactions,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  theme,
}) => {
  const isLight = theme === "light";

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
    isLight
      ? "border-gray-300 bg-white text-gray-800 placeholder:text-gray-400"
      : "border-slate-700 bg-slate-800 text-white placeholder:text-slate-400"
  }`;

  return (
    <div
      className={`w-full min-w-0 rounded-2xl border p-4 shadow-sm sm:rounded-3xl sm:p-5 ${
        isLight ? "border-gray-200 bg-white" : "border-slate-800 bg-slate-900"
      }`}
    >
      {/* Header + Filters */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h3
            className={`text-lg font-semibold sm:text-xl ${
              isLight ? "text-gray-800" : "text-white"
            }`}
          >
            Recent Transactions
          </h3>
          <p
            className={`mt-1 text-sm ${
              isLight ? "text-gray-500" : "text-slate-400"
            }`}
          >
            Search, filter, and review your income and expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
          <input
            type="text"
            placeholder="Search by description or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={inputClass}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={inputClass}
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
            isLight
              ? "border-gray-300 text-gray-500"
              : "border-slate-700 text-slate-400"
          }`}
        >
          No transactions found 😔
          <br />
          Try adjusting filters or add a new transaction.
        </div>
      ) : (
        <>
          {/* Mobile Card List */}
          <div className="space-y-3 md:hidden">
            {transactions.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 ${
                  isLight
                    ? "border-gray-200 bg-gray-50"
                    : "border-slate-800 bg-slate-800/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className={`truncate font-medium ${
                        isLight ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {item.description}
                    </p>
                    <p
                      className={`mt-1 text-xs ${
                        isLight ? "text-gray-500" : "text-slate-400"
                      }`}
                    >
                      {item.category}
                    </p>
                  </div>

                  <p
                    className={`shrink-0 text-sm font-semibold ${
                      item.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.type === "income" ? "+" : "-"} ₹
                    {Number(item.amount || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span
                    className={`${
                      isLight ? "text-gray-500" : "text-slate-400"
                    }`}
                  >
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "No date"}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 capitalize ${
                      item.type === "income"
                        ? isLight
                          ? "bg-green-100 text-green-700"
                          : "bg-green-500/10 text-green-400"
                        : isLight
                          ? "bg-red-100 text-red-700"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr
                  className={`border-b text-sm ${
                    isLight
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
                      isLight
                        ? "border-gray-100 hover:bg-gray-50"
                        : "border-slate-800 hover:bg-slate-800/50"
                    }`}
                  >
                    <td
                      className={`py-4 text-sm ${
                        isLight ? "text-gray-600" : "text-slate-300"
                      }`}
                    >
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "No date"}
                    </td>

                    <td
                      className={`py-4 text-sm font-medium ${
                        isLight ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {item.description}
                    </td>

                    <td
                      className={`py-4 text-sm ${
                        isLight ? "text-gray-600" : "text-slate-300"
                      }`}
                    >
                      {item.category}
                    </td>

                    <td
                      className={`py-4 text-sm capitalize ${
                        isLight ? "text-gray-600" : "text-slate-300"
                      }`}
                    >
                      {item.type}
                    </td>

                    <td
                      className={`py-4 text-sm font-semibold ${
                        item.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"} ₹
                      {Number(item.amount || 0).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
