import { selectUsers } from "@/GlobalRedux/Features/usersSlice";
import { useAppSelector } from "@/GlobalRedux/hooks";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface User {
  firstName: string;
  surName: string;
  phone: string;
}

export const InputAutocompleteUsers = ({
  users,
  onBlur,
  error,
  helperText,
  onChange,
  name,
}) => {
  const [options, setOptions] = useState<readonly User[]>([]);

  useEffect(() => {
    setOptions(users);
  }, [users]);
  return (
    <Autocomplete
      disablePortal
      onBlur={onBlur}
      fullWidth
      isOptionEqualToValue={(option, value) => option.phone === value.phone}
      getOptionLabel={(option) => `${option.firstName} ${option.surName}`}
      options={options || []}
      onChange={(event, newValue) => {
        // Вытащить нужные данные из newValue, например, newValue.phone
        const selectedPhone = newValue ? newValue.phone : "";
        // Передать данные обратно
        onChange(event, selectedPhone);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          onChange={onChange}
          name={name}
          label="Клиент"
          id="phone"
          InputProps={{
            ...params.InputProps,
            endAdornment: params.InputProps.endAdornment,
          }}
        />
      )}
    />
  );
};
