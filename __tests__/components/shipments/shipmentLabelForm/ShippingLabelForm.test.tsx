import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';

import { ShipmentLabelForm, ShipmentLabelFormProps } from '@/components';

import { render } from '../../../../__mocks__/test-utils';

const onSubmit = jest.fn();

jest.mock('@mantine/hooks', () => ({
  ...jest.requireActual('@mantine/hooks'),
  useForm() {
    return {
      onSubmit,
      values: {
        rate: '390417',
      },
    };
  },
}));

const props: ShipmentLabelFormProps = {
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

describe('ShipmentLabelForm', () => {
  it('Renders the form', () => {
    render(<ShipmentLabelForm {...props} />);

    expect(
      screen.getByRole('heading', { name: /Shipping options/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/shipping company/i)).toBeInTheDocument();
    expect(screen.getByText(/DHL Express/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it("Mantine's useForm onSubmit callback is correctly set", () => {
    render(<ShipmentLabelForm {...props} />);

    // dev mode react renders twice, that's why the callback
    // to get the actual onSubmit function gets called twice
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
