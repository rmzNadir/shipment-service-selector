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
import { useEffect, useRef } from 'react';
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
  } = useForm({
    initialValues: {
      originPostalCode: '',
      destinationPostalCode: '',
      parcels: formList([BASE_PARCEL]),
    },
  });
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      // autoFocus prop on input isn't working
      firstInputRef.current.focus();
    }
  }, [firstInputRef]);

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

    const shipmentId = res.data.data.id;

    await router.push(`/shipments/${shipmentId}`);

    showNotification({
      color: 'green',
      title: 'Success',
      message: 'Shipment successfully created! 🥳',
    });
  };

  const parcels = values.parcels.map((_, index, baseArr) => {
    const shouldRenderAddNewParcel = index === baseArr.length - 1;
    const shouldRenderRemoveParcel = baseArr.length > 1;

    return (
      <div key={index} className="relative mt-4 flex flex-col ">
        <div className="flex min-h-[2rem] items-end justify-between">
          <Text weight="bold">#{index + 1}</Text>
          <div className="flex items-center gap-2">
            {shouldRenderRemoveParcel && (
              <Tooltip label="Remove item">
                <ActionIcon
                  color="red"
                  variant="filled"
                  onClick={() => removeListItem('parcels', index)}
                  disabled={isLoading}
                  aria-label="remove item"
                >
                  <Trash size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="items-center gap-5 sm:flex">
            <div className="flex items-end gap-2">
              <TextInput
                placeholder="e.g. 10"
                required
                type="number"
                label="Width"
                className="w-full"
                {...getListInputProps('parcels', index, 'width')}
              />
              <Text weight="bold">cm</Text>
            </div>

            <div className="mt-2 flex  items-end gap-2 sm:mt-0">
              <TextInput
                placeholder="e.g. 10"
                required
                type="number"
                label="Height"
                className="w-full"
                {...getListInputProps('parcels', index, 'height')}
              />
              <Text weight="bold">cm</Text>
            </div>

            <div className="mt-2 flex items-end gap-2 sm:mt-0">
              <TextInput
                placeholder="e.g. 10"
                required
                type="number"
                label="Length"
                itemType="number"
                className="w-full"
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
        </div>
        {shouldRenderAddNewParcel && (
          <Tooltip label="Add new item" className="mt-6 self-end">
            <ActionIcon
              color="blue"
              variant="filled"
              onClick={() => addListItem('parcels', BASE_PARCEL)}
              disabled={isLoading}
              aria-label="add new item"
            >
              <Plus size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
    );
  });

  return (
    <>
      <Title className="text-center sm:text-left">Shipment Details</Title>
      <form onSubmit={onSubmit(handleSubmit)}>
        <TextInput
          ref={firstInputRef}
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

        <div className="mt-12 flex w-full justify-end">
          <Button
            type="submit"
            loading={isLoading}
            className="w-full sm:w-auto"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
