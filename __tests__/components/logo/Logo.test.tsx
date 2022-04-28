import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';

import { Logo } from '@/components';

import { render } from '../../../__mocks__/test-utils';

describe('Logo', () => {
  it('Renders the Logo component with dark color scheme', () => {
    render(<Logo colorScheme="dark" />);

    expect(screen.getByTestId('light-logo')).toBeInTheDocument();
  });

  it('Renders the Logo component with dark color scheme', () => {
    render(<Logo colorScheme="light" />);

    expect(screen.getByTestId('dark-logo')).toBeInTheDocument();
  });
});
