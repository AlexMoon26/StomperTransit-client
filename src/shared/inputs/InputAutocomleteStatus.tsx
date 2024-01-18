import { OrderStatus } from "@/types/types";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const statusOptions = Object.values(OrderStatus);

export const InputAutocompleteStatus = ({
  onBlur,
  value,
  error,
  helperText,
  onChange,
  name,
}) => {
  return (
    <Autocomplete
      disablePortal
      onBlur={onBlur}
      fullWidth
      value={value}
      options={statusOptions}
      getOptionLabel={(option) => option}
      onChange={(event, newValue) => {
        onChange(event, newValue as string);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          value={value}
          helperText={helperText}
          onChange={onChange}
          name={name}
          label="Статус"
          id="status"
        />
      )}
    />
  );
};
