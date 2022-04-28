/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import AbortController from 'abort-controller';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { server } from './__mocks__/server.ts';

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
