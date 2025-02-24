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
  tagTypes: [
    "question",
    "jurisdictions",
    "users",
    "roles",
    "Template",
    "Document",
    "tokens",
    "signDocuments",
  ],
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
    // users
    createUser: builder.mutation({
      query: (user) => ({
        url: "/user", // Replace with the actual endpoint for creating users
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    getUsers: builder.query({
      query: ({ page, limit }) =>
        `/user/all/tenant?page=${page}&limit=${limit}`,
      providesTags: ["users"],
    }),
    patchUserStatus: builder.mutation({
      query: ({ id, activate }: { id: string; activate: boolean }) => ({
        url: `/user/activate-deactivate/${id}?activate=${activate}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
    getUserById: builder.query<{ userRole: { roleId: string }[] }, string>({
      query: (userId) => `/user/one/${userId}`,
    }),
    // roles
    createRole: builder.mutation<void, { name: string }>({
      query: (body) => ({
        url: `/tenants/roles`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["roles"],
    }),
    getAllRoles: builder.query<
      { id: string; name: string }[],
      { search: string }
    >({
      query: ({ search }) => `/roles/search?search=${search}`,
      providesTags: ["roles"],
    }),
    getRoles: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `/tenants/roles?page=${page}&limit=${limit}`,
      providesTags: ["roles"],
    }),
    assignRoles: builder.mutation<void, { userId: string; roleIds: string[] }>({
      query: ({ userId, roleIds }) => ({
        url: `/users/${userId}/roles`,
        method: "POST",
        body: { roleIds },
      }),
      invalidatesTags: ["users"],
    }),
    deleteRole: builder.mutation<void, string>({
      query: (roleId) => ({
        url: `/tenants/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["roles"],
    }),
    updateRole: builder.mutation<void, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/tenants/roles/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["roles"],
    }),
    updateRolePermissions: builder.mutation<
      void,
      { roleId: string; permissionIds: string[] }
    >({
      query: ({ roleId, permissionIds }) => ({
        url: `/roles/${roleId}/permissions`,
        method: "POST",
        body: { permissionIds },
      }),
      invalidatesTags: ["roles"],
    }),
    // permissions
    getPermissions: builder.query<any[], void>({
      query: () => "/permission/category",
    }),
    getAllPermissions: builder.query({
      query: ({ page, limit }) => ({
        url: `/permission`,
        method: "GET",
        params: {
          page,
          limit,
        },
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
    translateWordFile: builder.mutation({
      query: (data) => ({
        url: "/translate/word",
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
    // templates
    getTemplate: builder.query({
      query: (id) => `/templates/one/${id}`,
      providesTags: ["Template"],
    }),

    // Get all templates
    getTemplates: builder.query({
      query: () => "/templates/all",
      providesTags: ["Template"],
    }),

    // Update template
    updateTemplate: builder.mutation({
      query: ({ id, body }) => ({
        url: `/templates/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Template"],
    }),
    approveTemplate: builder.mutation({
      query: (id) => ({
        url: `/templates/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Template"],
    }),
    rejectTemplate: builder.mutation({
      query: ({ id, body }) => ({
        url: `/templates/reject/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Template"],
    }),
    // Delete template
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Template"],
    }),
    addTemplate: builder.mutation({
      query: (body) => ({
        url: "/templates/tenants",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Template"],
    }),
    // preonfigured templates
    getPreConfiguredTemplates: builder.query({
      query: ({ page = 1, limit = 10, name = "" }) => ({
        url: "/pre-configured-template/all",
        params: {
          page,
          limit,
          name,
        },
      }),
    }),
    getPreConfiguredOneTemplates: builder.query({
      query: (id) => ({
        url: `/pre-configured-template/one/${id}`,
      }),
      providesTags: ["Template"],
    }),
    usePreConfiguredTemplate: builder.mutation({
      query: (templateId) => ({
        url: `/pre-configured-template/use`,
        method: "POST",
        body: { templateId },
      }),
      invalidatesTags: ["Template"],
    }),
    getUsedPreConfiguredTemplates: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/pre-configured-template/user/used`,
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Template"],
    }),
    getAllTemplates: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/templates/all",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Template"],
    }),

    // approved templates
    getApprovedTemplates: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/templates/approved",
        params: {
          page,
          limit,
          // name,
        },
      }),
      providesTags: ["Template"],
    }),
    // pending templates
    getPendingTemplates: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/templates/pending",
        params: {
          page,
          limit,
          // name,
        },
      }),
      providesTags: ["Template"],
    }),
    getRejectedTemplates: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/templates/rejected",
        params: {
          page,
          limit,
          // name,
        },
      }),
      providesTags: ["Template"],
    }),
    getReviewersTemplates: builder.query({
      query: () => ({
        url: "/templates/reviewers",
      }),
    }),
    // DOCUMENTS
    getAllDocumentsTenant: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/document/all/tenant",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Document"],
    }),
    getReviewersDocuments: builder.query({
      query: () => ({
        url: "/document/reviewers",
      }),
    }),
    getPendingDocuments: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/document/pending",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Document"],
    }),
    getApprovedDocuments: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/document/approved",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Document"],
    }),
    createDocument: builder.mutation({
      query: (body) => ({
        url: `/document`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Document"],
    }),
    approveDocument: builder.mutation({
      query: (id) => ({
        url: `/document/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Document"],
    }),
    rejectDocument: builder.mutation({
      query: ({ id, body }) => ({
        url: `/document/reject/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Document"],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/document/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"],
    }),
    getDocument: builder.query({
      query: (id) => `/document/one/${id}`,
      providesTags: ["Document"],
    }),
    updateDocument: builder.mutation({
      query: ({ id, body }) => ({
        url: `/document/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Document"],
    }),
    // Token endpoints
    createToken: builder.mutation({
      query: (body) => ({
        url: "/keyword",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tokens"],
    }),

    getTokens: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/keyword/tenant?page=${page}&limit=${limit}`,
      }),
      providesTags: ["tokens"],
    }),

    updateToken: builder.mutation({
      query: ({ id, keyword }) => ({
        url: `/keyword/${id}`,
        method: "PATCH",
        body: { name: keyword },
      }),
      invalidatesTags: ["tokens"],
    }),

    deleteToken: builder.mutation<void, string>({
      query: (id) => ({
        url: `/keyword/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tokens"],
    }),

    // Sign Documents endpoints
    createSignDocument: builder.mutation({
      query: (body) => ({
        url: "/signature",
        method: "POST",
        body,
      }),
      invalidatesTags: ["signDocuments"],
    }),

    getSignDocuments: builder.query({
      query: ({ page, limit }) => ({
        url: `/signature?page=${page}&limit=${limit}`,
      }),
      providesTags: ["signDocuments"],
    }),

    updateSignDocument: builder.mutation({
      query: ({ id, name, imageUrl }) => ({
        url: `/signature/${id}`,
        method: "PATCH",
        body: { signName: name, documentSignImageUrl: imageUrl },
      }),
      invalidatesTags: ["signDocuments"],
    }),

    deleteSignDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: `/signature/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["signDocuments"],
    }),

    // S3 endpoints
    createS3: builder.mutation({
      query: (body) => ({
        url: "/s3/upload?folderName=image",
        method: "POST",
        body,
      }),
    }),
    // docuemnt validate
    createDocumentTransfer: builder.mutation({
      query: (body) => ({
        url: "/document-validate/send-otp",
        method: "POST",
        body,
      }),
    }),
    validateOtpForDocument: builder.mutation({
      query: (body) => ({
        url: "/document-validate/verify-otp",
        method: "PATCH",
        body,
      }),
    }),
    previewDocument: builder.query({
      query: ({ id, otp }) => ({
        url: `/document-validate/convert/${id}/${otp}`, // Append OTP as query param
        method: "GET",
        responseHandler: async (response) => {
          const blob = await response.blob();
          return blob;
        },
      }),
      transformResponse: (response: Blob) => response,
      merge: (currentCache, newItems) => newItems,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    documentTransfareToTenant: builder.mutation({
      query: ({ id, body }) => ({
        url: `/document/addUrl/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    getAllTransferredDocuments: builder.query({
      query: ({ page, limit }) => `/document/transferred?page=${page}&limit=${limit}`,
    }),
  }),
});

export const {
  // user
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPassordMutation,
  // users
  useCreateUserMutation,
  useGetUsersQuery,
  usePatchUserStatusMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  // roles
  useGetAllRolesQuery,
  useLazyGetAllRolesQuery,
  useAssignRolesMutation,
  useCreateRoleMutation,
  useGetRolesQuery,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useUpdateRolePermissionsMutation,
  // permissions
  useLazyGetPermissionsQuery,
  useGetAllPermissionsQuery,
  // summrization
  useSummarizeTextMutation,
  useSubmitDynamicFormMutation,
  // translation
  useTranslateMutation,
  useTranslateFileMutation,
  useTranslateWordFileMutation,
  //questions
  useCreateQuestionMutation,
  useGetQuestionsQuery,
  // jurisdictions
  useCreateJurisdictionMutation,
  useGetJurisdictionsQuery,
  useUpdateJurisdictionMutation,
  useDeleteJurisdictionMutation,
  // templates
  useGetTemplateQuery,
  useGetTemplatesQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  useAddTemplateMutation,
  useGetApprovedTemplatesQuery,
  useGetPendingTemplatesQuery,
  useGetRejectedTemplatesQuery,
  useGetAllTemplatesQuery,
  useGetReviewersTemplatesQuery,
  useApproveTemplateMutation,
  useRejectTemplateMutation,
  // preconfigured templates
  useGetPreConfiguredTemplatesQuery,
  useGetPreConfiguredOneTemplatesQuery,
  useUsePreConfiguredTemplateMutation,
  useGetUsedPreConfiguredTemplatesQuery,
  // documents
  useGetAllDocumentsTenantQuery,
  useCreateDocumentMutation,
  useGetApprovedDocumentsQuery,
  useGetPendingDocumentsQuery,
  useApproveDocumentMutation,
  useRejectDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentQuery,
  useUpdateDocumentMutation,
  useGetReviewersDocumentsQuery,
  // Token endpoints
  useCreateTokenMutation,
  useGetTokensQuery,
  useUpdateTokenMutation,
  useDeleteTokenMutation,
  // sign documents
  useCreateSignDocumentMutation,
  useGetSignDocumentsQuery,
  useUpdateSignDocumentMutation,
  useDeleteSignDocumentMutation,
  // s3
  useCreateS3Mutation,
  // document validate
  useCreateDocumentTransferMutation,
  useValidateOtpForDocumentMutation,
  usePreviewDocumentQuery,
  useDocumentTransfareToTenantMutation,
  useGetAllTransferredDocumentsQuery,
} = api;
