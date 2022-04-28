import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';

import { Navbar, NavbarProps } from '@/components';

import { render } from '../../../__mocks__/test-utils';

const props: NavbarProps = {
  onClose: () => {},
  visible: true,
};

describe('Navbar', () => {
  it("Renders the Navbar's links", () => {
    render(<Navbar {...props} />);

    expect(
      screen.getByRole('link', { name: /create shipment/i })
    ).toBeInTheDocument();
  });
});
