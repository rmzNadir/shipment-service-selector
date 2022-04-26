import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { Error } from '@/components';

import { render } from '../../../__mocks__/test-utils';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Error', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/some-route');
  });

  it('Renders the error component', () => {
    render(<Error />);

    expect(
      screen.getByRole('heading', {
        name: /oops!/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Something went wrong, please try again later/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /try again/i,
      })
    ).toBeInTheDocument();
  });

  it('Refreshes the page if the try again button is pressed', () => {
    render(<Error />);

    const tryAgainButton = screen.getByRole('button', {
      name: /try again/i,
    });

    fireEvent.click(tryAgainButton);

    expect(singletonRouter).toMatchObject({ asPath: '/some-route' });
  });
});
