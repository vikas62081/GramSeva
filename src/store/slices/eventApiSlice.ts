import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../baseQuery';
import {Contributor, Event_, Expense} from '../../components/events/types';

// Types
export interface EventHead {
  id: string;
  name: string;
}

export interface SuccessResponse<T> {
  data: Event_[];
  page: number;
  limit: number;
  total_pages: number;
  total_count: number;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery,
  tagTypes: ['Event', 'Contributor', 'Expense'],
  endpoints: builder => ({
    // Events
    getEvents: builder.query<
      SuccessResponse<Event_[]>,
      {page?: number; limit?: number; search?: string}
    >({
      query: ({page = 1, limit = 10, search}) => ({
        url: '/events',
        method: 'GET',
        params: {page, limit, ...(search && {search})},
      }),
      providesTags: ['Event'],
    }),

    getEventById: builder.query<Event_, string>({
      query: id => ({
        url: `/events/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: (result, error, id) => [{type: 'Event', id}],
    }),

    createEvent: builder.mutation<SuccessResponse<Event_>, Partial<Event_>>({
      query: newEvent => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
      // invalidatesTags: ['Event'],
    }),

    updateEvent: builder.mutation<
      SuccessResponse<Event_>,
      {eventId: string; event: Partial<Event_>}
    >({
      query: ({eventId, event}) => ({
        url: `/events/${eventId}`,
        method: 'PUT',
        body: event,
      }),
      invalidatesTags: (result, error, {eventId}) => [
        {type: 'Event', id: eventId},
        'Event',
      ],
    }),

    deleteEvent: builder.mutation<SuccessResponse<Event_>, string>({
      query: eventId => ({
        url: `/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),

    // Contributors
    getContributors: builder.query<Contributor[], string>({
      query: eventId => ({
        url: `/events/${eventId}/contributors`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Contributor'],
    }),

    addContributor: builder.mutation<
      SuccessResponse<Contributor>,
      {eventId: string; contributor: Partial<Contributor>}
    >({
      query: ({eventId, contributor}) => ({
        url: `/events/${eventId}/contributors`,
        method: 'POST',
        body: contributor,
      }),
      invalidatesTags: ['Contributor'],
    }),

    updateContributor: builder.mutation<
      SuccessResponse<Contributor>,
      {
        eventId: string;
        contributorId: string;
        contributor: Partial<Contributor>;
      }
    >({
      query: ({eventId, contributorId, contributor}) => ({
        url: `/events/${eventId}/contributors/${contributorId}`,
        method: 'PUT',
        body: contributor,
      }),
      invalidatesTags: ['Contributor'],
    }),

    deleteContributor: builder.mutation<
      SuccessResponse<Contributor>,
      {eventId: string; contributorId: string}
    >({
      query: ({eventId, contributorId}) => ({
        url: `/events/${eventId}/contributors/${contributorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contributor'],
    }),

    // Expenses
    getExpenses: builder.query<Expense[], string>({
      query: eventId => ({
        url: `/events/${eventId}/expenses`,
        method: 'GET',
      }),
      providesTags: ['Expense'],
      transformResponse: (response: any) => response.data,
    }),

    addExpense: builder.mutation<
      SuccessResponse<Expense>,
      {eventId: string; expense: Partial<Expense>}
    >({
      query: ({eventId, expense}) => ({
        url: `/events/${eventId}/expenses`,
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),

    updateExpense: builder.mutation<
      SuccessResponse<Expense>,
      {eventId: string; expenseId: string; expense: Partial<Expense>}
    >({
      query: ({eventId, expenseId, expense}) => ({
        url: `/events/${eventId}/expenses/${expenseId}`,
        method: 'PUT',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),

    deleteExpense: builder.mutation<
      SuccessResponse<Expense>,
      {eventId: string; expenseId: string}
    >({
      query: ({eventId, expenseId}) => ({
        url: `/events/${eventId}/expenses/${expenseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,

  useGetContributorsQuery,
  useAddContributorMutation,
  useUpdateContributorMutation,
  useDeleteContributorMutation,

  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = eventApi;

export const {resetApiState: resetEventApiState} = eventApi.util;
