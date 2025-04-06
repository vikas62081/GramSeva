import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000',
  prepareHeaders: headers => {
    // You can add authentication headers here if needed
    return headers;
  },
});
