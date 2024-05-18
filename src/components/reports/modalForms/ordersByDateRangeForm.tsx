/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "sonner";

import moment from "moment";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { LoadingButton } from "@mui/lab";
import { ordersByDateRange } from "@/api/reports";
import { generatePDF } from "./generatePdf";

interface Props {
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required("Начальная дата обязательна"),
  endDate: Yup.date().required("Конечная дата обязательна"),
});

export function OrdersByDateRangeForm({ closeModal }: Props) {
  const formik = useFormik<{
    startDate: string;
    endDate: string;
  }>({
    initialValues: {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      try {
        if (moment(values.startDate).isAfter(moment(values.endDate))) {
          throw new Error("Начальная дата не должна быть больше конечной!");
        }
        const response = await ordersByDateRange(
          values.startDate,
          values.endDate
        );
        if (!response) throw new Error(response);

        await generatePDF(response);
        toast.success(`Отчет успешно создан`);
      } catch (err) {
        console.log(err);

        toast.error("Заявка не была создана!");
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="p-6">
        <div className="flex justify-center gap-5">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="w-full"
                label="Начальная дата"
                name="startDate"
                value={moment(formik.values.startDate)}
                onChange={(value) =>
                  formik.setFieldValue(
                    "startDate",
                    moment(value).format("YYYY-MM-DD")
                  )
                }
                slotProps={{
                  textField: {
                    helperText: formik.errors.startDate,
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="w-full"
                label="Конечная дата"
                name="endDate"
                value={moment(formik.values.endDate)}
                onChange={(value) =>
                  formik.setFieldValue(
                    "endDate",
                    moment(value).format("YYYY-MM-DD")
                  )
                }
                slotProps={{
                  textField: {
                    helperText: formik.errors.endDate,
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </Box>

      <div className="flex items-end justify-end p-6 border-t border-solid border-blueGray-200 rounded-b mt-20">
        <LoadingButton
          fullWidth
          type="submit"
          loading={formik.isSubmitting}
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Создать
        </LoadingButton>
      </div>
    </form>
  );
}
