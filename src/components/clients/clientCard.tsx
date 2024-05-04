import { User } from "@/types";
import { Box } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useContext } from "react";
import { ModalContext } from "../modalContext";
import { ProfileForm } from "./modalForms/profileForm";

interface Props {
  client: User;
}

export function ClientCard({ client }: Props) {
  const { openModal, closeModal } = useContext(ModalContext);

  const handleOpenClientModal = () => {
    openModal({
      component: ProfileForm,
      props: { client, closeModal },
      title: `Профиль - ${client.surName} ${client.firstName} `,
    });
  };
  return (
    <button
      className={`flex w-full text-xs md:text-sm xxl:text-lg p-5 rounded-lg shadow bg-white hover:bg-gray-100`}
      onClick={handleOpenClientModal}
    >
      <Box className="w-full flex flex-col gap-3 justify-center">
        <Box className="flex items-center justify-between">
          <LaunchIcon className="text-gray-400" />
          <h5 className="text-gray-400">
            {client.surName} {client.firstName}
          </h5>
        </Box>
      </Box>
    </button>
  );
}
