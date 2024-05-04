"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"With Love ♥  "}
      <Link color="inherit" href="https://stomper.ru">
        Stomper
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
