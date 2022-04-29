import { ShipmentForm } from '@/components';
import { DefaultLayout } from '@/layouts/DefaultLayout';

const NewShipment = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto flex max-w-xl flex-col justify-center gap-10">
        <ShipmentForm />
      </div>
    </DefaultLayout>
  );
};

export default NewShipment;
