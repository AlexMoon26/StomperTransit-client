import InputText from "@/shared/inputs/InputText";
import { boxModal } from "@/theme/classes";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const ModalEditOrder = ({
  changeStateModal,
  open,
  clientName,
  status,
  pointA,
  pointB,
  weight,
}) => {
  return (
    <Modal
      open={open}
      onClose={changeStateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxModal} className="rounded-lg box-modal">
        <Box
          id="modal-modal-title"
          className="flex justify-between items-center p-5 border-b"
        >
          <Typography fontSize={20}>Изменение заявки</Typography>
          <button
            className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={changeStateModal}
          >
            <span className="bg-transparent opacity-70 text-grey-800 text-2xl block outline-none focus:outline-none hover:text-gray-500">
              ×
            </span>
          </button>
        </Box>
        {/*body*/}
        <Box className="p-6">
          <div className="flex gap-5 mb-5">
            <Typography className="">Клиент - {clientName}</Typography>
            <div className="flex items-center">
              <span className="inline-flex items-center bg-red-100 text-red-700 text-md font-medium mr-2 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 mr-1 rounded-full bg-red-400"></span>
                {status}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <TextField label="Точка А" defaultValue={pointA} />
            <TextField label="Точка B" defaultValue={pointB} />
            <TextField label="Вес" defaultValue={weight} />
          </div>
        </Box>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <Button variant="contained">Создать</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalEditOrder;
