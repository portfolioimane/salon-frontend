"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  clearValidationErrors,
  Employee,
} from "@/store/admin/employeeSlice";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export default function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: employees, loading, error, validationErrors } = useSelector(
    (state: RootState) => state.employee
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const openAddModal = () => {
    dispatch(clearValidationErrors());
    setEditingEmployee(null);
    setAvatarFile(null);
    setFormData({ name: "", email: "", role: "", phone: "", avatar: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (emp: Employee) => {
    dispatch(clearValidationErrors());
    setEditingEmployee(emp);
    setAvatarFile(null);
    setFormData({
      name: emp.name,
      email: emp.email || "",
      role: emp.role || "",
      phone: emp.phone || "",
      avatar: emp.avatar || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setAvatarFile(null);
    dispatch(clearValidationErrors());
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        e.target.value = "";
        return;
      }
      setAvatarFile(file);
      setFormData((f) => ({ ...f, avatar: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("role", formData.role);
    data.append("phone", formData.phone);
    if (avatarFile) data.append("avatar", avatarFile);

    if (editingEmployee) {
      await dispatch(updateEmployee({ id: editingEmployee.id, data }));
    } else {
      await dispatch(addEmployee(data));
    }

    if (!validationErrors) {
      closeModal();
    }
  };

  const openDeleteModal = (emp: Employee) => {
    setEmployeeToDelete(emp);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      dispatch(deleteEmployee(employeeToDelete.id));
    }
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const renderError = (field: string) =>
    validationErrors?.[field] && (
      <p className="text-red-600 text-sm mt-1">{validationErrors[field][0]}</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : employees.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{emp.name}</td>
                <td className="border px-4 py-2">{emp.email}</td>
                <td className="border px-4 py-2">{emp.role}</td>
                <td className="border px-4 py-2">{emp.phone}</td>
                <td className="border px-4 py-2">
                  {emp.avatar ? (
                    <img
                      src={
                        emp.avatar.startsWith("http")
                          ? emp.avatar
                          : `${IMAGE_BASE_URL}/storage/${emp.avatar}`
                      }
                      alt={emp.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    "No avatar"
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => openEditModal(emp)}
                    className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(emp)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>

            <label className="block mb-2 font-semibold">
              Name <span className="text-red-500">*</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, name: e.target.value }))
                }
                required
                className={`mt-1 block w-full border rounded p-2 ${
                  validationErrors?.name ? "border-red-600" : "border-gray-300"
                }`}
              />
              {renderError("name")}
            </label>

            <label className="block mb-2 font-semibold">
              Email <span className="text-red-500">*</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, email: e.target.value }))
                }
                required
                className={`mt-1 block w-full border rounded p-2 ${
                  validationErrors?.email ? "border-red-600" : "border-gray-300"
                }`}
              />
              {renderError("email")}
            </label>

            <label className="block mb-2 font-semibold">
              Role
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, role: e.target.value }))
                }
                className={`mt-1 block w-full border rounded p-2`}
              />
              {renderError("role")}
            </label>

            <label className="block mb-2 font-semibold">
              Phone
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1 block w-full border rounded p-2"
              />
              {renderError("phone")}
            </label>

            <label className="block mb-2 font-semibold">
              Avatar (max 2MB)
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
              {formData.avatar && (
                <img
                  src={
                    avatarFile
                      ? formData.avatar
                      : formData.avatar.startsWith("http")
                      ? formData.avatar
                      : `${IMAGE_BASE_URL}/storage/${formData.avatar}`
                  }
                  alt="Avatar Preview"
                  className="mt-2 w-20 h-20 rounded-full object-cover"
                />
              )}
              {renderError("avatar")}
            </label>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && employeeToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{employeeToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
