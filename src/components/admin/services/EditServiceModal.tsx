'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchServiceById, updateService } from '@/store/admin/servicesSlice'; // adjust your slice import
import { useRouter } from 'next/navigation';

import {
  FiEdit, FiDollarSign, FiFileText, FiTag, FiClock,
  FiImage, FiXCircle,
} from 'react-icons/fi';

interface EditServiceModalProps {
  serviceId: number;
  onClose: () => void;
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const EditServiceModal: React.FC<EditServiceModalProps> = ({ serviceId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { current: service, loading, error } = useSelector((state: RootState) => state.servicesadmin);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errorImage, setErrorImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description);
      setPrice(service.price.toString());
      setDuration(service.duration.toString());
      setCategory(service.category);
      setFeatured(service.featured);

      setImageFile(null);
      setImagePreview(null);
      setExistingImageUrl(
        service.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.image}` : null
      );
      setSubmitError(null);
      setErrorImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [service]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price || !duration || !category.trim()) {
      setSubmitError('Please fill all required fields.');
      return;
    }

    if (errorImage) {
      setSubmitError('Please fix the image error before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('category', category);
    formData.append('featured', featured ? '1' : '0');

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (!existingImageUrl) {
      // If no image preview or existing URL, means image removed
      formData.append('image_deleted', 'true');
    }

    try {
      await dispatch(updateService({ id: serviceId, formData })).unwrap();
      onClose();
    } catch {
      setSubmitError('Failed to update service. Please try again.');
    }
  };

  if (!service) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <p className="text-white text-lg">Loading service data...</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white rounded-xl p-6 max-w-xl w-full max-h-[90vh] overflow-auto shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Service</h2>

        {submitError && (
          <p className="text-red-600 font-semibold mb-4 text-center">{submitError}</p>
        )}
        {error && <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>}

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1 flex items-center gap-1">
            <FiEdit className="text-blue-500" />
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1 flex items-center gap-1">
            <FiFileText className="text-purple-500" />
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Optional"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block font-semibold mb-1 flex items-center gap-1">
            <FiDollarSign className="text-green-500" />
            Price (MAD) *
          </label>
          <input
            id="price"
            type="number"
            min={0}
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="duration" className="block font-semibold mb-1 flex items-center gap-1">
            <FiClock className="text-purple-600" />
            Duration (minutes) *
          </label>
          <input
            id="duration"
            type="number"
            min={0}
            value={duration}
            onChange={e => setDuration(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold mb-1 flex items-center gap-1">
            <FiTag className="text-pink-500" />
            Category *
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Featured */}
        <div className="mb-4 flex items-center gap-2">
          <input
            id="featured"
            type="checkbox"
            checked={featured}
            onChange={() => setFeatured(!featured)}
            className="w-5 h-5 cursor-pointer accent-pink-600"
          />
          <label htmlFor="featured" className="select-none font-semibold">
            Featured
          </label>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="image" className="block font-semibold mb-1 flex items-center gap-1">
            <FiImage className="text-orange-500" />
            Main Image
          </label>

          {(existingImageUrl || imagePreview) && (
            <div className="relative mb-2 w-60 h-40 rounded overflow-hidden border border-gray-300">
              <img
                src={imagePreview || existingImageUrl || ''}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setExistingImageUrl(null);
                  setImagePreview(null);
                  setErrorImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-1 hover:bg-red-200"
                aria-label="Remove image"
              >
                <FiXCircle />
              </button>
            </div>
          )}

          <input
            id="image"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              if (file && file.size > MAX_IMAGE_SIZE) {
                setErrorImage('Image must be less than 2MB.');
                setImageFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
              }
              setErrorImage(null);
              setImageFile(file);
              setExistingImageUrl(null);
              setSubmitError(null);
            }}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errorImage && (
            <p className="text-red-600 font-semibold mt-1">{errorImage}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditServiceModal;
