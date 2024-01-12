import { Box, Button, Typography } from "@mui/material";

import NextLink from "next/link";

import React from "react";

export const ErrorForbidden = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      height="100vh"
      width="100vw"
    >
      <Box sx={{ flexDirection: "column", display: "flex" }} gap={2}>
        <Box>
          <Typography textAlign="center" fontSize={30}>
            Ошибка 403
          </Typography>
          <Typography textAlign="center">Доступ запрещен!</Typography>
        </Box>
        <Button variant="contained" component={NextLink} href="/">
          Вернуться на главную
        </Button>
      </Box>
    </Box>
  );
};
