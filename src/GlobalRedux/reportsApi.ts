import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportsApi = createApi({
    reducerPath: "reportsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APP_API_URL
    }),
    endpoints: (builder) => ({
        createReportCurrentDate: builder.mutation({
            query: (params) => {
                return {
                    url: "/reports/currentdate",
                    method: "get",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    params,
                }
            }
        }),
    })
});

export const { useCreateReportCurrentDateMutation } = reportsApi;