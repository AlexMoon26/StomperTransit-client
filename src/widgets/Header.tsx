"use client";
import { links } from "@/data/data";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { theme } from "@/theme/theme";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TelegramIcon from "@mui/icons-material/Telegram";
import React, { useEffect, useState } from "react";

export const Header = () => {
  const { isDesktop } = useScreenWidth();
  const pathname = usePathname();

  const isCurrentPage = (page) => {
    return pathname!.endsWith(page);
  };

  return (
    <Box
      height={800}
      sx={{
        position: "relative",
        overflowX: "hidden",
      }}
      className="w-screen sticky"
    >
      <Image
        src="/images/header-back.webp"
        alt="Header Background"
        layout="fill"
        objectFit="cover"
      />

      <div className="absolute inset-0 bg-grey-800 opacity-90">
        <div className="absolute flex p-[40px] justify-between w-full">
          <Box className="flex gap-4 justify-center items-center">
            <Image width={70} height={31} src="/images/logo.svg" alt="logo" />
            <Box className="flex flex-col">
              <Typography color="white" fontWeight="bold" fontSize={17}>
                {"Stomper".toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  letterSpacing: "7.4px",
                  color: theme.palette.primary.dark,
                  display: "flex",
                }}
              >
                transit
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box className="flex text-white">
              {links.map((link, i) => (
                <MenuItem key={i}>
                  <Box
                    className={`${
                      isCurrentPage(link.path) && "border-b-2 border-green-500"
                    }`}
                  >
                    {link.name}
                  </Box>
                </MenuItem>
              ))}
            </Box>
          </Box>
          <Box className="bg-[#c4c4c4] opacity-50 rounded-full flex justify-center items-center">
            <IconButton>
              <TelegramIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton>
              <TelegramIcon />
            </IconButton>
            <IconButton>
              <TelegramIcon />
            </IconButton>
          </Box>
        </div>
      </div>
    </Box>
  );
};
