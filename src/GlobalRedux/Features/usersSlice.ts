import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUsers {
    _id: string;
    firstName: string;
    surName: string;
    email: string;
    phone: string;
    updatedAt: string;
    role: string;
}


export interface IUsersState {
    users: Array<IUsers>;
    isLoading: boolean;
}

const initialState: IUsersState = {
    users: [],
    isLoading: true,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Array<IUsers>>) => {
            state.users = action.payload;
            state.isLoading = false;
        },
        removeLoading: (state) => {
            state.isLoading = false
        }
    },
});

export const selectUsers = (state: RootState) => state.users;

export const { setUsers, removeLoading } = usersSlice.actions;

export default usersSlice.reducer;
