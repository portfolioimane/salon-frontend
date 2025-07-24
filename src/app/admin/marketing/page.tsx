"use client";

import React, { useState } from "react";

type Campaign = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  bookingsGenerated: number;
};

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Spring Special 20% Off",
    description: "Discount on all haircuts and color services during April",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    active: true,
    bookingsGenerated: 34,
  },
  {
    id: 2,
    name: "Refer a Friend Bonus",
    description: "Clients get a free manicure for every friend referred",
    startDate: "2025-03-15",
    endDate: "2025-05-15",
    active: false,
    bookingsGenerated: 12,
  },
];

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [newCampaign, setNewCampaign] = useState<Omit<Campaign, "id" | "bookingsGenerated">>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    active: false,
  });

  const handleAddCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate) {
      alert("Please fill in all required fields.");
      return;
    }
    const nextId = campaigns.length ? Math.max(...campaigns.map(c => c.id)) + 1 : 1;
    setCampaigns([...campaigns, { ...newCampaign, id: nextId, bookingsGenerated: 0 }]);
    setNewCampaign({ name: "", description: "", startDate: "", endDate: "", active: false });
  };

  const toggleCampaignActive = (id: number) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Salon Marketing Campaigns</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Campaign</h2>
        <div className="space-y-3 max-w-md">
          <input
            type="text"
            placeholder="Campaign Name"
            value={newCampaign.name}
            onChange={e => setNewCampaign({ ...newCampaign, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Description (optional)"
            value={newCampaign.description}
            onChange={e => setNewCampaign({ ...newCampaign, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex gap-4">
            <div>
              <label className="block mb-1">Start Date</label>
              <input
                type="date"
                value={newCampaign.startDate}
                onChange={e => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                className="border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1">End Date</label>
              <input
                type="date"
                value={newCampaign.endDate}
                onChange={e => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="active"
              type="checkbox"
              checked={newCampaign.active}
              onChange={e => setNewCampaign({ ...newCampaign, active: e.target.checked })}
            />
            <label htmlFor="active">Active</label>
          </div>
          <button
            onClick={handleAddCampaign}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Campaign
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Current Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>No campaigns found.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Bookings Generated</th>
                <th className="border border-gray-300 px-4 py-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(({ id, name, description, startDate, endDate, bookingsGenerated, active }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">{name}</td>
                  <td className="border border-gray-300 px-4 py-2">{description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{startDate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{endDate}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{bookingsGenerated}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleCampaignActive(id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
