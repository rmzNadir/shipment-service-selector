import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';

import { ShipmentForm } from '@/components';

import { render } from '../../../__mocks__/test-utils';

describe('ShipmentForm', () => {
  it('Renders the form', () => {
    render(<ShipmentForm />);

    expect(
      screen.getByRole('heading', {
        name: /shipment details/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/origin postal code/i)).toBeInTheDocument();
    expect(screen.getByText(/destination postal code/i)).toBeInTheDocument();
    expect(screen.getByText(/width/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(/length/i)).toBeInTheDocument();
    expect(screen.getByText(/weight/i)).toBeInTheDocument();
  });

  describe('Add new item button', () => {
    it('Adds a new item when pressed', () => {
      render(<ShipmentForm />);

      const addNewItemButton = screen.getByRole('button', {
        name: /add new item/i,
      });

      expect(screen.getAllByText(/width/i).length).toBe(1);

      fireEvent.click(addNewItemButton);

      expect(screen.getAllByText(/width/i).length).toBe(2);
    });
  });

  describe('Remove item button', () => {
    it('Removes an item when pressed', () => {
      render(<ShipmentForm />);

      const addNewItemButton = screen.getByRole('button', {
        name: /add new item/i,
      });

      fireEvent.click(addNewItemButton);

      expect(screen.getAllByText(/width/i).length).toBe(2);

      const removeItemButton = screen.getAllByRole('button', {
        name: /remove item/i,
      })[0] as HTMLElement;

      fireEvent.click(removeItemButton);

      expect(screen.getAllByText(/width/i).length).toBe(1);
    });
  });
});
