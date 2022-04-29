import { ActionIcon } from '@mantine/core';
import React from 'react';
import { ArrowDown, ArrowUp } from 'tabler-icons-react';

export type Direction = 'ASC' | 'DESC';

export interface ColumnSorterProps {
  onChange(direction: Direction): void;
  direction: Direction;
}

export const ColumnSorter = ({ onChange, direction }: ColumnSorterProps) => {
  return (
    <ActionIcon
      color="violet"
      variant="filled"
      onClick={() => onChange(direction === 'ASC' ? 'DESC' : 'ASC')}
      aria-label={`Sort column in ${
        direction === 'ASC' ? 'descending' : 'ascending'
      } order`}
    >
      {direction === 'DESC' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
    </ActionIcon>
  );
};
