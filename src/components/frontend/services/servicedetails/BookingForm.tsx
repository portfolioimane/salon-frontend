'use client';

import { useState } from 'react';

interface BookingFormProps {
  serviceId: number;
}

const BookingForm = ({ serviceId }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      // Replace with your actual booking API call
      console.log('Booking Request:', { serviceId, ...formData });

      // Simulate delay
      await new Promise((res) => setTimeout(res, 1000));

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold mb-4">Book this service</h3>

      <input
        type="text"
        name="name"
        placeholder="Your full name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

      <input
        type="email"
        name="email"
        placeholder="Your email address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Your phone number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

      <label className="block">
        <span className="text-gray-700">Preferred Date & Time</span>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </label>

      <textarea
        name="message"
        placeholder="Additional notes (optional)"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
      ></textarea>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white py-3 rounded-2xl font-semibold transition-colors shadow-md disabled:opacity-60"
      >
        {submitting ? 'Booking...' : 'Book Now'}
      </button>

      {success && (
        <p className="text-green-600 mt-3 font-semibold text-center">
          Booking request sent successfully!
        </p>
      )}
    </form>
  );
};

export default BookingForm;
