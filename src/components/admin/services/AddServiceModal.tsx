'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addService } from '@/store/admin/servicesSlice';

import {
  FiEdit,
  FiDollarSign,
  FiFileText,
  FiClock,
  FiTag,
  FiImage,
  FiX,
} from 'react-icons/fi';

interface AddServiceModalProps {
  onClose: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.servicesadmin.loading);
  const error = useSelector((state: RootState) => state.servicesadmin.error);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errorImage, setErrorImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setSubmitError('Main image is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('category', category);
    formData.append('featured', featured ? '1' : '0');
    formData.append('image', imageFile);

    try {
      await dispatch(addService(formData)).unwrap();
      onClose();
    } catch {
      setSubmitError('Failed to add service. Please try again.');
    }
  };

  const LabelWithIcon = ({
    htmlFor,
    icon,
    children,
  }: {
    htmlFor: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <label htmlFor={htmlFor} className="text-gray-700 font-medium mb-1 flex items-center gap-1">
      {icon}
      <span>{children}</span>
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-4xl p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <FiX size={24} />
        </button>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="grid grid-cols-2 gap-4"
        >
          <h2 className="col-span-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 text-center mb-4">
            Add New Service
          </h2>

          {submitError && (
            <p className="col-span-2 text-red-600 font-bold text-center mb-2">{submitError}</p>
          )}

          <div className="flex flex-col">
            <LabelWithIcon htmlFor="name" icon={<FiEdit className="text-blue-500" />}>Name *</LabelWithIcon>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <LabelWithIcon htmlFor="price" icon={<FiDollarSign className="text-green-500" />}>Price *</LabelWithIcon>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min={0}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <LabelWithIcon htmlFor="description" icon={<FiFileText className="text-yellow-500" />}>Description</LabelWithIcon>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional description"
            />
          </div>

          <div className="flex flex-col">
            <LabelWithIcon htmlFor="duration" icon={<FiClock className="text-purple-500" />}>Duration *</LabelWithIcon>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min={0}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <LabelWithIcon htmlFor="category" icon={<FiTag className="text-pink-500" />}>Category *</LabelWithIcon>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 col-span-2">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={() => setFeatured(!featured)}
              className="w-5 h-5 accent-pink-500"
            />
            <LabelWithIcon htmlFor="featured" icon={<FiTag className="text-indigo-500" />}>Featured</LabelWithIcon>
          </div>

          <div className="flex flex-col col-span-2">
            <LabelWithIcon htmlFor="image" icon={<FiImage className="text-blue-700" />}>Main Image *</LabelWithIcon>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const maxSize = 2048 * 1024;
                  if (file.size > maxSize) {
                    setErrorImage('Image size must be less than 2MB.');
                    e.target.value = '';
                    return;
                  }
                  setErrorImage(null);
                  setImageFile(file);
                }
              }}
              required
              className="border border-gray-300 rounded-lg py-2 px-3"
            />
            {errorImage && <p className="text-red-500 text-sm mt-1">{errorImage}</p>}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-bold text-white rounded-2xl shadow-lg transition-all ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 hover:from-rose-600 hover:via-pink-600 hover:to-orange-600'
              }`}
            >
              {loading ? 'Adding...' : 'Add Service'}
            </button>
          </div>

          {error && <p className="col-span-2 text-center text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
