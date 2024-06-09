import { Typography } from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

function EmptyItems({ items }: { items: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <ErrorIcon
        className="mx-auto mb-4 text-red-400"
        style={{ fontSize: 80 }}
      />
      <Typography className="text-grey-800">
        На данный момент нет {items}
      </Typography>
    </div>
  );
}

export default EmptyItems;
