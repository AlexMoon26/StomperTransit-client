import InputDatepicker from "@/shared/inputs/InputDatepicker";
import { boxModal } from "@/theme/classes";
import { Box, Button, Modal, Typography } from "@mui/material";

interface IProps {
  changeStateModal: () => void;
  clientName: string;
  openTransit;
  status: string;
  date: string;
}

const ModalTransitOrder = ({
  changeStateModal,
  clientName,
  status,
  date,
  openTransit,
}: IProps) => {
  return (
    <>
      <Modal open={openTransit} onClose={changeStateModal}>
        <Box sx={boxModal} className="rounded-lg">
          <Box
            id="modal-modal-title"
            className="flex justify-between items-center p-5 border-b"
          >
            <Typography fontSize={20}>Создание заявки</Typography>
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
          <div className="relative p-6 flex-auto">
            <div className="flex gap-5">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Клиент - {clientName}
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center bg-green-100 text-green-700 text-md font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 mr-1 rounded-full bg-green-400"></span>
                  {status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <InputDatepicker day={date} />
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <Button variant="contained">Создать</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalTransitOrder;
