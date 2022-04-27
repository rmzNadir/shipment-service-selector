import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';

import { ShippingOptionsTable, ShippingOptionsTableProps } from '@/components';

import { render } from '../../../../__mocks__/test-utils';

const setFieldValue = jest.fn();

const props: ShippingOptionsTableProps = {
  // @ts-expect-error
  form: {
    setFieldValue,
    values: {
      rate: '390417',
    },
  },
  rates: [
    {
      id: '390417',
      type: 'rates',
      attributes: {
        created_at: '2022-04-26T15:25:26.795-05:00',
        updated_at: '2022-04-26T15:25:26.847-05:00',
        amount_local: '296.0',
        currency_local: 'MXN',
        provider: 'DHL',
        service_level_name: 'DHL Express',
        service_level_code: 'EXPRESS',
        service_level_terms: null,
        days: 2,
        duration_terms: null,
        zone: null,
        arrives_by: null,
        out_of_area: false,
        out_of_area_pricing: '0.0',
        total_pricing: '296.0',
        is_ocurre: false,
      },
    },
  ],
};

describe('ShippingOptionsTable', () => {
  it('Renders the table', () => {
    render(<ShippingOptionsTable {...props} />);

    expect(screen.getByText(/shipping company/i)).toBeInTheDocument();
    expect(screen.getByText(/DHL Express/i)).toBeInTheDocument();
    expect(screen.getByText('▶️'));
    expect(screen.getByText('⏩'));
    expect(screen.getByText('💵'));
    expect(screen.getByText('🥇'));
    expect(
      screen.getByText(/Estimated days until delivery/i)
    ).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText(/Out of area pricing/i)).toBeInTheDocument();
    expect(screen.getByText('0.0')).toBeInTheDocument();
    expect(screen.getByText(/Local area pricing/i)).toBeInTheDocument();
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
    expect(screen.queryAllByText('296.0').length).toBe(2);
    expect(screen.getByText(/Currency/i)).toBeInTheDocument();
    expect(screen.getByText(/mxn/i)).toBeInTheDocument();
  });

  describe('Clicking on the radio button', () => {
    it('Fires the setFieldValue with the right params', () => {
      render(<ShippingOptionsTable {...props} />);

      const radioButton = screen.getByRole('radio', {
        name: /select shipping provider/i,
      });

      fireEvent.click(radioButton);

      expect(setFieldValue).toHaveBeenCalledTimes(1);
      expect(setFieldValue).toHaveBeenCalledWith('rate', '390417');
    });
  });
});
