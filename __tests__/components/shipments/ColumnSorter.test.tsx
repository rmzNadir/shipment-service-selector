import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';

import { ColumnSorter, ColumnSorterProps } from '@/components';

import { render } from '../../../__mocks__/test-utils';

const onChange = jest.fn();

const props: ColumnSorterProps = {
  direction: 'ASC',
  onChange,
};

describe('ColumnSorter', () => {
  it('Renders ColumnSorter component', () => {
    render(<ColumnSorter {...props} />);

    expect(
      screen.getByRole('button', { name: /sort column in descending order/i })
    ).toBeInTheDocument();
  });

  it('Clicking the button calls the onChange callback with the right arguments', () => {
    render(<ColumnSorter {...props} />);

    const sorterButton = screen.getByRole('button', {
      name: /sort column in descending order/i,
    });

    fireEvent.click(sorterButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('DESC');
  });
});
