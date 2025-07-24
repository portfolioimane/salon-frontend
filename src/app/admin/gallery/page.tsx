"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Plus, Trash2, Edit3, X, Save } from "lucide-react";

type GalleryImage = {
  id: number;
  url: string;
  caption: string;
};

const initialImages: GalleryImage[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    caption: "Elegant Haircut",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80",
    caption: "Relaxing Spa Session",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=400&q=80",
    caption: "Manicure Art",
  },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open modal for adding new image
  const openAddModal = () => {
    setEditingImage(null);
    setUrlInput("");
    setCaptionInput("");
    setIsModalOpen(true);
  };

  // Open modal for editing caption
  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setUrlInput(image.url);
    setCaptionInput(image.caption);
    setIsModalOpen(true);
  };

  // Delete image
  const deleteImage = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  // Handle file upload (simulate by converting to data URL)
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setUrlInput(base64);
    };
    reader.readAsDataURL(file);
  };

  // Save add/edit image
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      alert("Image URL or upload is required");
      return;
    }
    if (!captionInput.trim()) {
      alert("Caption is required");
      return;
    }

    if (editingImage) {
      // Edit existing
      setImages((prev) =>
        prev.map((img) =>
          img.id === editingImage.id
            ? { ...img, url: urlInput.trim(), caption: captionInput.trim() }
            : img
        )
      );
    } else {
      // Add new
      const newImage: GalleryImage = {
        id: images.length ? Math.max(...images.map((i) => i.id)) + 1 : 1,
        url: urlInput.trim(),
        caption: captionInput.trim(),
      };
      setImages((prev) => [...prev, newImage]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Image
        </button>
      </div>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images in gallery yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map(({ id, url, caption }) => (
            <div
              key={id}
              className="relative rounded shadow border border-gray-200 overflow-hidden group"
            >
              <img
                src={url}
                alt={caption}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-3 bg-white">
                <p className="text-gray-900 font-semibold truncate">{caption}</p>
              </div>

              {/* Action buttons on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-2">
                <button
                  onClick={() => openEditModal({ id, url, caption })}
                  title="Edit Caption"
                  className="bg-white p-1 rounded shadow hover:bg-gray-100"
                >
                  <Edit3 className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => deleteImage(id)}
                  title="Delete Image"
                  className="bg-white p-1 rounded shadow hover:bg-gray-100"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
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
              {editingImage ? "Edit Image" : "Add New Image"}
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image URL
                </label>
                <input
                  id="url"
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste image URL here or upload a file"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Or Upload Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="caption"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Caption <span className="text-red-500">*</span>
                </label>
                <input
                  id="caption"
                  type="text"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  required
                  placeholder="Describe the image"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
