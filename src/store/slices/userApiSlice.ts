import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../baseQuery';
import {User} from './authApiSlice';
import {familyApi} from './familyApiSlice';

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
  tagTypes: ['User'],
  endpoints: builder => ({
    getUser: builder.query<User, string>({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      // providesTags: (result, error, {userId}) => [{type: 'User', id: userId}],
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
          let patchResult: any;
          try {
            patchResult = dispatch(
              familyApi.util.updateQueryData('getFamilyById', userId, draft => {
                draft['status'] = status;
              }),
            );
            await queryFulfilled;
          } catch {
            patchResult?.undo?.();
          }
        },
      },
    ),
  }),
});

export const {useGetUserQuery, useUpdateUserStatusMutation} = userApi;

export const {resetApiState: resetUserApiState} = userApi.util;
