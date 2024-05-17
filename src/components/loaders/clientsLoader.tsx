import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function ClientsLoader() {
  return (
    <>
      <Box display="flex" flexDirection="column" className="gap-4">
        <Box className="flex mb-4 gap-5 md:justify-between">
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
      <Box className="mb-4">
        <Button disabled fullWidth>
          Добавить клиента
        </Button>
      </Box>
      <Box className="flex flex-col gap-5">
        {Array.from(new Array(10)).map((_, i) => (
          <Skeleton key={i} variant="rounded" className="w-full" height={64} />
        ))}
      </Box>
    </>
  );
}
