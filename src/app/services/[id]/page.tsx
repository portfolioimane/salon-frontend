// app/services/[id]/page.tsx
import ServiceDetailsWrapper from '@/components/frontend/services/servicedetails/ServiceDetailsWrapper';
import api from '@/utils/axios';

interface Params {
  id: string;
}

interface ServiceDetailsPageProps {
  params: Params | Promise<Params>;
}

const ServiceDetailsPage = async ({ params }: ServiceDetailsPageProps) => {
  const resolvedParams = await params; // <-- Await here
  const { id } = resolvedParams;
  
  const res = await api.get(`/services/${id}`);
  const service = res.data;

  return (
    <div className="container mx-auto p-6">
      <ServiceDetailsWrapper service={service} />
    </div>
  );
};

export default ServiceDetailsPage;