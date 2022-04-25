import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const skydropxApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-demo.skydropx.com/v1/',
    prepareHeaders: (headers) => {
      headers.set(
        'authorization',
        `Token token=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLabels: builder.query<any, void>({
      query: () => `labels`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLabelsQuery } = skydropxApi;
