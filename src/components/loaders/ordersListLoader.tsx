import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const filterOptions = [{ value: "all", label: "Все" }];

export default function OrdersListLoader() {
  return (
    <>
      <Box display="flex" flexDirection="column" className="gap-4">
        <Box className="flex mb-4 gap-5 md:justify-between">
          <Select value="all" disabled label="Сортировать по">
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            disabled
            className="lg:w-1/2 w-full"
            label="Поиск"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
        {Array.from(new Array(3)).map((_, i) => (
          <Skeleton key={i} variant="rounded" className="w-full" height={360} />
        ))}
      </Box>
    </>
  );
}
