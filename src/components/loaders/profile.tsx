import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function ProfileLoader() {
  return (
    <Box className="flex flex-col gap-5 justify-center items-center w-full">
      <Skeleton variant="circular" width={100} height={100} />
      <Box className="flex justify-between w-full gap-5">
        <Skeleton variant="text" height={56} className="w-full" />
        <Skeleton variant="text" height={56} className="w-full" />
      </Box>
      <Skeleton variant="text" height={56} className="w-full" />
      <Skeleton variant="text" height={56} className="w-full" />
      <Skeleton variant="text" height={36.5} className="w-full" />
    </Box>
  );
}
