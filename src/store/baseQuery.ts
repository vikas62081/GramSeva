import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getFromStorage} from '../utils/AsyncStorage';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://gramseva-backend-jqo2.onrender.com',
  prepareHeaders: async headers => {
    try {
      const token = await getFromStorage('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return headers;
  },
});
