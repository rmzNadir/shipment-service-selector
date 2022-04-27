import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { Empty, EmptyProps } from '@/components';

import { render } from '../../../__mocks__/test-utils';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const props: EmptyProps = {
  tryAgainRoute: '/some-other-route',
  message: 'Some message',
};

describe('Empty', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/some-route');
  });

  it('Renders the empty component with the correct message', () => {
    render(<Empty {...props} />);

    expect(screen.getByText(/some message/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /try again/i,
      })
    ).toBeInTheDocument();
  });

  it('Sends the user to the correct page if the try again button is pressed', () => {
    render(<Empty {...props} />);

    const tryAgainButton = screen.getByRole('button', {
      name: /try again/i,
    });

    fireEvent.click(tryAgainButton);

    expect(singletonRouter).toMatchObject({ asPath: '/some-other-route' });
  });
});
