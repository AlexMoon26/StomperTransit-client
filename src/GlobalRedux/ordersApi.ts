import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APP_API_URL
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (body: { client: Object; pointA: string; pointB: string; weight: number }) => {
                return {
                    url: "/orders/createOrder",
                    method: "post",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body,
                }
            }
        }),
        getAllOrders: builder.mutation({
            query: () => {
                return {
                    url: "/orders/createOrder",
                    method: "get",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            }
        }),
    })
});

export const { useCreateOrderMutation, useGetAllOrdersMutation } = ordersApi;