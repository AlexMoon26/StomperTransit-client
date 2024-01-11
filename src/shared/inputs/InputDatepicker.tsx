import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useMediaQuery } from "@mui/material";
import {
  DesktopDatePicker,
  MobileDatePicker,
  PickersLocaleText,
} from "@mui/x-date-pickers";

import "dayjs/locale/ru";

const InputDatepicker = ({ day }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const localeText: Partial<PickersLocaleText<Dayjs>> = {
    datePickerToolbarTitle: "Выберите день",
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          {isMobile ? (
            <MobileDatePicker
              defaultValue={dayjs(day)}
              localeText={localeText}
            />
          ) : (
            <DesktopDatePicker defaultValue={dayjs(day)} />
          )}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default InputDatepicker;
