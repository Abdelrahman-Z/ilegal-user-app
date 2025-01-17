import {
  GetJurisdictionsQueryParams,
  GetJurisdictionsResponse,
  GetQuestionsQueryParams,
  GetQuestionsResponse,
} from "@/types";
import { getToken } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["question", "jurisdictions"],
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
    translateFile: builder.mutation({
      query: (data) => ({
        url: "/translate/pdf",
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
    // jurisdictions
    createJurisdiction: builder.mutation({
      query: (body) => ({
        url: "/jurisdiction/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["jurisdictions"],
    }),
    getJurisdictions: builder.query<
      GetJurisdictionsResponse,
      GetJurisdictionsQueryParams
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/jurisdiction?page=${page}&limit=${limit}`,
      providesTags: ["jurisdictions"],
    }),
    updateJurisdiction: builder.mutation({
      query: ({ id, name }) => ({
        url: `/jurisdiction/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["jurisdictions"],
    }),
    deleteJurisdiction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/jurisdiction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jurisdictions"],
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
  useTranslateFileMutation,
  //questions
  useCreateQuestionMutation,
  useGetQuestionsQuery,
  // jurisdictions
  useCreateJurisdictionMutation,
  useGetJurisdictionsQuery,
  useUpdateJurisdictionMutation,
  useDeleteJurisdictionMutation,
} = api;
