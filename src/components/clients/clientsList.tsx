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
import { ClientCard } from "./clientCard";
import { ModalContext } from "../modalContext";
import { CreateClientForm } from "./modalForms/createClientForm";

interface Props {
  clients: UserFull[];
}

export default function ClientsList({ clients }: Props) {
  const { openModal, closeModal } = useContext(ModalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDesktop } = useScreenWidth();

  const handleNewClient = () => {
    openModal({
      component: CreateClientForm,
      props: { closeModal },
      title: "Создание нового клиента",
    });
  };
  const searchTextLower = searchTerm.toLowerCase().split(" ");
  const filteredClients = clients.filter((item) => {
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
          Добавить клиента
        </Button>
      </Box>

      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
          {clients
            ? filteredClients?.map((client, i) => (
                <ClientCard key={i} client={client} />
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
