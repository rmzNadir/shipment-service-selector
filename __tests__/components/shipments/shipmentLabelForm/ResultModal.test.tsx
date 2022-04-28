import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';

import { ResultModal, ResultModalProps } from '@/components';

import { render } from '../../../../__mocks__/test-utils';

const props: ResultModalProps = {
  isOpen: true,
  onClose: () => {},
  label: {
    created_at: '2022-04-28T15:08:51.909-05:00',
    updated_at: '2022-04-28T15:08:51.909-05:00',
    status: null,
    tracking_number: '794631751215',
    tracking_status: null,
    label_url:
      'https://shipkraken-demo.s3.amazonaws.com/uploads/label/label_file/20220193-f3af-4c95-a47a-2c61cd8d113e.pdf',
    tracking_url_provider:
      'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=794631751215',
    rate_id: 394205,
  },
  rate: {
    id: '391002',
    type: 'rates',
    attributes: {
      created_at: '2022-04-27T10:03:12.934-05:00',
      updated_at: '2022-04-27T10:03:12.960-05:00',
      amount_local: '134.0',
      currency_local: 'MXN',
      provider: 'CARSSA',
      service_level_name: 'Nacional',
      service_level_code: 'NACIONAL',
      service_level_terms: null,
      days: 10,
      duration_terms: null,
      zone: null,
      arrives_by: null,
      out_of_area: false,
      out_of_area_pricing: '0.0',
      total_pricing: '134.0',
      is_ocurre: false,
      rate_id: 123131,
    },
  },
};

describe('ResultModal', () => {
  it('Renders the ResultModal component if isOpen is true and label and rate are passed', () => {
    render(<ResultModal {...props} />);

    expect(
      screen.getByRole('heading', { name: 'Shipping label(s)' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Carssa Nacional' })
    ).toBeInTheDocument();
  });

  it("Doesn't the ResultModal component if isOpen is false", () => {
    const closedProps: ResultModalProps = { ...props, isOpen: false };
    render(<ResultModal {...closedProps} />);

    expect(
      screen.queryByRole('heading', { name: 'Shipping label(s)' })
    ).not.toBeInTheDocument();
  });

  describe('Close button', () => {
    it('Calls the onClose callback if pressed', () => {
      const onClose = jest.fn();
      const onCloseProps: ResultModalProps = { ...props, onClose };

      render(<ResultModal {...onCloseProps} />);

      const closeButton = screen.getByRole('button', { name: 'Close' });

      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Close modal button', () => {
    it('Calls the onClose callback if pressed', () => {
      const onClose = jest.fn();
      const onCloseProps: ResultModalProps = { ...props, onClose };

      render(<ResultModal {...onCloseProps} />);

      const closeModalButton = screen.getByRole('button', {
        name: 'close modal',
      });

      fireEvent.click(closeModalButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
