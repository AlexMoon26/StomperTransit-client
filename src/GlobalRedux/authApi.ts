import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APP_API_URL
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: "/auth/login",
                    method: "post",
                    body,
                }
            }
        }),
        getMe: builder.mutation({
            query: () => {
                return {
                    url: "/auth/me",
                    method: "get",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            }
        }),
        registerUser: builder.mutation({
            query: (body: { firstName: string; surName: string; phone: string; email: string; password: string; }) => {
                return {
                    url: "/auth/register",
                    method: "post",
                    body
                }
            }
        })
    })
});

export const { useLoginUserMutation, useGetMeMutation, useRegisterUserMutation } = authApi;