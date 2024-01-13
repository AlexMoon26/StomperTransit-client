import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface OrdersState {
    orders: Array<object> | null;
    isLoading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    isLoading: true,
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setAllOrders: (state, action: PayloadAction<{ orders: Array<object> }>) => {
            state.orders = { ...action.payload.orders };
            state.isLoading = false;
        },
        removeLoading: (state) => {
            state.isLoading = false
        }
    },
});

export const selectOrders = (state: RootState) => state.orders;

export const { setAllOrders, removeLoading } = ordersSlice.actions;

export default ordersSlice.reducer;