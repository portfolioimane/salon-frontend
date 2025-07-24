"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

type Employee = {
  id: number;
  name: string;
  role: string;
  phone: string;
  employeeId: string;
  avatar: string;
};

type AttendanceStatus = "present" | "late" | "absent" | "none";

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Stylist",
    phone: "+1 555-0101",
    employeeId: "EMP001",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Hair Colorist",
    phone: "+1 555-0102",
    employeeId: "EMP002",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Nail Technician",
    phone: "+1 555-0103",
    employeeId: "EMP003",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export default function EmployeeWithAttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Omit<Employee, "id">>({
    name: "",
    role: "",
    phone: "",
    employeeId: "",
    avatar: "",
  });

  // Attendance state: attendance[employeeId][dateString] = status
  const [attendance, setAttendance] = useState<Record<
    number,
    Record<string, AttendanceStatus>
  >>({});

  // Current year/month info
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Selected year/month for attendance (default to current)
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Generate dates for selected month in correct order (1 to last day)
  const daysInSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const datesInMonth = Array.from({ length: daysInSelectedMonth }, (_, i) => {
    const d = new Date(selectedYear, selectedMonth, i + 1);
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
  });

  // Cycle through attendance status
  function setAttendanceStatus(empId: number, date: string, status: AttendanceStatus) {
    setAttendance((prev) => ({
      ...prev,
      [empId]: {
        ...prev[empId],
        [date]: status,
      },
    }));
  }

  // Modal handlers for employees
  const openAddModal = () => {
    setEditingEmployee(null);
    setFormData({ name: "", role: "", phone: "", employeeId: "", avatar: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      role: emp.role,
      phone: emp.phone,
      employeeId: emp.employeeId,
      avatar: emp.avatar,
    });
    setIsModalOpen(true);
  };

  const deleteEmployee = (id: number) => {
    if (
      confirm(
        "Are you sure you want to delete this employee? This will also delete their attendance."
      )
    ) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setAttendance((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.employeeId.trim()) {
      alert("Please fill in at least the Name and Employee ID.");
      return;
    }
    const duplicate = employees.find(
      (e) =>
        e.employeeId.toLowerCase() === formData.employeeId.toLowerCase() &&
        e.id !== editingEmployee?.id
    );
    if (duplicate) {
      alert("Employee ID must be unique.");
      return;
    }
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === editingEmployee.id ? { ...e, ...formData } : e))
      );
    } else {
      const newEmp: Employee = {
        id: employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1,
        ...formData,
      };
      setEmployees((prev) => [...prev, newEmp]);
    }
    setIsModalOpen(false);
  };

  // Confirm & change month with CSV export reminder
  function handleChangeMonth(newMonth: number) {
    if (newMonth === selectedMonth) return;

    if (
      confirm(
        "Changing month will remove all current attendance data.\nPlease export the current month data as CSV if you want to keep it.\n\nDo you want to continue?"
      )
    ) {
      setSelectedMonth(newMonth);
      setAttendance({});
    }
  }

  // Confirm & change year with CSV export reminder
  function handleChangeYear(newYear: number) {
    if (newYear === selectedYear) return;

    if (
      confirm(
        "Changing year will remove all current attendance data.\nPlease export the current month data as CSV if you want to keep it.\n\nDo you want to continue?"
      )
    ) {
      setSelectedYear(newYear);
      setAttendance({});
    }
  }

  // CSV export for attendance data
  function exportCSV() {
    if (employees.length === 0) {
      alert("No employees to export.");
      return;
    }

    // Header: Employee, Employee ID, Role, then dates
    const header = [
      "Employee Name",
      "Employee ID",
      "Role",
      ...datesInMonth.map((date) => {
        const d = new Date(date);
        return d.getDate().toString(); // Just day number for columns
      }),
    ];

    const rows = employees.map((emp) => {
      const row = [
        emp.name,
        emp.employeeId,
        emp.role,
        ...datesInMonth.map((date) => attendance[emp.id]?.[date] || ""),
      ];
      return row;
    });

    const csvContent =
      [header, ...rows]
        .map((row) =>
          row
            .map((field) => `"${String(field).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\r\n") + "\r\n";

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance_${selectedYear}_${selectedMonth + 1}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Colors & icons for attendance status
  const statusColors: Record<AttendanceStatus, string> = {
    present: "bg-green-500",
    late: "bg-yellow-500",
    absent: "bg-red-500",
    none: "bg-gray-300",
  };

  const StatusIcon = ({ status }: { status: AttendanceStatus }) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4 text-white" />;
      case "late":
        return <AlertCircle className="w-4 h-4 text-white" />;
      case "absent":
        return <XCircle className="w-4 h-4 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Employees Section */}
        <section>
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" /> Add Employee
            </button>
          </header>

          <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {employees.length === 0 && (
              <p className="p-6 text-center text-gray-500">
                No employees found. Add some!
              </p>
            )}
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={emp.avatar || "https://via.placeholder.com/80"}
                    alt={emp.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {emp.name}
                    </h2>
                    <p className="text-gray-600">{emp.role}</p>
                    <p className="text-sm text-gray-500">{emp.phone}</p>
                    <p className="text-xs text-gray-400">{emp.employeeId}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => openEditModal(emp)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={`Edit ${emp.name}`}
                    title="Edit"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Delete ${emp.name}`}
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Attendance Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Attendance for{" "}
              {new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            {/* Export CSV Button */}
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              title="Export attendance as CSV"
            >
              Export CSV
            </button>
          </div>

          {/* Month & Year selector */}
          <div className="mb-4 flex items-center space-x-4">
            <label htmlFor="month-select" className="font-semibold">
              Month:
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => handleChangeMonth(parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>

            <label htmlFor="year-select" className="font-semibold">
              Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => handleChangeYear(parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Attendance table */}
          <div className="overflow-auto border rounded-lg shadow bg-white">
            <table className="min-w-full border-collapse table-fixed">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 w-40 text-left text-xs font-semibold text-gray-700 uppercase">
                    Employee
                  </th>
                  {datesInMonth.map((date) => {
                    const dayNum = new Date(date).getDate();
                    return (
                      <th
                        key={date}
                        className="border border-gray-200 px-2 py-1 w-10 text-center text-xs font-semibold text-gray-700 uppercase"
                        title={new Date(date).toDateString()}
                      >
                        {dayNum}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-gray-50 even:bg-gray-50"
                    title={emp.name}
                  >
                    <td className="border border-gray-200 px-3 py-2 font-medium text-gray-900">
                      <div className="flex items-center space-x-2">
                        <img
                          src={emp.avatar || "https://via.placeholder.com/40"}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    {datesInMonth.map((date) => {
                      const status: AttendanceStatus =
                        attendance[emp.id]?.[date] || "none";
                      return (
                        <td
                          key={date}
                          className={`border border-gray-200 p-1 cursor-pointer select-none text-center`}
                          onClick={() => {
                            // Cycle: none -> present -> late -> absent -> none
                            const nextStatus: Record<
                              AttendanceStatus,
                              AttendanceStatus
                            > = {
                              none: "present",
                              present: "late",
                              late: "absent",
                              absent: "none",
                            };
                            setAttendanceStatus(emp.id, date, nextStatus[status]);
                          }}
                          title={`Status: ${status}`}
                        >
                          <div
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                              statusColors[status]
                            }`}
                          >
                            <StatusIcon status={status} />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Click on any day cell to cycle attendance status (Present → Late →
            Absent → None)
          </p>
        </section>
      </div>

      {/* Modal for Add/Edit Employee */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Sarah Johnson"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, role: e.target.value }))
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Senior Stylist"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. +1 555-0101"
                />
              </div>

              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="employeeId"
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, employeeId: e.target.value }))
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. EMP001"
                />
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Avatar URL
                </label>
                <input
                  id="avatar"
                  type="url"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, avatar: e.target.value }))
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. https://example.com/avatar.jpg"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Save className="inline w-5 h-5 mr-1 -mt-0.5" />
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
