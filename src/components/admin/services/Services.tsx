'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, deleteService, toggleFeatured } from '@/store/admin/servicesSlice';
import type { AppDispatch, RootState } from '@/store';
import AddServiceModal from './AddServiceModal';
import EditServiceModal from './EditServiceModal';  // <-- Import Edit modal
import { FiPlus } from 'react-icons/fi';

const AdminServices = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: services, loading, error } = useSelector((state: RootState) => state.servicesadmin);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null); // <-- New state for editing modal
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
    setHasFetched(true);
  }, [dispatch]);

  const handleDeleteClick = (id: number) => {
    setServiceToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (serviceToDelete !== null) {
      await dispatch(deleteService(serviceToDelete));
      setShowDeleteModal(false);
      setServiceToDelete(null);
    }
  };

  const handleToggleFeatured = async (service: any) => {
    try {
      await dispatch(toggleFeatured(service.id));
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl shadow-xl min-h-[80vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600">
          Salon Services
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transition transform hover:scale-105"
        >
          <FiPlus className="text-xl" /> Add Service
        </button>
      </div>

      {/* Loading, Error, Empty */}
      {hasFetched && (
        <>
          {loading ? (
            <p className="text-gray-600 text-center text-lg">Loading services...</p>
          ) : error ? (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500 text-center">No services found.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-300 shadow-md bg-white">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 text-white text-sm uppercase tracking-wide rounded-tl-3xl rounded-tr-3xl">
                  <tr>
                    <th className="border border-transparent px-4 py-3 text-left rounded-tl-3xl">Image</th>
                    <th className="border border-transparent px-4 py-3 text-left">Service Name</th>
                    <th className="border border-transparent px-4 py-3 text-left">Price (MAD)</th>
                    <th className="border border-transparent px-4 py-3 text-left">Duration</th>
                    <th className="border border-transparent px-4 py-3 text-left">Category</th>
                    <th className="border border-transparent px-4 py-3 text-center">Featured</th>
                    <th className="border border-transparent px-4 py-3 text-center rounded-tr-3xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr
                      key={service.id}
                      className="hover:bg-rose-50 transition-colors duration-300 even:bg-white odd:bg-rose-50/40"
                    >
                      <td className="border border-gray-200 px-4 py-3">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.image}`}
                          alt={service.name}
                          className="w-12 h-12 object-cover rounded-xl shadow-md"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-700">{service.name}</td>
                      <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">{service.price}</td>
                      <td className="border border-gray-200 px-4 py-3">{service.duration} mins</td>
                      <td className="border border-gray-200 px-4 py-3">{service.category}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={service.featured}
                          onChange={() => handleToggleFeatured(service)}
                          className="w-6 h-6 cursor-pointer accent-pink-500 hover:accent-pink-700 transition-colors duration-300"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => setEditingServiceId(service.id)}  // <-- Open modal here
                            className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 text-white py-2 rounded-lg font-semibold shadow-md text-center transition-transform transform hover:scale-105"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(service.id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Are you sure you want to delete this service?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="border border-gray-400 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && <AddServiceModal onClose={() => setShowAddModal(false)} />}

      {/* Edit Service Modal */}
      {editingServiceId !== null && (
        <EditServiceModal
          serviceId={editingServiceId}
          onClose={() => setEditingServiceId(null)}
        />
      )}
    </div>
  );
};

export default AdminServices;
