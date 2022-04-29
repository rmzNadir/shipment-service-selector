import { LoadingOverlay } from '@mantine/core';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import React from 'react';

import { Error } from '@/components';
import { ShipmentLabelForm } from '@/components/shipments/shipmentLabelForm';
import { usePageErrorHandler } from '@/hooks';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import {
  getRunningOperationPromises,
  getShipment,
  useGetShipmentQuery,
} from '@/services/api';
import { wrapper } from '@/store';

const Shipment = () => {
  const { query, isFallback } = useRouter();

  const shipmentId = query?.id;

  const { data, isLoading, error } = useGetShipmentQuery(
    typeof shipmentId === 'string' ? shipmentId : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true-
      // initially until getStaticProps() finishes running
      skip: isFallback,
    }
  );

  const shouldShowErrorPage = usePageErrorHandler(error);

  if (shouldShowErrorPage) {
    return <Error />;
  }

  return (
    <DefaultLayout>
      <div className="relative mx-auto flex flex-col justify-center">
        <LoadingOverlay visible={isLoading} />

        <ShipmentLabelForm included={data?.included} />
      </div>
    </DefaultLayout>
  );
};

export default Shipment;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const id = params?.id;

      if (typeof id === 'string') {
        store.dispatch(getShipment.initiate(id));
      }

      await Promise.all(getRunningOperationPromises());

      return {
        props: {},
      };
    }
);
