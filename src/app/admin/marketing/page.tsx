"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchCampaigns, addCampaign, updateCampaign, deleteCampaign, Campaign } from '@/store/admin/campaignSlice';

export default function MarketingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: campaigns, loading, error } = useSelector((s: RootState) => s.campaigns);

  const [form, setForm] = useState<Omit<Campaign, 'id'>>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    active: false,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { dispatch(fetchCampaigns()); }, [dispatch]);

  const reset = () => setForm({ name: '', description: '', start_date: '', end_date: '', active: false });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (editingId != null) dispatch(updateCampaign({ id: editingId, data: form }));
    else dispatch(addCampaign(form));
    reset();
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Salon Marketing Campaigns</h1>
      {!!error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={submit} className="space-y-4 mb-8 max-w-md">
        <input type="text" placeholder="Campaign Name" value={form.name}
          required onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded p-2" />
        <textarea placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded p-2" />
        <div className="flex gap-4">
          <input type="date" value={form.start_date} required
            onChange={e => setForm({ ...form, start_date: e.target.value })} className="border rounded p-2" />
          <input type="date" value={form.end_date} required
            onChange={e => setForm({ ...form, end_date: e.target.value })} className="border rounded p-2" />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId != null ? 'Update Campaign' : 'Add Campaign'}
        </button>
      </form>

{loading ? (
  <p>Loading...</p>
) : (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left px-4 py-2">Name</th>
          <th className="text-left px-4 py-2">Description</th>
          <th className="text-left px-4 py-2">Start</th>
          <th className="text-left px-4 py-2">End</th>
          <th className="text-center px-4 py-2">Active</th>
          <th className="text-center px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((c) => (
          <tr key={c.id} className="hover:bg-gray-50 border-t">
            <td className="px-4 py-2 whitespace-nowrap">{c.name}</td>
            <td className="px-4 py-2">{c.description}</td>
            <td className="px-4 py-2 whitespace-nowrap">{c.start_date}</td>
            <td className="px-4 py-2 whitespace-nowrap">{c.end_date}</td>
            <td className="text-center px-4 py-2">{c.active ? "✔️" : "—"}</td>
            <td className="px-4 py-2">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingId(c.id);
                    setForm({
                      name: c.name,
                      description: c.description || "",
                      start_date: c.start_date,
                      end_date: c.end_date,
                      active: c.active,
                    });
                  }}
                  className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteCampaign(c.id))}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

    </div>
  );
}
