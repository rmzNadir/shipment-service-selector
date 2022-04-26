import { Button, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

import { DefaultLayout } from '@/layouts/DefaultLayout';

export const Error = () => {
  const { reload } = useRouter();
  return (
    <DefaultLayout>
      <div className="flex h-2/3 flex-col items-center justify-center gap-10">
        <Title className="text-[8rem]">Oops!</Title>
        <Text className="text-[2rem]">
          Something went wrong, please try again later.
        </Text>
        <Button size="xl" onClick={() => reload()} aria-label="try again">
          Try again
        </Button>
      </div>
    </DefaultLayout>
  );
};
