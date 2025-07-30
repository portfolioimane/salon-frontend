'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchAvailableSlots, submitBooking, resetBookingState } from '@/store/frontend/bookingSlice';

interface BookingFormProps {
  serviceId: number;
}

interface Slot {
  start_time: string;
  end_time: string;
}

const BookingForm = ({ serviceId }: BookingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { slots, loadingSlots, bookingLoading, bookingSuccess, bookingError } = useSelector(
    (state: RootState) => state.booking
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null as Date | null,
    slotStartTime: '',
    slotEndTime: '',
  });

  useEffect(() => {
    if (bookingSuccess) {
      alert('Booking request sent successfully!');
      setFormData({ name: '', email: '', phone: '', date: null, slotStartTime: '', slotEndTime: '' });
      dispatch(resetBookingState());
    }
  }, [bookingSuccess, dispatch]);

  useEffect(() => {
    if (formData.date) {
      const formattedDate = formData.date.toISOString().split('T')[0];
      dispatch(fetchAvailableSlots({ date: formattedDate, service_id: serviceId }));
      setFormData(prev => ({ ...prev, slotStartTime: '', slotEndTime: '' }));
    }
  }, [formData.date, serviceId, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'slot') {
      const slot = slots.find(s => s.start_time === value);
      if (slot) {
        setFormData(prev => ({
          ...prev,
          slotStartTime: slot.start_time,
          slotEndTime: slot.end_time,
        }));
      } else {
        setFormData(prev => ({ ...prev, slotStartTime: '', slotEndTime: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, date, slotStartTime: '', slotEndTime: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.slotStartTime || !formData.slotEndTime) {
      alert('Please select a date and a time slot');
      return;
    }

    dispatch(
      submitBooking({
        service_id: serviceId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date.toISOString().split('T')[0],
        start_time: formData.slotStartTime,
        end_time: formData.slotEndTime,
        payment_method: 'cash',
        total: 0,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto px-4">
      <h3 className="text-3xl font-bold mb-6 text-center text-rose-600">Book this service</h3>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-900 placeholder-gray-400 transition-shadow"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-900 placeholder-gray-400 transition-shadow"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block mb-1 font-semibold text-gray-700">
          Phone / WhatsApp Number
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-900 placeholder-gray-400 transition-shadow"
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block mb-1 font-semibold text-gray-700">
          Select Date
        </label>
        <DatePicker
          id="date"
          selected={formData.date}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-900 placeholder-gray-400 transition-shadow"
          placeholderText="Select a date"
          required
        />
      </div>

      {/* Slot */}
      <div>
        <label htmlFor="slot" className="block mb-1 font-semibold text-gray-700">
          Available Time Slots
        </label>
        {loadingSlots ? (
          <p className="text-gray-500 italic">Loading slots...</p>
        ) : slots.length === 0 ? (
          <p className="text-gray-500 italic">No slots available for this date.</p>
        ) : (
          <select
            id="slot"
            name="slot"
            value={formData.slotStartTime}
            onChange={handleChange}
            required
            className="
              w-full
              mt-1
              px-5
              py-3
              rounded-lg
              border-2
              border-rose-400
              bg-white
              text-gray-900
              font-semibold
              shadow-sm
              focus:outline-none
              focus:ring-4
              focus:ring-rose-300
              hover:border-rose-500
              transition
              cursor-pointer
            "
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {slots.map(slot => (
              <option key={slot.start_time} value={slot.start_time}>
                {slot.start_time} - {slot.end_time}
              </option>
            ))}
          </select>
        )}
      </div>

  

      <button
        type="submit"
        disabled={bookingLoading}
        className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white py-4 rounded-3xl font-semibold transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {bookingLoading ? 'Booking...' : 'Book Now'}
      </button>

      {bookingError && <p className="text-red-600 mt-4 font-semibold text-center">{bookingError}</p>}
    </form>
  );
};

export default BookingForm;
