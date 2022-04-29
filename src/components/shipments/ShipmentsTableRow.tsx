import { ActionIcon } from '@mantine/core';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Eye } from 'tabler-icons-react';

import { ShipmentData } from '@/types';

export interface ShipmentsTableRowProps {
  shipment: ShipmentData;
}

export const ShipmentsTableRow = ({ shipment }: ShipmentsTableRowProps) => {
  const { id, attributes } = shipment;
  const { created_at: creationDate } = attributes;
  return (
    <tr>
      <td>
        <Link href={`/shipments/${id}`} passHref>
          <ActionIcon
            component="a"
            role="link"
            variant="light"
            color="blue"
            aria-label={`view shipment with id ${id}`}
          >
            <Eye size={16} />
          </ActionIcon>
        </Link>
      </td>
      <td>{id}</td>
      <td>{format(parseISO(creationDate), 'dd/MM/yyyy HH:mm a')}</td>
    </tr>
  );
};
