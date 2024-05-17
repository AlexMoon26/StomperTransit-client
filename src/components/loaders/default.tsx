import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export default function Loader({ description }: { description?: string }) {
  return (
    <Box className="flex flex-col justify-center items-center h-[100vh] w-full gap-5">
      <CircularProgress />
      <Typography color="GrayText">{description}</Typography>
    </Box>
  );
}
