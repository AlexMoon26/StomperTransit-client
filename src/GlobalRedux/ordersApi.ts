import { OrderStatus } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APP_API_URL
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (body: { phone: string; pointA: string; pointB: string; weight: number }) => {
                return {
                    url: "/orders/order/create",
                    method: "post",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body,
                }
            }
        }),
        getAllOrders: builder.query({
            query: (params) => {
                return {
                    url: "/orders/allOrders",
                    method: "get",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    params,
                }
            }
        }),
        deleteOrder: builder.mutation({
            query: (body: { id: string }) => {
                return {
                    url: `/orders/order/${body.id}`,
                    method: "delete",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body
                }
            }
        }),
        updateOrder: builder.mutation({
            query: (body: { updatedFields: { id?: string, status?: OrderStatus, pointA?: string, pointB?: string, weight?: number } }) => {
                return {
                    url: `/orders/order/${body.updatedFields.id}`,
                    method: "put",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body
                }
            }
        }),
    })
});

export const { useCreateOrderMutation, useGetAllOrdersQuery, useDeleteOrderMutation, useUpdateOrderMutation } = ordersApi;