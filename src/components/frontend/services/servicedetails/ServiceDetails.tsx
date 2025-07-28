'use client';

import { useAppSelector } from '@/store/hooks';
import { FaClock, FaMoneyBillWave, FaTag } from 'react-icons/fa';
import BookingForm from './BookingForm'; // adjust path as needed

const ServiceDetails = () => {
  const service = useAppSelector((state) => state.services.details);

  if (!service) return <p className="text-center py-10 text-gray-600">Loading service details...</p>;

  return (
    <section className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-8 my-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Left Column: Image + Details */}
      <div className="md:col-span-2 flex flex-col gap-8">
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-md h-96">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.image}`}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{service.name}</h1>
          <p className="text-gray-600 mb-6">{service.description || 'No description available.'}</p>

          <div className="flex flex-col gap-4 text-gray-700 text-lg">
            <div className="flex items-center gap-3">
              <FaTag className="text-pink-500" />
              <span>
                <strong>Category:</strong> {service.category || 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-pink-500" />
              <span>
                <strong>Duration:</strong> {service.duration ? `${service.duration} min` : 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-pink-500" />
              <span>
                <strong>Price:</strong> {service.price} MAD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Booking Form */}
      <div className="bg-rose-50 rounded-3xl p-6 shadow-lg">
        <BookingForm serviceId={service.id} />
      </div>
    </section>
  );
};

export default ServiceDetails;
