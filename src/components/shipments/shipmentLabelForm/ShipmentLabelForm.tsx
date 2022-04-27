import { Button, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React from 'react';

import { Included } from '@/types';

import { ShippingOptionsTable } from './ShippingOptionsTable';

export interface ShipmentLabelFormProps {
  rates: Included[];
}

export interface ShipmentLabelFormSchema {
  rate?: string;
}

export const ShipmentLabelForm = ({ rates }: ShipmentLabelFormProps) => {
  const form = useForm<ShipmentLabelFormSchema>({
    initialValues: {
      rate: rates?.[0]?.id ?? undefined,
    },
  });

  const handleSubmit = async (formValues: ShipmentLabelFormSchema) => {
    console.log(formValues);
    // const res = await createShipment(shipmentData);

    // if ('error' in res) {
    //   showNotification({
    //     color: 'red',
    //     title: 'Error',
    //     message: 'Something went wrong, please try again 😓',
    //   });

    //   return;
    // }

    // showNotification({
    //   color: 'green',
    //   title: 'Success',
    //   message: 'Shipment successfully created! 🥳',
    // });

    // reset();

    // const shipmentId = res.data.data.id;

    // router.push(`/shipments/${shipmentId}`);
  };

  return (
    <>
      <Title>Shipping options</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ShippingOptionsTable form={form} rates={rates} />
        <div className="mt-16 flex w-full justify-end">
          <Button type="submit" loading={false}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
