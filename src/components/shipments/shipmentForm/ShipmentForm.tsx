import {
  ActionIcon,
  Button,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { Plus, Trash } from 'tabler-icons-react';

import { useCreateShipmentMutation } from '@/services/api';
import { Parcel } from '@/types';

const BASE_PARCEL = {
  weight: '',
  height: '',
  width: '',
  length: '',
};

export const ShipmentForm = () => {
  const router = useRouter();
  const [createShipment, { isLoading }] = useCreateShipmentMutation();
  const {
    getInputProps,
    onSubmit,
    values,
    removeListItem,
    getListInputProps,
    addListItem,
    reset,
  } = useForm({
    initialValues: {
      originPostalCode: '',
      destinationPostalCode: '',
      parcels: formList([BASE_PARCEL]),
    },
  });

  const handleSubmit = async ({ parcels, ...otherValues }: typeof values) => {
    const parsedParcels = parcels.map((parcel) => {
      const parsedParcel: Partial<Parcel> = {
        distance_unit: 'CM',
        mass_unit: 'KG',
      };

      Object.entries(parcel).forEach((entry) => {
        const [key, value] = entry as [keyof typeof parcel, string];
        parsedParcel[key] = +value;
      });

      return parsedParcel as Parcel;
    });

    const shipmentData = { ...otherValues, parcels: parsedParcels };

    const res = await createShipment(shipmentData);

    if ('error' in res) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Something went wrong, please try again 😓',
      });

      return;
    }

    showNotification({
      color: 'green',
      title: 'Success',
      message: 'Shipment successfully created! 🥳',
    });

    reset();

    const shipmentId = res.data.data.id;

    router.push(`/shipments/${shipmentId}`);
  };

  const parcels = values.parcels.map((_, index, baseArr) => {
    const shouldRenderAddNewParcel = index === baseArr.length - 1;
    const shouldRenderRemoveParcel = baseArr.length > 1;

    return (
      <div key={index} className="relative mt-6">
        <div className="flex items-center gap-5 ">
          <div className="flex items-end gap-2">
            <TextInput
              placeholder="e.g. 10"
              required
              type="number"
              label="Width"
              {...getListInputProps('parcels', index, 'width')}
            />
            <Text weight="bold">cm</Text>
          </div>

          <div className="flex items-end gap-2">
            <TextInput
              placeholder="e.g. 10"
              required
              type="number"
              label="Height"
              {...getListInputProps('parcels', index, 'height')}
            />
            <Text weight="bold">cm</Text>
          </div>

          <div className="flex items-end gap-2">
            <TextInput
              placeholder="e.g. 10"
              required
              type="number"
              label="Length"
              itemType="number"
              {...getListInputProps('parcels', index, 'length')}
            />
            <Text weight="bold">cm</Text>
          </div>
        </div>
        <div className="mt-2 flex items-end gap-2">
          <TextInput
            placeholder="e.g. 10"
            required
            type="number"
            label="Weight"
            className="w-full"
            {...getListInputProps('parcels', index, 'weight')}
          />
          <Text weight="bold">kg</Text>
        </div>

        <div className="absolute -right-24 bottom-0 flex min-w-[4.5rem] gap-2">
          {shouldRenderRemoveParcel && (
            <Tooltip label="Remove item">
              <ActionIcon
                color="red"
                variant="filled"
                onClick={() => removeListItem('parcels', index)}
                disabled={isLoading}
                aria-label="remove item"
                size="lg"
              >
                <Trash size={16} />
              </ActionIcon>
            </Tooltip>
          )}
          {shouldRenderAddNewParcel && (
            <Tooltip label="Add new item">
              <ActionIcon
                color="blue"
                variant="filled"
                onClick={() => addListItem('parcels', BASE_PARCEL)}
                disabled={isLoading}
                aria-label="add new item"
                size="lg"
              >
                <Plus size={16} />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      <Title>Shipment Details</Title>
      <form onSubmit={onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Origin postal code"
          type="number"
          placeholder="e.g. 02900"
          {...getInputProps('originPostalCode')}
        />

        <TextInput
          required
          label="Destination postal code"
          type="number"
          placeholder="e.g. 44100"
          {...getInputProps('destinationPostalCode')}
          className="mt-6"
        />

        <div className="mt-6">
          <Text weight="bold" className="-mb-2">
            Items
          </Text>
          {parcels}
        </div>

        <div className="mt-16 flex w-full justify-end">
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
