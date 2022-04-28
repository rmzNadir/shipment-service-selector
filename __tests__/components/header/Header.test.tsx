import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';

import { Header, HeaderProps } from '@/components';

import { render } from '../../../__mocks__/test-utils';

const props: HeaderProps = {
  height: 60,
  setIsOpen: () => {},
  isOpen: true,
};

describe('Header', () => {
  it('Renders the Header component', () => {
    render(<Header {...props} />);

    expect(screen.getByTestId('light-logo')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /set light theme/i })
    ).toBeInTheDocument();
  });
});
