import { ActionIcon } from '@mantine/core';
import React from 'react';
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';

export interface PaginationProps {
  page: number;
  onChange(page: number): void;
}

// Since I can't get the total out of the response headers this simple pagination will have to do for now
export const Pagination = ({ page, onChange }: PaginationProps) => {
  return (
    <div className="flex gap-2 ">
      <ActionIcon
        variant="default"
        color="blue"
        aria-label="previous page"
        size="lg"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        <ArrowLeft size={16} />
      </ActionIcon>
      <ActionIcon
        variant="light"
        color="blue"
        aria-label="current page"
        role="display"
        size="lg"
      >
        {page}
      </ActionIcon>
      <ActionIcon
        variant="default"
        color="blue"
        aria-label="next page"
        size="lg"
        onClick={() => onChange(page + 1)}
      >
        <ArrowRight size={16} />
      </ActionIcon>
    </div>
  );
};
