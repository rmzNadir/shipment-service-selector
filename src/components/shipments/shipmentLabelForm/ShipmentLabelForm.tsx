import { Button, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { Empty } from '@/components';
import { useCreateLabelMutation } from '@/services/api';
import { Included, IncludedRate } from '@/types';

import { ShippingOptionsTable } from './ShippingOptionsTable';

export interface ShipmentLabelFormProps {
  included?: Included[];
}

export interface ShipmentLabelFormSchema {
  rate?: string;
}

export const ShipmentLabelForm = ({ included }: ShipmentLabelFormProps) => {
  const router = useRouter();
  const [createLabel, { isLoading }] = useCreateLabelMutation();

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
      let message =
        'Something went wrong, please try again, or choose a different provider.';

      if ('error' in res && 'data' in res.error) {
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
    <div className="flex flex-col gap-6">
      <Title>Shipping options</Title>

      {rates?.length ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <ShippingOptionsTable form={form} rates={rates} />
          <div className="mt-16 flex w-full justify-end">
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <Empty tryAgainRoute="/" />
      )}
    </div>
  );
};
