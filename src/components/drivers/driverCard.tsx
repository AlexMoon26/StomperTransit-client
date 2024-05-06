import { UserFull } from "@/types";
import { Box, IconButton, Tooltip } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from "react";
import { ModalContext } from "../modalContext";
import { ProfileForm } from "./modalForms/profileForm";

interface Props {
  driver: UserFull;
}

export function DriverCard({ driver }: Props) {
  const { openModal, closeModal } = useContext(ModalContext);

  const handleOpenClientModal = () => {
    openModal({
      component: ProfileForm,
      props: { driver, closeModal },
      title: `Профиль - ${driver.surName} ${driver.firstName} `,
    });
  };
  return (
    <button
      className={`flex w-full text-xs md:text-sm xxl:text-lg p-5 rounded-lg shadow bg-white hover:bg-gray-100`}
      onClick={handleOpenClientModal}
    >
      <Box className="w-full flex flex-col gap-3 justify-center">
        <Box className="flex items-center justify-between">
          <Box className="flex gap-2 items-center">
            <LaunchIcon className="text-gray-400" />
            <Tooltip
              arrow
              title={`Позвонить ${driver.firstName}`}
              aria-label={`Позвонить ${driver.firstName}`}
            >
              <IconButton
                onClick={(e) => e.stopPropagation()}
                href={`tel:${driver.phone}`}
              >
                <CallIcon className="text-green-500" />
              </IconButton>
            </Tooltip>
            <Tooltip
              arrow
              title={`Написать ${driver.firstName} на почту`}
              aria-label={`Написать ${driver.firstName} на почту`}
            >
              <IconButton
                onClick={(e) => e.stopPropagation()}
                href={`mailto:${driver.email}`}
              >
                <MailIcon className="text-blue-500" />
              </IconButton>
            </Tooltip>
          </Box>

          <h5 className="text-gray-400">
            {driver.surName} {driver.firstName}
          </h5>
        </Box>
      </Box>
    </button>
  );
}
