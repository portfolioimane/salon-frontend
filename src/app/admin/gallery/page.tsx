"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGallery, uploadImages, deleteImage } from "@/store/admin/gallerySlice";

const GOLDEN_ROSE = "from-rose-600 via-pink-600 to-orange-500";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

function Modal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl text-gray-900">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded bg-gradient-to-r ${GOLDEN_ROSE} text-white font-semibold hover:brightness-90 transition`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const dispatch = useAppDispatch();
  const { list: images, loading, error } = useAppSelector((state) => state.gallery);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  // Modal states
  const [showUploadAlert, setShowUploadAlert] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // Check if any file is > 2MB
      const tooLargeFile = files.find(file => file.size > 2 * 1024 * 1024);
      if (tooLargeFile) {
        setFileError(`File "${tooLargeFile.name}" is larger than 2MB. Please select smaller files.`);
        setSelectedFiles([]);
      } else {
        setFileError(null);
        setSelectedFiles(files);
      }
    }
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) {
      setShowUploadAlert(true);
      return;
    }
    if (fileError) {
      setShowUploadAlert(true);
      return;
    }
    await dispatch(uploadImages(selectedFiles)).unwrap();
    setSelectedFiles([]);
  }

  function confirmDelete(id: number) {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  }

  async function handleDelete() {
    if (deleteId !== null) {
      await dispatch(deleteImage(deleteId)).unwrap();
      setDeleteId(null);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
        Gallery
      </h1>

      <div>
        <p className="mb-2 text-sm text-gray-600">
          Please upload images no larger than 2MB each.
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-2"
        />
        {fileError && <p className="text-red-600 mb-2">{fileError}</p>}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`px-4 py-2 bg-gradient-to-r ${GOLDEN_ROSE} text-white rounded disabled:opacity-50`}
        >
          Upload
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : images.length === 0 ? (
        <p>No images yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map(({ id, image_path }) => (
            <div key={id} className="relative group rounded overflow-hidden border border-gray-300">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/${image_path}`}
                alt="Gallery"
                className="object-cover w-full h-48"
              />
              <button
                onClick={() => confirmDelete(id)}
                className="absolute top-1 right-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-rose-500 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                title="Delete Image"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload alert modal */}
      <Modal
        isOpen={showUploadAlert}
        title="Upload Error"
        message={fileError ?? "Please select one or more images before uploading."}
        onCancel={() => setShowUploadAlert(false)}
        confirmText=""
      />

      {/* Delete confirm modal */}
      <Modal
        isOpen={showDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this image?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
