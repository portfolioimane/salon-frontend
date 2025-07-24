"use client";

import React, { useState } from "react";
import { Plus, Edit3, Trash2, X, Save } from "lucide-react";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number; // in MAD or your currency
};

const initialServices: Service[] = [
  {
    id: 1,
    name: "Haircut",
    description: "Classic and modern haircut styles",
    price: 150,
  },
  {
    id: 2,
    name: "Hair Coloring",
    description: "Vibrant and natural hair colors",
    price: 300,
  },
  {
    id: 3,
    name: "Manicure",
    description: "Nail shaping, polishing and care",
    price: 120,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Omit<Service, "id">>({
    name: "",
    description: "",
    price: 0,
  });

  // Open Add Service modal
  const openAddModal = () => {
    setEditingService(null);
    setFormData({ name: "", description: "", price: 0 });
    setIsModalOpen(true);
  };

  // Open Edit Service modal
  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
    });
    setIsModalOpen(true);
  };

  // Delete service with confirmation
  const deleteService = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Form submit (Add or Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Service name is required");
      return;
    }
    if (formData.price <= 0) {
      alert("Price must be greater than zero");
      return;
    }

    if (editingService) {
      // Edit existing
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id ? { ...s, ...formData } : s
        )
      );
    } else {
      // Add new
      const newService: Service = {
        id: services.length ? Math.max(...services.map((s) => s.id)) + 1 : 1,
        ...formData,
      };
      setServices((prev) => [...prev, newService]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services found. Add some!</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">Price (MAD)</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(({ id, name, description, price }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{description}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {price.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-3">
                  <button
                    onClick={() =>
                      openEditModal({ id, name, description, price })
                    }
                    title="Edit"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit3 className="inline w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteService(id)}
                    title="Delete"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="inline w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Add/Edit Service */}
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
              {editingService ? "Edit Service" : "Add Service"}
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
                  placeholder="Service name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Service description"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price (MAD) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  min={0}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Price"
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
