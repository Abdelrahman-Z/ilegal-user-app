import { GetQuestionsQueryParams, GetQuestionsResponse } from "@/types";
import { getToken } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["question"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }), // Replace with your API base URL
  endpoints: (builder) => ({
    // auth
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/auth/login", // Replace with your login endpoint
        method: "POST",
        body: credentials,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/user/auth/forget-password", // Replace with your forget password endpoint
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/user/auth/verify-reset-token",
        method: "PATCH",
        body: otpData,
      }),
    }),
    resetPassord: builder.mutation({
      query: (data) => ({
        url: "/user/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // summrization
    summarizeText: builder.mutation({
      query: (text) => ({
        url: "/document-summarizer/static",
        method: "POST",
        body: { text },
      }),
    }),
    submitDynamicForm: builder.mutation({
      query: (formData) => ({
        url: "/document-summarizer/dynamic",
        method: "POST",
        body: formData,
      }),
    }),
    // translation
    translate: builder.mutation({
      query: (data) => ({
        url: "/translate/text",
        method: "POST",
        body: data,
      }),
    }),
    // questions
    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/question",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["question"],
    }),
    getQuestions: builder.query<GetQuestionsResponse, GetQuestionsQueryParams>({
      query: ({ page, limit }) => `/question?page=${page}&limit=${limit}`,
      providesTags: ["question"], // Attach tags for cache invalidation
    }),
    // Add other endpoints here
  }),
});

export const {
  // user
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPassordMutation,
  // summrization
  useSummarizeTextMutation,
  useSubmitDynamicFormMutation,
  // translation
  useTranslateMutation,
  //questions
  useCreateQuestionMutation,
  useGetQuestionsQuery,
} = api;
