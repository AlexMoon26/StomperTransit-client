"use client";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { UserFull } from "@/types";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { ModalContext } from "../modalContext";
import { DriverCard } from "./driverCard";
import { CreateDriverForm } from "./modalForms/createDriverForm";

interface Props {
  drivers: UserFull[];
}

export function DriversList({ drivers }: Props) {
  const { openModal, closeModal } = useContext(ModalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDesktop } = useScreenWidth();

  const handleNewClient = () => {
    openModal({
      component: CreateDriverForm,
      props: { closeModal },
      title: "Создание нового водителя",
    });
  };
  const searchTextLower = searchTerm.toLowerCase().split(" ");
  const filteredDrivers = drivers.filter((item) => {
    const firstNameLower = item.firstName.toLowerCase();
    const surNameLower = item.surName?.toLowerCase();

    return searchTextLower.some((word) => {
      return firstNameLower.includes(word) || surNameLower?.includes(word);
    });
  });
  return (
    <>
      <Box display="flex" flexDirection="column" className="gap-4">
        <Box className="flex mb-4 gap-5 md:justify-between">
          <TextField
            sx={isDesktop ? { width: "50%" } : {}}
            fullWidth={!isDesktop}
            label="Поиск"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <Button onClick={handleNewClient} fullWidth>
          Добавить водителя
        </Button>
      </Box>

      {filteredDrivers.length > 0 ? (
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
          {drivers
            ? filteredDrivers?.map((driver, i) => (
                <DriverCard key={i} driver={driver} />
              ))
            : "Заявок нет"}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height="85vh"
          width="100%"
        >
          <Typography fontSize={20}>Таких клиентов нет</Typography>
        </Box>
      )}
    </>
  );
}
