import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { CreateShipment, CreateShipmentResult } from '@/types';

import { baseCreateShipmentBody } from './baseBodies';

// Define a service using a base URL and expected endpoints
export const skydropxApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        'authorization',
        `Token token=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      return headers;
    },
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getLabels: builder.query<any, void>({
      query: () => `labels`,
    }),
    createShipment: builder.mutation<CreateShipmentResult, CreateShipment>({
      query: ({ originPostalCode, destinationPostalCode, ...rest }) => ({
        url: 'shipments',
        method: 'POST',
        body: {
          ...baseCreateShipmentBody,
          address_from: {
            ...baseCreateShipmentBody.address_from,
            zip: originPostalCode,
          },
          address_to: {
            ...baseCreateShipmentBody.address_from,
            zip: destinationPostalCode,
          },
          ...rest,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLabelsQuery, useCreateShipmentMutation } = skydropxApi;
