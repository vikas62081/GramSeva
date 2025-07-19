import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getFromStorage} from '../utils/AsyncStorage';

const DEV_API_URL = 'http://0.0.0.0:4000';
const PROD_API_URL = 'https://gramseva-backend-jqo2.onrender.com';

export const baseQuery = fetchBaseQuery({
  baseUrl: __DEV__ ? DEV_API_URL : PROD_API_URL,
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
