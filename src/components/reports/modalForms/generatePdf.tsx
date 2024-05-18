import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import OrdersTable from "./ordersTable";

export const generatePDF = async (orders) => {
  const doc = new jsPDF("p", "pt", "a4");

  // Create a hidden div to render the OrdersTable component
  const hiddenDiv = document.createElement("div");
  document.body.appendChild(hiddenDiv);

  // Render the OrdersTable component to the hidden div using createRoot
  const root = createRoot(hiddenDiv);
  //@ts-ignore
  root.render(<OrdersTable orders={orders} />);

  // Wait for the table to be rendered
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Convert the table to a canvas
  const canvas = await html2canvas(hiddenDiv);
  const imgData = canvas.toDataURL("image/png");

  // Remove the hidden div
  root.unmount();
  document.body.removeChild(hiddenDiv);

  // Add the image to the PDF
  doc.addImage(
    imgData,
    "PNG",
    20,
    20,
    555,
    canvas.height * (555 / canvas.width)
  );

  // Save the PDF
  doc.save("orders.pdf");
};
