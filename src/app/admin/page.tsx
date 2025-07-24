"use client";

import React, { useState } from "react";

type ServiceReport = {
  serviceName: string;
  timesBooked: number;
  revenue: number;
};

type ClientReport = {
  clientName: string;
  visits: number;
};

export default function SalonReportsPage() {
  // Date selectors (month/year)
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Dummy data — replace with real API calls or props
  const totalAppointments = 124;
  const totalRevenue = 15430; // in MAD or your currency
  const newCustomers = 23;
  const occupancyRate = 75; // in %

  const popularServices: ServiceReport[] = [
    { serviceName: "Haircut", timesBooked: 45, revenue: 4500 },
    { serviceName: "Hair Coloring", timesBooked: 30, revenue: 6000 },
    { serviceName: "Manicure", timesBooked: 25, revenue: 2500 },
    { serviceName: "Facial", timesBooked: 15, revenue: 2250 },
    { serviceName: "Massage", timesBooked: 9, revenue: 1680 },
  ];

  const topClients: ClientReport[] = [
    { clientName: "Amina El-Fassi", visits: 12 },
    { clientName: "Mohamed Idrissi", visits: 9 },
    { clientName: "Sara Benali", visits: 7 },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Appointments</h2>
          <p className="text-4xl font-extrabold text-rose-600">{totalAppointments}</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Revenue</h2>
          <p className="text-4xl font-extrabold text-pink-600">{totalRevenue.toLocaleString()} MAD</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">New Customers</h2>
          <p className="text-4xl font-extrabold text-orange-600">{newCustomers}</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Occupancy Rate</h2>
          <p className="text-4xl font-extrabold text-purple-600">{occupancyRate}%</p>
        </div>
      </div>

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
            {popularServices.map(({ serviceName, timesBooked, revenue }) => (
              <tr key={serviceName} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-300 px-6 py-3">{serviceName}</td>
                <td className="border border-gray-300 px-6 py-3 text-center">{timesBooked}</td>
                <td className="border border-gray-300 px-6 py-3 text-right">{revenue.toLocaleString()}</td>
              </tr>
            ))}
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
            {topClients.map(({ clientName, visits }) => (
              <tr key={clientName} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-300 px-6 py-3">{clientName}</td>
                <td className="border border-gray-300 px-6 py-3 text-center">{visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
