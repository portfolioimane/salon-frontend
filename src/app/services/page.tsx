// Home.tsx
import ServiceListWrapper from '@/components/frontend/services/servicesList/ServiceListWrapper';
import api from '@/utils/axios'; // Import your axios utility

const Home = async () => {
  // Fetch data using axios on the server
  const res = await api.get('/services'); // Use the API endpoint
  const services = res.data;
  
  return (
    <div className="container mx-auto p-6">
      {/* Pass data to the Client Component */}
      <ServiceListWrapper services={services} />
    </div>
  );
};

export default Home;