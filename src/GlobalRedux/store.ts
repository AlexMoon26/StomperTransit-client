"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./Features/authSlice"

import ordersReducer from "./Features/orderSlice"
import { ordersApi } from "./ordersApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
        [authApi.reducerPath]: authApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, ordersApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch)