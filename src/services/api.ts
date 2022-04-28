import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { CreateShipment, Label, Shipment } from '@/types';

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
  extractRehydrationInfo(action) {
    if (action.type === HYDRATE) {
      return action.payload.api;
    }
  },
  tagTypes: ['Shipment'],
  endpoints: (builder) => ({
    // QUERIES
    getShipment: builder.query<Shipment, string>({
      query: (id) => `shipments/${id}`,
      providesTags: (_res, _error, id) => [{ type: 'Shipment' as const, id }],
    }),
    // MUTATIONS
    createShipment: builder.mutation<Shipment, CreateShipment>({
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
    createLabel: builder.mutation<Label, string>({
      query: (rateId) => ({
        url: 'labels',
        method: 'POST',
        body: {
          // We get a string from the /shipments/:id endpoint but this one
          // requires an integer
          rate_id: +rateId,
          label_format: 'pdf',
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateShipmentMutation,
  useGetShipmentQuery,
  useCreateLabelMutation,
  useLazyGetShipmentQuery,
  util: { getRunningOperationPromises },
} = skydropxApi;

// Export endpoints for use in SSR
export const { getShipment } = skydropxApi.endpoints;
