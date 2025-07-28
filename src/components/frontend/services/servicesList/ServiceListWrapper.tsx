'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setServices, setLoading, Service } from '@/store/frontend/servicesSlice';
import ServiceList from './ServiceList';

interface ServiceListWrapperProps {
  services: Service[];
}

const ServiceListWrapper = ({ services }: ServiceListWrapperProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));         // Optional: show loading
    dispatch(setServices(services));    // Set services & hide loading
  }, [dispatch, services]);

  return <ServiceList />;
};

export default ServiceListWrapper;
