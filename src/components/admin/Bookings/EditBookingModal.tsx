'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { updateBooking, Booking } from '@/store/admin/backendBookingsSlice';
import {
  FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiDollarSign
} from 'react-icons/fi';

interface EditBookingModalProps {
  booking: Booking;
  onClose: () => void;
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({ booking, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: booking.name || '',
    email: booking.email || '',
    phone: booking.phone || '',
    date: booking.date || '',
    start_time: booking.start_time || '',
    end_time: booking.end_time || '',
    total: booking.total?.toString() || '',
    paid_amount: booking.paid_amount?.toString() || '',
    status: booking.status || 'pending',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await dispatch(updateBooking({
      bookingId: booking.id,
      data: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        start_time: form.start_time,
        end_time: form.end_time,
        total: parseFloat(form.total),
        paid_amount: parseFloat(form.paid_amount),
        status: form.status,
        user_id: booking.user_id,
        service_id: booking.service_id,
        payment_method: booking.payment_method,
      }
    })).unwrap();
    onClose();
  } catch {
    setError('Failed to update booking.');
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Booking</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1"><FiUser className="inline-block mr-1" /> Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1"><FiMail className="inline-block mr-1" /> Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1"><FiPhone className="inline-block mr-1" /> Phone</label>
            <input
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1"><FiCalendar className="inline-block mr-1" /> Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1"><FiClock className="inline-block mr-1" /> Start Time</label>
            <input
              name="start_time"
              type="time"
              value={form.start_time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1"><FiClock className="inline-block mr-1" /> End Time</label>
            <input
              name="end_time"
              type="time"
              value={form.end_time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1"><FiDollarSign className="inline-block mr-1" /> Total</label>
            <input
              name="total"
              type="number"
              value={form.total}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1"><FiDollarSign className="inline-block mr-1" /> Paid</label>
            <input
              name="paid_amount"
              type="number"
              value={form.paid_amount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
