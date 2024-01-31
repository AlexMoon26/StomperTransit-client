import { useScreenWidth } from "@/hooks/useScreenWidth";
import { theme } from "@/theme/theme";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const Header = () => {
  const { isDesktop } = useScreenWidth();
  return (
    <Box
      height={800}
      sx={{
        position: "relative",
        overflowX: "hidden",
      }}
      className="w-screen"
    >
      <Image
        src="/images/header-back.webp"
        alt="Header Background"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-grey-800 opacity-90"></div>

      <div className="absolute flex p-[40px]">
        <Box className="flex gap-4 justify-center items-center">
          <Image width={70} height={31} src="/images/logo.svg" alt="logo" />
          <Box className="flex flex-col">
            <Typography color="white" fontWeight="bold" fontSize={17}>
              Stomper
            </Typography>
            <Typography
              sx={{
                letterSpacing: "5.4px",
                color: theme.palette.primary.main,
                display: "flex",
              }}
            >
              transit
            </Typography>
          </Box>
        </Box>
      </div>
    </Box>
  );
};
