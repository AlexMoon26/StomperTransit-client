import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
    user: UserState | null;
    token: string | null;
    isLoading: boolean;
}

export interface UserState {
    _id: string;
    firstName: string;
    surName: string;
    phone: string;
    picturePath: string;
    role: string;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: UserState; token: string }>) => {
            localStorage.setItem("token", action.payload.token);
            state.user = { ...action.payload.user };
            state.token = action.payload.token;
            state.isLoading = false;
        },
        logOut: (state) => {
            localStorage.removeItem("token");
            state.user = initialState.user;
            state.token = initialState.token;
            state.isLoading = false;
        },
        removeLoading: (state) => {
            state.isLoading = false
        }
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logOut, removeLoading } = authSlice.actions;

export default authSlice.reducer;
