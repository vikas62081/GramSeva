import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../baseQuery';
import {SuccessResponse} from '../types';

// Types
export interface LoginRequest {
  username: string; // phone number
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: 'Male' | 'Female';
}

export interface OtpVerificationRequest {
  optRequestId: string;
  otp: number;
}

export interface ResetPasswordRequest {
  phone: string;
  new_password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  gender: 'Male' | 'Female';
  family_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse extends User {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    // Login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
      transformResponse: (resp: any) => resp.data,
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Forgot Password
    forgotPassword: builder.mutation<
      SuccessResponse<{message: string}>,
      {phone: string}
    >({
      query: ({phone}) => ({
        url: `/auth/forgot-password?phone=${phone}`,
        method: 'POST',
      }),
    }),

    // OTP Verification
    verifyOtp: builder.mutation<
      SuccessResponse<{message: string}>,
      OtpVerificationRequest
    >({
      query: otpData => ({
        url: '/auth/otp-verification',
        method: 'POST',
        body: otpData,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<
      SuccessResponse<{message: string}>,
      ResetPasswordRequest
    >({
      query: resetData => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: resetData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;

export const {resetApiState: resetAuthApiState} = authApi.util;
