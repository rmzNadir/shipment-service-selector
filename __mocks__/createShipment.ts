import { rest } from 'msw';

export const createShipmentHandler = [
  rest.post(
    `${process.env.NEXT_PUBLIC_API_URL}/shipments`,
    (_req, res, ctx) => {
      return res(ctx.json({ data: {} }), ctx.delay(50));
    }
  ),
];
