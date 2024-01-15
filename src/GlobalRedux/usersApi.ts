import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APP_API_URL
    }),
    endpoints: (builder) => ({
        getAllClients: builder.mutation({
            query: () => {
                return {
                    url: "/users/allClients",
                    method: "get",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            }
        }),
    })
});

export const { useGetAllClientsMutation } = usersApi;