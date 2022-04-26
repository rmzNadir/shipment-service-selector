import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Error } from '@/components';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import {
  getRunningOperationPromises,
  getShipment,
  useGetShipmentQuery,
} from '@/services/api';
import { wrapper } from '@/store';

const Shipment = () => {
  const { query, isFallback, push } = useRouter();
  const shipmentId = query?.id;
  const { data, isLoading, error, isError } = useGetShipmentQuery(
    typeof shipmentId === 'string' ? shipmentId : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true-
      // initially until getStaticProps() finishes running
      skip: isFallback,
    }
  );

  // <in> check is required for correctly inferring the error type
  const is404 = error && 'status' in error && error.status === 404;

  // Ensures push method gets called only after component has mounted
  useEffect(() => {
    if (is404) {
      push('/404');
    }
  }, [is404, push]);

  if (isError && !is404) {
    return <Error />;
  }

  return (
    <DefaultLayout isLoading={isLoading || isFallback}>
      <div>{JSON.stringify(data, null, 4)}</div>
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
