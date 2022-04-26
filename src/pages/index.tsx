import { NewShipmentForm } from '@/components';
import { DefaultLayout } from '@/layouts/DefaultLayout';

const Index = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto flex max-w-md flex-col justify-center gap-10">
        <NewShipmentForm />
      </div>
    </DefaultLayout>
  );
};

export default Index;
