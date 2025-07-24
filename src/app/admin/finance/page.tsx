"use client";

import { useState } from "react";

type Revenue = {
  id: number;
  source: string;
  amount: number;
  date: string;
};

type Expense = {
  id: number;
  reason: string;
  amount: number;
  date: string;
};

export default function FinancePage() {
  // Initial fake data
  const [revenues, setRevenues] = useState<Revenue[]>([
    { id: 1, source: "Booking - Haircut", amount: 150, date: "2025-07-01" },
    { id: 2, source: "Booking - Facial", amount: 200, date: "2025-07-02" },
    { id: 3, source: "Manual Income - Product Sale", amount: 300, date: "2025-07-03" },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, reason: "Staff Salary", amount: 1000, date: "2025-07-01" },
    { id: 2, reason: "Product Restock", amount: 400, date: "2025-07-04" },
    { id: 3, reason: "Electricity Bill", amount: 250, date: "2025-07-05" },
  ]);

  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [newRevenue, setNewRevenue] = useState({ source: "", amount: "", date: "" });
  const [newExpense, setNewExpense] = useState({ reason: "", amount: "", date: "" });

  // Calculate totals
  const totalRevenue = revenues.reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpense;

  // Handlers to add new revenue/expense
  function addRevenue() {
    if (!newRevenue.source || !newRevenue.amount || !newRevenue.date) {
      alert("Please fill all fields.");
      return;
    }
    setRevenues((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        source: newRevenue.source,
        amount: Number(newRevenue.amount),
        date: newRevenue.date,
      },
    ]);
    setNewRevenue({ source: "", amount: "", date: "" });
    setShowRevenueModal(false);
  }

  function addExpense() {
    if (!newExpense.reason || !newExpense.amount || !newExpense.date) {
      alert("Please fill all fields.");
      return;
    }
    setExpenses((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        reason: newExpense.reason,
        amount: Number(newExpense.amount),
        date: newExpense.date,
      },
    ]);
    setNewExpense({ reason: "", amount: "", date: "" });
    setShowExpenseModal(false);
  }

  // Handlers to delete revenue/expense
  function deleteRevenue(id: number) {
    setRevenues((prev) => prev.filter((r) => r.id !== id));
  }

  function deleteExpense(id: number) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-12 p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-8">
        Finance Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-rose-500">{totalRevenue} MAD</p>
          <button
            onClick={() => setShowRevenueModal(true)}
            className="mt-auto mt-4 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white py-2 rounded-xl font-semibold hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
          >
            Add Revenue
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold text-orange-500">{totalExpense} MAD</p>
          <button
            onClick={() => setShowExpenseModal(true)}
            className="mt-auto mt-4 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white py-2 rounded-xl font-semibold hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
          >
            Add Expense
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Net Profit</h2>
          <p className={`text-3xl font-bold ${netProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
            {netProfit} MAD
          </p>
        </div>
      </div>

      {/* Revenues Table */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Revenues</h2>
        <div className="overflow-auto rounded-2xl shadow-md">
          <table className="min-w-full text-left bg-white/80 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 text-white">
              <tr>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3">Amount (MAD)</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {revenues.map((rev) => (
                <tr key={rev.id} className="border-b border-white/40">
                  <td className="px-6 py-4 text-gray-800">{rev.source}</td>
                  <td className="px-6 py-4 text-rose-600 font-semibold">{rev.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{rev.date}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteRevenue(rev.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                      aria-label="Delete revenue"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses Table */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-10">Expenses</h2>
        <div className="overflow-auto rounded-2xl shadow-md">
          <table className="min-w-full text-left bg-white/80 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 text-white">
              <tr>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Amount (MAD)</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} className="border-b border-white/40">
                  <td className="px-6 py-4 text-gray-800">{exp.reason}</td>
                  <td className="px-6 py-4 text-orange-500 font-semibold">{exp.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{exp.date}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                      aria-label="Delete expense"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Modal */}
      {showRevenueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 shadow-xl relative">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Revenue</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addRevenue();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Source"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={newRevenue.source}
                onChange={(e) => setNewRevenue({ ...newRevenue, source: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Amount (MAD)"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={newRevenue.amount}
                onChange={(e) => setNewRevenue({ ...newRevenue, amount: e.target.value })}
                min={0}
                required
              />
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={newRevenue.date}
                onChange={(e) => setNewRevenue({ ...newRevenue, date: e.target.value })}
                required
              />

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                  onClick={() => setShowRevenueModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 shadow-xl relative">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add Expense</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addExpense();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Reason"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={newExpense.reason}
                onChange={(e) => setNewExpense({ ...newExpense, reason: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Amount (MAD)"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                min={0}
                required
              />
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                required
              />

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                  onClick={() => setShowExpenseModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
