'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import {
  fetchBookings,
  deleteBooking,
  Booking,
} from '@/store/admin/backendBookingsSlice';

import EditBookingModal from './EditBookingModal'; // Make sure this path is correct

const BackendBookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading, error } = useSelector((state: RootState) => state.backendBookings);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const openDeleteModal = (id: number) => {
    setBookingToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setBookingToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    if (bookingToDelete !== null) {
      dispatch(deleteBooking(bookingToDelete));
      closeDeleteModal();
    }
  };

  const openViewModal = (booking: Booking) => {
    setViewingBooking(booking);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setViewingBooking(null);
    setShowViewModal(false);
  };

  const openEditModal = (booking: Booking) => {
    setEditingBooking(booking);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingBooking(null);
    setShowEditModal(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl shadow-xl min-h-[80vh]">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 mb-8 text-center">
        Manage Bookings
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center text-lg">Loading bookings...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold text-center">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-300 shadow-md bg-white">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 text-white text-sm uppercase tracking-wide rounded-tl-3xl rounded-tr-3xl">
              <tr>
                <th className="border border-transparent px-4 py-3 text-left rounded-tl-3xl">Service</th>
                <th className="border border-transparent px-4 py-3 text-left">Date</th>
                <th className="border border-transparent px-4 py-3 text-left">Slot Time</th>
                <th className="border border-transparent px-4 py-3 text-left">Customer</th>
                <th className="border border-transparent px-4 py-3 text-left">Phone</th>
                <th className="border border-transparent px-4 py-3 text-left">Total</th>
                <th className="border border-transparent px-4 py-3 text-left">Remain_amount</th>
                <th className="border border-transparent px-4 py-3 text-left">Payment</th>
                <th className="border border-transparent px-4 py-3 text-left">Status</th>
                <th className="border border-transparent px-4 py-3 text-center rounded-tr-3xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-rose-50 transition-colors duration-300 even:bg-white odd:bg-rose-50/40"
                >
                  <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-700">
                    {booking.service?.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">{booking.date}</td>
                  <td className="border border-gray-200 px-4 py-3">
                    {booking.start_time} - {booking.end_time}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">{booking.name || `User #${booking.user_id}`}</td>
                  <td className="border border-gray-200 px-4 py-3">{booking.phone || 'N/A'}</td>
                  <td className="border border-gray-200 px-4 py-3">{booking.total || 'N/A'}</td>
<td className="border border-gray-200 px-4 py-3">
  {booking.total && booking.paid_amount !== null
    ? booking.total - booking.paid_amount
    : 'N/A'}
</td>

                  <td className="border border-gray-200 px-4 py-3 capitalize">{booking.payment_method || 'N/A'}</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span
                      className={`font-semibold capitalize ${
                        booking.status === 'Pending'
                          ? 'text-yellow-500'
                          : booking.status === 'Cancelled'
                          ? 'text-pink-600'
                          : booking.status === 'Confirmed'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => openViewModal(booking)}
                      className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(booking)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(booking.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Are you sure you want to delete this booking?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={closeDeleteModal}
                className="border border-gray-400 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingBooking && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Booking Details</h2>

            <div className="space-y-4 text-gray-700 text-lg">
              <div><strong>Service:</strong> {viewingBooking.service?.name || 'N/A'}</div>
              <div><strong>Name:</strong> {viewingBooking.name}</div>
              <div><strong>Email:</strong> {viewingBooking.email}</div>
              <div><strong>Phone:</strong> {viewingBooking.phone}</div>
              <div><strong>Date:</strong> {viewingBooking.date}</div>
              <div><strong>Start Time:</strong> {viewingBooking.start_time}</div>
              <div><strong>End Time:</strong> {viewingBooking.end_time}</div>
              <div><strong>Payment Method:</strong> {viewingBooking.payment_method}</div>
              <div>
                <strong>Total Amount:</strong>{' '}
                {typeof viewingBooking.total === 'number'
                  ? `${viewingBooking.total.toFixed(2)} MAD`
                  : 'N/A'}
              </div>
              <div>
                <strong>Paid Amount:</strong>{' '}
                {typeof viewingBooking.paid_amount === 'number'
                  ? `${viewingBooking.paid_amount.toFixed(2)} MAD`
                  : 'N/A'}
              </div>
              <div>
                <strong>Status:</strong>{' '}
                <span className={`capitalize ${
                  viewingBooking.status === 'Pending' ? 'text-yellow-500' :
                  viewingBooking.status === 'Confirmed' ? 'text-green-600' :
                  viewingBooking.status === 'Cancelled' ? 'text-red-600' : ''
                }`}>
                  {viewingBooking.status}
                </span>
              </div>
            </div>

            <button
              onClick={closeViewModal}
              className="mt-8 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 transition transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingBooking && (
        <EditBookingModal
          booking={editingBooking}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default BackendBookings;
