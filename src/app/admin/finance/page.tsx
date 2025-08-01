"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store"; // Adjust path if needed
import {
  fetchFinances,
  addFinance,
  deleteFinance,
  Finance,
} from "@/store/admin/financeSlice"; // Adjust path if needed

export default function FinancePage() {
  const dispatch = useDispatch<AppDispatch>();
  const finances = useSelector((state: RootState) => state.finance.list);
  const loading = useSelector((state: RootState) => state.finance.loading);
  const error = useSelector((state: RootState) => state.finance.error);

  // Separate revenues and expenses by type
  const revenues = finances.filter((f) => f.type === "revenue");
  const expenses = finances.filter((f) => f.type === "expense");

  // Local modal & form states
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [newRevenue, setNewRevenue] = useState({ title: "", amount: "", date: "" });
  const [newExpense, setNewExpense] = useState({ title: "", amount: "", date: "" });

  // Calculate totals or null while loading
  const totalRevenue = loading ? null : revenues.reduce((sum, r) => sum + Number(r.amount), 0);
  const totalExpense = loading ? null : expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const netProfit =
    totalRevenue !== null && totalExpense !== null ? totalRevenue - totalExpense : null;

  // Fetch finances on mount
  useEffect(() => {
    dispatch(fetchFinances());
  }, [dispatch]);

  // Handlers to add revenue or expense
  function addRevenue() {
    if (!newRevenue.title || !newRevenue.amount || !newRevenue.date) {
      alert("Please fill all fields.");
      return;
    }
    dispatch(
      addFinance({
        title: newRevenue.title,
        amount: Number(newRevenue.amount),
        date: newRevenue.date,
        type: "revenue",
      })
    );
    setNewRevenue({ title: "", amount: "", date: "" });
    setShowRevenueModal(false);
  }

  function addExpense() {
    if (!newExpense.title || !newExpense.amount || !newExpense.date) {
      alert("Please fill all fields.");
      return;
    }
    dispatch(
      addFinance({
        title: newExpense.title,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        type: "expense",
      })
    );
    setNewExpense({ title: "", amount: "", date: "" });
    setShowExpenseModal(false);
  }

  // Handlers to delete revenue or expense by id
  function deleteRevenue(id: number) {
    dispatch(deleteFinance(id));
  }

  function deleteExpense(id: number) {
    dispatch(deleteFinance(id));
  }

  return (
    <div className="space-y-12 p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-8">
        Finance Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Total Revenue */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-rose-500">
            {totalRevenue !== null
              ? totalRevenue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " MAD"
              : "Loading..."}
          </p>
          <button
            onClick={() => setShowRevenueModal(true)}
            className="mt-auto mt-4 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white py-2 rounded-xl font-semibold hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
          >
            Add Revenue
          </button>
        </div>

        {/* Total Expenses */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold text-orange-500">
            {totalExpense !== null
              ? totalExpense.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " MAD"
              : "Loading..."}
          </p>
          <button
            onClick={() => setShowExpenseModal(true)}
            className="mt-auto mt-4 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white py-2 rounded-xl font-semibold hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
          >
            Add Expense
          </button>
        </div>

        {/* Net Profit */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Net Profit</h2>
          <p
            className={`text-3xl font-bold ${
              netProfit !== null && netProfit >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {netProfit !== null
              ? netProfit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " MAD"
              : "Loading..."}
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
                  <td className="px-6 py-4 text-gray-800">{rev.title}</td>
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
              {revenues.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No revenues found.
                  </td>
                </tr>
              )}
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
                  <td className="px-6 py-4 text-gray-800">{exp.title}</td>
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
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              )}
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
                value={newRevenue.title}
                onChange={(e) => setNewRevenue({ ...newRevenue, title: e.target.value })}
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
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
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

      {/* Loading & error */}
      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading finances...</p>
      )}
      {error && (
        <p className="text-center text-red-600 mt-4">Error: {error}</p>
      )}
    </div>
  );
}
