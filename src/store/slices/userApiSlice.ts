import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../baseQuery';
import {User} from './authApiSlice';
import {familyApi} from './familyApiSlice';
import {Pagination, PaginationRequest} from '../types';

// Define types for the user review data
export interface UserReview {
  id: string;
  userId: string;
  review: string;
  status: string;
  createdAt: string;
  // Add other fields as per API response
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User', 'Family'],
  endpoints: builder => ({
    getUsers: builder.query<Pagination<User[]>, PaginationRequest>({
      query: ({page = 1, limit = 10, search, status} = {}) => {
        return {
          url: '/users',
          method: 'GET',
          params: {
            page,
            limit,
            ...(search && {search}),
            ...(status && {status}),
          },
        };
      },
      transformResponse: (response: any) => response.data,
    }),
    getUser: builder.query<User, string>({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: (result, error, userId) => [{type: 'User', id: userId}],
    }),
    updateUserStatus: builder.mutation<User, {userId: string; status?: string}>(
      {
        query: ({userId, status}) => ({
          url: `/users/${userId}/status`,
          method: 'PUT',
          params: {status},
        }),
        transformResponse: (response: any) => response.data,
        async onQueryStarted({userId, status}, {dispatch, queryFulfilled}) {
          const {data: updatedUser} = await queryFulfilled;
          let patchResult: any;
          try {
            if (updatedUser.family_id) {
              patchResult = dispatch(
                familyApi.util.updateQueryData(
                  'getFamilyById',
                  updatedUser.family_id,
                  draft => {
                    draft['status'] = status;
                  },
                ),
              );
            }
          } catch {
            patchResult?.undo?.();
          }
        },
      },
    ),
  }),
});

export const {useGetUserQuery, useUpdateUserStatusMutation, useGetUsersQuery} =
  userApi;

export const {resetApiState: resetUserApiState} = userApi.util;
