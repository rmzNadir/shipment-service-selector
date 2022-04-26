import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import NotFound from '@/pages/404';

import { render } from '../../__mocks__/test-utils';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('404', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/404');
  });

  it('Renders the 404 page', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', {
        name: /oops!/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/We couldn't find what you were looking for./i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /take me back/i,
      })
    ).toBeInTheDocument();
  });

  it('Sends the user to the base route if the take me back link is pressed', () => {
    render(<NotFound />);

    const takeMeBackLink = screen.getByRole('link', {
      name: /take me back/i,
    });

    fireEvent.click(takeMeBackLink);

    expect(singletonRouter).toMatchObject({ asPath: '/' });
  });
});
