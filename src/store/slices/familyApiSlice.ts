import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../baseQuery';
import {Family, FamilyMember} from '../../components/family/types';
import {Pagination} from '../types';

// Define types for the family data

export const familyApi = createApi({
  reducerPath: 'familyApi',
  baseQuery,
  tagTypes: ['Family'],
  endpoints: builder => ({
    getFamilies: builder.query<
      Pagination<Family[]>,
      {page?: number; limit?: number; search?: string; status?: string}
    >({
      query: ({page = 1, limit = 10, search, status}) => ({
        url: '/family',
        method: 'GET',
        params: {
          page,
          limit,
          ...(search && {search}),
          ...(status && {status}),
        },
      }),
      providesTags: ['Family'],
    }),

    getFamilyById: builder.query<FamilyMember, string>({
      query: id => ({
        url: `/family/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => response.data,
      providesTags: (result, error, id) => [{type: 'Family', id}],
    }),

    createFamily: builder.mutation<Family, Partial<Family>>({
      query: newFamily => ({
        url: '/family',
        method: 'POST',
        body: newFamily,
      }),
      invalidatesTags: ['Family'],
    }),

    addFamilyMember: builder.mutation<
      FamilyMember,
      {familyId: string; member: Partial<FamilyMember>}
    >({
      query: ({familyId, member}) => ({
        url: `/family/${familyId}/member`,
        method: 'POST',
        body: member,
      }),
      invalidatesTags: (result, error, {familyId}) => [
        {type: 'Family', id: familyId},
        'Family',
      ],
    }),

    updateFamilyMember: builder.mutation<
      FamilyMember,
      {familyId: string; memberId: string; member: Partial<FamilyMember>}
    >({
      query: ({familyId, memberId, member}) => ({
        url: `/family/${familyId}/member/${memberId}`,
        method: 'PUT',
        body: member,
      }),
      invalidatesTags: (result, error, {familyId}) => [
        {type: 'Family', id: familyId},
        'Family',
      ],
    }),
  }),
});

export const {
  useGetFamiliesQuery,
  useGetFamilyByIdQuery,
  useCreateFamilyMutation,
  useAddFamilyMemberMutation,
  useUpdateFamilyMemberMutation,
} = familyApi;

export const {resetApiState: resetFamilyApiState} = familyApi.util;
