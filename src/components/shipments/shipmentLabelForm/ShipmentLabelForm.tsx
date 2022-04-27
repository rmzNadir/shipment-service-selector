import { Button, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import React from 'react';

import { useCreateLabelMutation } from '@/services/api';
import { Included } from '@/types';

import { ShippingOptionsTable } from './ShippingOptionsTable';

export interface ShipmentLabelFormProps {
  rates: Included[];
}

export interface ShipmentLabelFormSchema {
  rate?: string;
}

export const ShipmentLabelForm = ({ rates }: ShipmentLabelFormProps) => {
  const router = useRouter();
  const [createLabel, { isLoading }] = useCreateLabelMutation();

  const form = useForm<ShipmentLabelFormSchema>({
    initialValues: {
      rate: rates?.[0]?.id ?? undefined,
    },
  });

  const handleSubmit = async (formValues: ShipmentLabelFormSchema) => {
    if (typeof formValues.rate !== 'string') {
      return;
    }

    const res = await createLabel(formValues.rate);

    if ('error' in res) {
      let message =
        'Something went wrong, please try again, or choose a different provider.';

      if ('data' in res.error) {
        const { code } = res.error.data as { code: string };

        if (code === 'label_exists') {
          message = 'Label already exists, please try creating a new label.';

          await router.push(`/`);
        }
      }

      showNotification({
        color: 'red',
        title: 'Error',
        message,
      });

      return;
    }

    showNotification({
      color: 'green',
      title: 'Success',
      message: 'Label successfully created! 🥳',
    });

    const { label_url: labelUrl, tracking_url_provider: trackingUrlProvider } =
      res.data.data.attributes;

    // eslint-disable-next-line no-console
    console.log(labelUrl, trackingUrlProvider);
  };

  return (
    <>
      <Title>Shipping options</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ShippingOptionsTable form={form} rates={rates} />
        <div className="mt-16 flex w-full justify-end">
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
