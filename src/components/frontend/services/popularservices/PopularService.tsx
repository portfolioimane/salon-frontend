'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { useState, useMemo } from 'react';

const ServiceList = () => {
  const router = useRouter();
  const { popular, loading } = useAppSelector((state) => state.services);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories as string[]
  const categories: string[] = useMemo(() => {
    return [...new Set(popular.map((service) => service.category).filter(Boolean))] as string[];
  }, [popular]);

  // Filter popular services based on selected category
  const filteredList = selectedCategory
    ? popular.filter((service) => service.category === selectedCategory)
    : popular;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-xl animate-pulse">Loading services...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl shadow-lg">
      {/* Browse by Category */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide drop-shadow-sm">
          Popular Services
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition
              ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-md shadow-pink-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-100'
              }
            `}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border capitalize transition
                ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-md shadow-pink-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-100'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Service Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredList.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 font-semibold text-lg">
            No services found for selected category.
          </div>
        ) : (
          filteredList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.image}`}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2
                  className="text-lg font-bold text-gray-800 truncate mb-2"
                  title={service.name}
                >
                  {service.name}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-4">
                               
                  <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                    Duration: {service.duration} min
                  </span>
                </div>

                <p className="text-yellow-500 font-extrabold text-xl mb-4">{service.price} MAD</p>

                <button
                  onClick={() => router.push(`/services/${service.id}`)}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white py-3 rounded-2xl font-semibold transition-colors shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ServiceList;
