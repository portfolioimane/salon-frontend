"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGallery } from "@/store/admin/gallerySlice";

export default function Gallery() {
  const dispatch = useAppDispatch();
  const gallery = useAppSelector((state) => state.gallery.list);
  const loading = useAppSelector((state) => state.gallery.loading); // assuming loading state exists

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl shadow-lg">

      {loading ? (
        <p className="text-center text-gray-500">Loading gallery images...</p>
      ) : gallery.length === 0 ? (
        <p className="text-center text-gray-500">No gallery images yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map(({ id, image_path }) => (
            <div
              key={id}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 aspect-square"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/${image_path}`}
                alt="Gallery"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-xl font-semibold mb-2">Our Work</h3>
                <p className="text-sm opacity-90">Professional styling & care</p>
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
