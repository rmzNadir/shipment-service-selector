import { Button, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { Empty } from '@/components';
import {
  useCreateLabelMutation,
  useLazyGetShipmentQuery,
} from '@/services/api';
import {
  Included,
  IncludedLabel,
  IncludedRate,
  LabelAttributes,
} from '@/types';

import { ResultModal } from './ResultModal';
import { ShippingOptionsTable } from './ShippingOptionsTable';

export interface ShipmentLabelFormProps {
  included?: Included[];
  isLoading: boolean;
}

export interface ShipmentLabelFormSchema {
  rate?: string;
}

export const ShipmentLabelForm = ({
  included,
  isLoading,
}: ShipmentLabelFormProps) => {
  const { query } = useRouter();
  const [createLabel, { isLoading: isCreatingLabel, data }] =
    useCreateLabelMutation();
  const [showModal, setShowModal] = useState(false);
  const [getShipment, { data: shipmentData, isSuccess: didFetchShipment }] =
    useLazyGetShipmentQuery();

  // TS can't infer discriminated unions from array's filter method
  // so we have to turn the callback into a explicit type guard as well
  const rates = useMemo(
    () =>
      included?.filter((item): item is IncludedRate => item.type === 'rates'),
    [included]
  );

  const form = useForm<ShipmentLabelFormSchema>({
    initialValues: {
      rate: undefined,
    },
  });

  const handleSubmit = async (formValues: ShipmentLabelFormSchema) => {
    if (typeof formValues.rate !== 'string') {
      return;
    }

    const res = await createLabel(formValues.rate);

    if ('error' in res || res.data.data.attributes.status === 'ERROR') {
      if ('error' in res && 'data' in res.error) {
        const { code } = res.error.data as { code: string };

        if (code === 'label_exists') {
          const shipmentID = query!.id as string;

          const { isSuccess, data } = await getShipment(shipmentID);

          if (isSuccess && data) {
            const { included } = data;
            const label = included.find(
              (item): item is IncludedLabel => item.type === 'labels'
            );

            const selectedRate = label!.attributes.rate_id;

            form.setFieldValue('rate', selectedRate.toString());

            showNotification({
              color: 'blue',
              title: 'Info',
              message: 'Label(s) already exists',
            });

            setShowModal(true);

            return;
          }
        }
      }

      showNotification({
        color: 'red',
        title: 'Error',
        message:
          'Something went wrong, please try again, or choose a different provider.',
      });

      return;
    }

    showNotification({
      color: 'green',
      title: 'Success',
      message: 'Label(s) successfully created! 🥳',
    });

    setShowModal(true);
  };

  let labelAttrs: LabelAttributes | undefined;

  if (didFetchShipment && shipmentData) {
    const label = shipmentData.included.find(
      (item): item is IncludedLabel => item.type === 'labels'
    );

    labelAttrs = label?.attributes;
  } else {
    labelAttrs = data?.data.attributes;
  }

  const rate = rates?.find(
    (rate) => rate.id === labelAttrs?.rate_id?.toString()
  );

  return (
    <div className="flex flex-col gap-10">
      <Title className="text-center sm:text-left">Shipping options</Title>

      {rates?.length ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <ShippingOptionsTable
            form={form}
            rates={rates}
            isLoading={isLoading}
          />
          <div className="mt-12 flex w-full justify-end">
            <Button
              type="submit"
              loading={isCreatingLabel}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <Empty
          tryAgainRoute="/new-shipment"
          message="No providers available, try creating a new shipment"
        />
      )}

      <ResultModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        label={labelAttrs}
        rate={rate}
      />
    </div>
  );
};
