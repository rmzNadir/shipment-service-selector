import { LoadingOverlay, ScrollArea, Table } from '@mantine/core';
import React from 'react';

import { ShipmentData } from '@/types';

import { Pagination, PaginationProps } from './Pagination';
import { ShipmentsTableRow } from './ShipmentsTableRow';

export interface ShipmentsTableProps {
  page: PaginationProps['page'];
  onPageChange: PaginationProps['onChange'];
  isLoading: boolean;
  shipments: ShipmentData[];
}

export const ShipmentsTable = ({
  shipments,
  isLoading,
  page,
  onPageChange,
}: ShipmentsTableProps) => {
  return (
    <div className="flex flex-col gap-10">
      <ScrollArea>
        <div className="relative overflow-x-auto whitespace-nowrap">
          <LoadingOverlay visible={isLoading} />

          <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
            <thead>
              <tr>
                <th>View shipment</th>
                <th>Shipment ID</th>
                <th>Creation date</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <ShipmentsTableRow key={shipment.id} shipment={shipment} />
              ))}
            </tbody>
          </Table>
        </div>
      </ScrollArea>
      <div className="-mt-4 self-end">
        <Pagination page={page} onChange={onPageChange} />
      </div>
    </div>
  );
};
