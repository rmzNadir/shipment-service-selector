import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import React from 'react';

import {
  getRunningOperationPromises,
  getShipment,
  useGetShipmentQuery,
} from '@/services/api';
import { wrapper } from '@/store';

const Shipment = () => {
  const { query, isFallback } = useRouter();
  const shipmentId = query?.id;
  const { data } = useGetShipmentQuery(
    typeof shipmentId === 'string' ? shipmentId : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true-
      // initially until getStaticProps() finishes running
      skip: isFallback,
    }
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
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
