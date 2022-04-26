import { NewShipmentForm } from '@/components';
import { DefaultLayout } from '@/layouts/DefaultLayout';

const Index = () => {
  return (
    <DefaultLayout
      title="Shipment Service Selector"
      description="Find the best shipping service for your needs"
    >
      <div className="mx-auto flex max-w-md flex-col justify-center gap-10">
        <NewShipmentForm />
      </div>
    </DefaultLayout>
  );
};

export default Index;
