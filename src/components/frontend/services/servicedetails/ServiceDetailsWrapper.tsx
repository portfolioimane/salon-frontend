'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setServiceDetails, Service} from '@/store/frontend/servicesSlice';
import ServiceDetails from './ServiceDetails';

interface ServiceDetailsWrapperProps {
  service: Service;
}

const ServiceDetailsWrapper = ({ service }: ServiceDetailsWrapperProps) => {
  const dispatch = useAppDispatch();

  // Hydrate Redux store with service details
  useEffect(() => {
    dispatch(setServiceDetails(service));
  }, [dispatch, service]);

  return <ServiceDetails />;
};

export default ServiceDetailsWrapper;
