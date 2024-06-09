import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { DeliveryStatus, OrderFull, OrderStatus, UserFull } from "@/types";
import moment from "moment";
import { profile } from "@/api/auth";

async function fetchFont() {
  const url = "/fonts/Roboto-Regular.ttf";
  const response = await fetch(url);
  const font = await response.arrayBuffer();
  return font;
}

const GenerateInvoiceButton = ({ order }: { order: OrderFull }) => {
  const [admin, setAdmin] = useState<UserFull | null>(null);

  useEffect(() => {
    (async function getAdmin() {
      const response = await profile();
      setAdmin(response);
    })();
  }, []);

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = await fetchFont();
    const customFont = await pdfDoc.embedFont(fontBytes);
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const fontSize = 12;

    let prepayment = 0;
    if (order.typeOfCar === "express") {
      prepayment = 300;
    } else if (order.typeOfCar === "cargo") {
      prepayment = 500;
    }

    const drawHorizontalLine = (x1, y, x2) => {
      page.drawLine({
        start: { x: x1, y },
        end: { x: x2, y },
        thickness: 1, // Толщина линии
        color: rgb(0.8, 0.8, 0.8), // Светло-серый цвет
      });
    };

    const drawTextWithAlignment = (
      text,
      y,
      alignment = "center",
      margin = 0,
      width = 200,
      fontWeight = "normal"
    ) => {
      let x;
      const { width: pageWidth } = page.getSize(); // Получаем ширину страницы
      if (alignment === "left") {
        x = margin;
      } else if (alignment === "right") {
        const textWidth = customFont.widthOfTextAtSize(text, fontSize);
        x = pageWidth - margin - textWidth;
      } else {
        // Default to center
        const textWidth = customFont.widthOfTextAtSize(text, fontSize);
        x = (pageWidth - textWidth) / 2;
      }
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font: customFont,
        maxWidth: width,
      });
    };

    drawTextWithAlignment("Stomper Transit", height - 50);
    drawTextWithAlignment("ИНН **********", height - 70);
    drawTextWithAlignment(
      "Место расчётов: https://stompertransit.vercel.app",
      height - 90,
      "center",
      0,
      500
    );
    drawTextWithAlignment("КАССОВЫЙ ЧЕК", height - 110);
    drawTextWithAlignment("Приход", height - 140, "left", 80);
    drawTextWithAlignment(
      `${moment().format("DD.MM.YY HH:mm")}`,
      height - 140,
      "right",
      80
    );
    drawTextWithAlignment("Смена", height - 170, "left", 80);
    drawTextWithAlignment("1", height - 170, "right", 80);
    drawTextWithAlignment("Кассир", height - 200, "left", 80);
    drawTextWithAlignment(
      `${admin?.firstName} ${admin?.surName}`,
      height - 200,
      "right",
      80
    );
    drawTextWithAlignment(
      "Применяемая система налогообложения",
      height - 230,
      "left",
      80,
      400
    );
    drawTextWithAlignment("УСН доход", height - 230, "right", 80);

    drawHorizontalLine(80, height - 260, width - 80);

    drawTextWithAlignment(
      `Предоставление услуг по грузоперевозкам на дату ${moment(
        order.approximateTime
      ).format("DD.MM.YY")}, ${DeliveryStatus[order.typeOfCar]}${
        order?.bodySize ? ` ${order.bodySize}` : ""
      }, грузчиков: ${order.movers || 0}`,
      height - 290,
      "left",
      80,
      200
    );

    drawTextWithAlignment(`1 x ${prepayment}.00`, height - 320, "right", 80);

    drawTextWithAlignment(
      `Общая стоимость позиции с учетом скидок и наценок`,
      height - 380,
      "left",
      80,
      200
    );

    drawTextWithAlignment(`${prepayment}`, height - 395, "right", 80);

    drawTextWithAlignment(`Без НДС`, height - 440, "left", 80);
    drawTextWithAlignment(`0`, height - 440, "right", 80);

    drawTextWithAlignment(`Предмет расчета`, height - 470, "left", 80);
    drawTextWithAlignment(`ПЛАТЕЖ`, height - 470, "right", 80);

    drawTextWithAlignment(`Способ расчета`, height - 500, "left", 80);
    drawTextWithAlignment(`ЧАСТИЧНАЯ ПРЕДОПЛАТА`, height - 500, "right", 80);

    drawHorizontalLine(80, height - 530, width - 80);

    drawTextWithAlignment(`ИТОГ`, height - 570, "left", 80);
    drawTextWithAlignment(`= ${prepayment}.00`, height - 570, "right", 80);

    drawTextWithAlignment(`БЕЗНАЛИЧНЫМИ`, height - 600, "left", 80);
    drawTextWithAlignment(`${prepayment}.00`, height - 600, "right", 80);

    drawTextWithAlignment(`БЕЗ НДС`, height - 630, "left", 80);
    drawTextWithAlignment(`0.00`, height - 630, "right", 80);

    drawHorizontalLine(80, height - 660, width - 80);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Чек_на_предоплату_${moment().format("DD.MM.YY-HH.mm")}_${
      order.client?.firstName
    }_${order.client?.surName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Tooltip title="Сформировать чек на предоплату" arrow>
      <IconButton onClick={generatePDF}>
        <InsertDriveFileIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default GenerateInvoiceButton;
