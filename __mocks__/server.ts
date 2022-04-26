import { setupServer } from 'msw/node';

import { createShipmentHandler } from './createShipment';

export const server = setupServer(...createShipmentHandler);
