import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';

import { Pagination, PaginationProps } from '@/components';

import { render } from '../../../__mocks__/test-utils';

const props: PaginationProps = {
  page: 2,
  onChange: () => {},
};

describe('Pagination', () => {
  it('Renders Pagination component', () => {
    render(<Pagination {...props} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('Correctly handles pressing the next page button', () => {
    const onChange = jest.fn();
    const nextPageProps: PaginationProps = { ...props, onChange };
    render(<Pagination {...nextPageProps} />);

    const nextPageButton = screen.getByRole('button', { name: /next page/i });

    fireEvent.click(nextPageButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('Correctly handles pressing the previous page button', () => {
    const onChange = jest.fn();
    const prevPageProps: PaginationProps = { ...props, onChange };
    render(<Pagination {...prevPageProps} />);

    const previousPageButton = screen.getByRole('button', {
      name: /previous page/i,
    });

    fireEvent.click(previousPageButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
