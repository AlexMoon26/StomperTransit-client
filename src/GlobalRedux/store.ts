"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./Features/authSlice"

import ordersReducer from "./Features/orderSlice"
import usersReducer from './Features/usersSlice'
import { ordersApi } from "./ordersApi";
import { usersApi } from "./usersApi";
import { reportsApi } from "./reportsApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
        users: usersReducer,

        [usersApi.reducerPath]: usersApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, ordersApi.middleware, usersApi.middleware, reportsApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch)