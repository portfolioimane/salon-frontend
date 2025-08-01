"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSummaryReport,
  fetchPopularServices,
  fetchTopClients,
} from "@/store/admin/reportSlice";
import type { RootState, AppDispatch } from "@/store";

export default function SalonReportsPage() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const dispatch = useDispatch<AppDispatch>();

  const {
    summary,
    popularServices,
    topClients,
    loading,
    error,
  } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    dispatch(fetchSummaryReport({ year: selectedYear, month: selectedMonth }));
    dispatch(fetchPopularServices({ year: selectedYear, month: selectedMonth }));
    dispatch(fetchTopClients({ year: selectedYear, month: selectedMonth }));
  }, [dispatch, selectedYear, selectedMonth]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
        Salon Management Reports
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <label htmlFor="month" className="font-semibold block mb-1 text-gray-700">
            Month
          </label>
          <select
            id="month"
            className="border rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("en-US", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="font-semibold block mb-1 text-gray-700">
            Year
          </label>
          <select
            id="year"
            className="border rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Appointments</h2>
            <p className="text-4xl font-extrabold text-rose-600">{summary.totalAppointments}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Revenue</h2>
            <p className="text-4xl font-extrabold text-pink-600">
              {summary.totalRevenue.toLocaleString()} MAD
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">New Customers</h2>
            <p className="text-4xl font-extrabold text-orange-600">{summary.newCustomers}</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Occupancy Rate</h2>
            <p className="text-4xl font-extrabold text-purple-600">{summary.occupancyRate}%</p>
          </div>
        </div>
      )}

      {/* Popular Services Table */}
      <section className="bg-white rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Popular Services</h2>
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">Service</th>
              <th className="border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700">Times Booked</th>
              <th className="border border-gray-300 px-6 py-3 text-right font-semibold text-gray-700">Revenue (MAD)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  Loading popular services...
                </td>
              </tr>
            ) : popularServices.length > 0 ? (
              popularServices.map(({ serviceName, timesBooked, revenue }) => (
                <tr key={serviceName} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-6 py-3">{serviceName}</td>
                  <td className="border border-gray-300 px-6 py-3 text-center">{timesBooked}</td>
                  <td className="border border-gray-300 px-6 py-3 text-right">{revenue.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No popular services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Top Clients Table */}
      <section className="bg-white rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Top Clients by Visits</h2>
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">Client Name</th>
              <th className="border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700">Visits</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  Loading top clients...
                </td>
              </tr>
            ) : topClients.length > 0 ? (
              topClients.map(({ clientName, visits }) => (
                <tr key={clientName} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-6 py-3">{clientName}</td>
                  <td className="border border-gray-300 px-6 py-3 text-center">{visits}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No top clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
