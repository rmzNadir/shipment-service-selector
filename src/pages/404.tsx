import { Button, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { DefaultLayout } from '@/layouts/DefaultLayout';

const NotFound = () => {
  return (
    <DefaultLayout>
      <div className="flex h-2/3 flex-col items-center justify-center gap-10">
        <Title className="text-[8rem]">Oops!</Title>
        <Text className="text-[2rem]">
          We couldn&apos;t find what you were looking for.
        </Text>
        <Link href="/" passHref>
          <Button component="a" size="xl">
            Take me back
          </Button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default NotFound;
