"use client"
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    color: '#ffffff',
                },
            },
            defaultProps: {
                variant: "contained",
            },

        },
    },
    palette: {
        primary: {
            main: "#86C232",
        }
    },
});