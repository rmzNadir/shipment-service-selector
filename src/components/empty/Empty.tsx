import { Button, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { MoodEmpty } from 'tabler-icons-react';

export interface EmptyProps {
  tryAgainRoute?: string;
  message?: string;
}

export const Empty = ({ tryAgainRoute, message }: EmptyProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center">
        <Title className="text-[4rem]">
          <MoodEmpty size={64} />
        </Title>
        <Text className="text-[2rem]">{message || 'No data.'}</Text>
      </div>
      {tryAgainRoute && (
        <Link href={tryAgainRoute} passHref>
          <Button size="lg" aria-label="try again">
            Try again
          </Button>
        </Link>
      )}
    </div>
  );
};
