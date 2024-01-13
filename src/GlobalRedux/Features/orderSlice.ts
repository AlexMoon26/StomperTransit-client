import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUserProps {
    _id: string;
    firstName: string;
    surName: string;
    email: string;
    phone: string;
    updatedAt: string;
    role: string;

}

interface IOrder {
    client: IUserProps;
    pointA: string;
    pointB: string;
    weight: number | null;
    status: string;
    createdAt: string;
    driverStatus: string;
    driver?: IUserProps

}

export interface OrdersState {
    orders: Array<IOrder>;
    isLoading: boolean;
}

const initialState: OrdersState = {
    orders: [{
        client: {
            _id: "",
            firstName: "",
            surName: "",
            email: "",
            phone: "",
            updatedAt: "",
            role: "",
        },
        pointA: "",
        pointB: "",
        weight: null,
        status: "",
        createdAt: "",
        driverStatus: ""

    }],
    isLoading: true,
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setAllOrders: (state, action: PayloadAction<Array<IOrder>>) => {
            state.orders = action.payload;
            state.isLoading = false;
        },
        removeLoading: (state) => {
            state.isLoading = false;
        }
    },
});

export const selectOrders = (state: RootState) => state.orders;

export const { setAllOrders, removeLoading } = ordersSlice.actions;

export default ordersSlice.reducer;