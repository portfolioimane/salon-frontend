'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setPopularServices, setLoading, Service } from '@/store/frontend/servicesSlice'; // ✅ Import the Property type
import PopularService from './PopularService';

interface PopularServiceWrapperProps {
  services: Service[];
}

const PopularServiceWrapper = ({ services }: PopularServiceWrapperProps) => {
  const dispatch = useAppDispatch();

  // Hydrate Redux store on the client
  useEffect(() => {
    dispatch(setLoading(true));         // Optional: show loading

    dispatch(setPopularServices(services));
  }, [dispatch, services]);

  return <PopularService />;
};

export default PopularServiceWrapper;