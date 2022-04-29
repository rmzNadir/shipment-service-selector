import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { ShipmentsTableRow, ShipmentsTableRowProps } from '@/components';

import { render } from '../../../__mocks__/test-utils';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const props: ShipmentsTableRowProps = {
  shipment: {
    id: '121',
    type: 'shipments',
    attributes: {
      status: 'SUCCESS',
      created_at: '2021-12-21T12:18:50.470-06:00',
      updated_at: '2021-12-21T12:18:57.427-06:00',
    },
    relationships: {
      parcels: {
        data: [
          {
            id: '70',
            type: 'parcels',
          },
        ],
      },
      rates: {
        data: [
          {
            id: '779',
            type: 'rates',
          },
          {
            id: '778',
            type: 'rates',
          },
          {
            id: '777',
            type: 'rates',
          },
          {
            id: '776',
            type: 'rates',
          },
          {
            id: '775',
            type: 'rates',
          },
          {
            id: '774',
            type: 'rates',
          },
          {
            id: '773',
            type: 'rates',
          },
        ],
      },
      address_to: {
        data: {
          id: '375',
          type: 'addresses',
        },
      },
      address_from: {
        data: {
          id: '374',
          type: 'addresses',
        },
      },
      order: {
        data: null,
      },
      labels: {
        data: [
          {
            id: '13',
            type: 'labels',
          },
        ],
      },
      consignment_note_product_class: {
        data: null,
      },
      consignment_note_packaging: {
        data: null,
      },
    },
  },
};

describe('ShipmentsTable', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/shipments');
  });

  it('Renders ShipmentsTableRow component', () => {
    render(<ShipmentsTableRow {...props} />);

    expect(
      screen.getByRole('link', { name: 'view shipment with id 121' })
    ).toBeInTheDocument();
    expect(screen.getByText('121')).toBeInTheDocument();
    expect(screen.getByText('21/12/2021 12:18 PM')).toBeInTheDocument();
  });

  describe('View shipment link', () => {
    it('Sends the user to the correct page', () => {
      render(<ShipmentsTableRow {...props} />);

      const viewShipmentButton = screen.getByRole('link', {
        name: 'view shipment with id 121',
      });

      fireEvent.click(viewShipmentButton);

      expect(singletonRouter).toMatchObject({ asPath: '/shipments/121' });
    });
  });
});
