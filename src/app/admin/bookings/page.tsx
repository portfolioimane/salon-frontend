"use client";

import React, { useState, useMemo } from "react";

type BookingStatus = "pending" | "confirmed" | "canceled" | "completed";

type Booking = {
  id: number;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string; // ISO string
  status: BookingStatus;
  notes?: string;
};

const dummyBookings: Booking[] = [
  {
    id: 1,
    clientName: "Amina El-Fassi",
    clientPhone: "+212 600 123 456",
    service: "Haircut",
    date: "2025-07-10T14:00:00Z",
    status: "completed",
  },
  {
    id: 2,
    clientName: "Amina El-Fassi",
    clientPhone: "+212 600 123 456",
    service: "Facial",
    date: "2025-07-25T10:00:00Z",
    status: "pending",
    notes: "First time trying this service",
  },
  {
    id: 3,
    clientName: "Mohamed Idrissi",
    clientPhone: "+212 650 987 654",
    service: "Hair Coloring",
    date: "2025-07-15T13:30:00Z",
    status: "confirmed",
  },
  {
    id: 4,
    clientName: "Sara Benali",
    clientPhone: "+212 670 111 222",
    service: "Manicure",
    date: "2025-07-12T09:00:00Z",
    status: "completed",
  },
  {
    id: 5,
    clientName: "Sara Benali",
    clientPhone: "+212 670 111 222",
    service: "Massage",
    date: "2025-07-28T16:00:00Z",
    status: "pending",
  },
];

export default function BookingCRMTable() {
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);
  const [search, setSearch] = useState("");

  // Filter bookings based on search text on clientName, service, phone, status
  const filteredBookings = useMemo(() => {
    if (!search.trim()) return bookings;
    const s = search.toLowerCase();
    return bookings.filter(
      (b) =>
        b.clientName.toLowerCase().includes(s) ||
        b.service.toLowerCase().includes(s) ||
        b.clientPhone.includes(s) ||
        b.status.toLowerCase().includes(s)
    );
  }, [search, bookings]);

  // Format date nicely
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  // Update status handlers
  function updateStatus(id: number, newStatus: BookingStatus) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Bookings CRM</h1>

      <input
        type="text"
        placeholder="Search by client, service, phone, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Client</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Service</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-4 text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
            {filteredBookings.map(
              ({ id, clientName, clientPhone, service, date, status, notes }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{clientName}</td>
                  <td className="border border-gray-300 px-4 py-2">{clientPhone}</td>
                  <td className="border border-gray-300 px-4 py-2">{service}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDate(date)}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      status === "completed"
                        ? "text-green-600"
                        : status === "confirmed"
                        ? "text-blue-600"
                        : status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 italic text-gray-700">
                    {notes || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                    {status !== "confirmed" && status !== "completed" && (
                      <button
                        onClick={() => updateStatus(id, "confirmed")}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        title="Confirm booking"
                      >
                        Confirm
                      </button>
                    )}
                    {status !== "canceled" && status !== "completed" && (
                      <button
                        onClick={() => updateStatus(id, "canceled")}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        title="Cancel booking"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
