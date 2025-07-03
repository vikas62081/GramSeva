import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Event_} from '../../components/events/types';
import {baseQuery} from '../baseQuery';

export type FamilyOverview = {
  totalPopulation: number;
  male: number;
  female: number;
  families: number;
  children: number;
  adults: number;
  seniors: number;
};

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery,
  endpoints: builder => ({
    getFamiliesOverview: builder.query<FamilyOverview, void>({
      query: () => ({
        url: `/dashboard/families`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        console.log(response);
        return response.data;
      },
    }),
    getEventsOverview: builder.query<Event_, void>({
      query: () => ({
        url: `/dashboard/events`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {useGetFamiliesOverviewQuery, useGetEventsOverviewQuery} =
  dashboardApi;
