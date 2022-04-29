import { Title } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Empty, Error, ShipmentsTable } from '@/components';
import { usePageErrorHandler } from '@/hooks';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import {
  getRunningOperationPromises,
  getShipments,
  useGetShipmentsQuery,
} from '@/services/api';
import { wrapper } from '@/store';

const Shipments = () => {
  const { isFallback } = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useGetShipmentsQuery(
    { page },
    {
      skip: isFallback,
    }
  );

  const shipments = data?.data ?? [];

  const shouldShowErrorPage = usePageErrorHandler(error);

  if (shouldShowErrorPage) {
    return <Error />;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto flex flex-col justify-center gap-10">
        <Title className="text-center sm:text-left">Shipments</Title>

        {shipments?.length > 0 ? (
          <ShipmentsTable
            shipments={shipments}
            page={page}
            onPageChange={setPage}
            isLoading={isLoading || isFetching}
          />
        ) : (
          <Empty message="No shipments available." />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Shipments;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getShipments.initiate({ page: 1 }));

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
