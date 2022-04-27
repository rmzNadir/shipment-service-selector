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
import { RateAttributes } from '@/types';

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

  if (!data?.included?.length) {
    return <Error />;
  }

  const rates = data.included
    .filter((item) => item.type === 'rates')
    .sort((a, b) => {
      const { days: aDays } = a.attributes as RateAttributes;
      const { days: bDays } = b.attributes as RateAttributes;

      return aDays - bDays;
    });

  return (
    <DefaultLayout isLoading={isLoading || isFallback}>
      <div className="mx-auto flex flex-col justify-center gap-10">
        <ShipmentLabelForm rates={rates} />
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
