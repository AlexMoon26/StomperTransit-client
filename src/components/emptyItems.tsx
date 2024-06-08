import { Typography } from "@mui/material";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function EmptyItems({ items }: { items: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <HiOutlineExclamationCircle className="mx-auto mb-4 w-20 h-20  text-red-400" />
      <Typography className="text-grey-800">
        На данный момент нет {items}
      </Typography>
    </div>
  );
}

export default EmptyItems;
