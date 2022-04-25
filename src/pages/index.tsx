import { DefaultLayout } from '@/layouts/DefaultLayout';
import { useGetLabelsQuery } from '@/services/api';

const Index = () => {
  const { data, error, isLoading } = useGetLabelsQuery();
  console.log(data, error, isLoading);

  return (
    <DefaultLayout
      title="Shipment Service Selector"
      description="Find the best shipping service for your needs"
    >
      asd
    </DefaultLayout>
  );
};

export default Index;
