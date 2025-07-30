'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBusinessHours,
  addBusinessHours,
  updateBusinessHours,
  deleteBusinessHours,
  type BusinessHours
} from '@/store/frontend/businessHoursSlice';
import type { AppDispatch, RootState } from '@/store';

type BusinessHourForm = {
  id: number | null;
  day: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};

export default function BusinessHours() {
  const dispatch = useDispatch<AppDispatch>();
  const { hours, loading } = useSelector((state: RootState) => state.businessHours);

  const [form, setForm] = useState<BusinessHourForm>({
    id: null,
    day: '',
    open_time: null,
    close_time: null,
    is_closed: false,
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    dispatch(fetchBusinessHours()).finally(() => setFirstLoad(false));
  }, [dispatch]);

  const handleSubmit = () => {
    if (!form.day) {
      alert('Please select a day');
      return;
    }

    const data = {
      day: form.day,
      open_time: form.is_closed ? null : form.open_time,
      close_time: form.is_closed ? null : form.close_time,
      is_closed: form.is_closed,
    };

    if (form.id !== null) {
      dispatch(updateBusinessHours({ id: form.id, data }));
    } else {
      dispatch(addBusinessHours(data));
    }

    setForm({ day: '', open_time: null, close_time: null, is_closed: false, id: null });
    setIsFormVisible(false);
  };

  const handleEdit = (h: BusinessHours) => {
    setForm({
      id: h.id,
      day: h.day,
      open_time: h.open_time,
      close_time: h.close_time,
      is_closed: h.is_closed,
    });
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setForm({ day: '', open_time: null, close_time: null, is_closed: false, id: null });
    setIsFormVisible(false);
  };

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedHours = [...hours].sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Hours</h1>
          <p className="text-gray-600">Manage your store's operating schedule</p>
        </div>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm"
        >
          {isFormVisible ? 'Cancel' : '+ Add Hours'}
        </button>
      </div>

      {/* Form */}
      {isFormVisible && (
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {form.id !== null ? 'Edit Business Hours' : 'Add New Business Hours'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
              <select
                value={form.day}
                onChange={e => setForm({ ...form, day: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select day</option>
                {daysOrder.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
              <input
                type="time"
                value={form.open_time ?? ''}
                onChange={e => setForm({ ...form, open_time: e.target.value })}
                disabled={form.is_closed}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
              <input
                type="time"
                value={form.close_time ?? ''}
                onChange={e => setForm({ ...form, close_time: e.target.value })}
                disabled={form.is_closed}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={form.is_closed}
                  onChange={e => setForm({ ...form, is_closed: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Closed all day</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              {form.id !== null ? 'Update Hours' : 'Add Hours'}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Business Hours List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Current Schedule</h3>
        </div>

        {/* Loading State */}
        {firstLoad ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="188.5"
                  strokeDashoffset="50"
                />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Loading business hours...</h4>
          </div>
        ) : sortedHours.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No business hours set</h4>
            <p className="text-gray-500 mb-4">Add your first set of business hours to get started</p>
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Add Hours
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedHours.map(h => (
              <div key={h.id} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium text-gray-900">{h.day}</div>
                    {h.is_closed ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        Closed
                      </span>
                    ) : (
                      <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <span className="font-medium">{h.open_time}</span>
                        <span>–</span>
                        <span className="font-medium">{h.close_time}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(h)}
                      className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => dispatch(deleteBusinessHours(h.id))}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
