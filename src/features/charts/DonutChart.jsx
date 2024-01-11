"use client";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(ArcElement, Tooltip, Legend);

const MyDoughnutChart = (props) => {
  const data = {
    datasets: [
      {
        data: [props.allData - props.filled, props.filled], // Распределение между фоном и активной частью
        backgroundColor: ["#D9D9D9", `${props.backgroundColor}`],
        cutout: "80%", // Процент вырезки для внутренней части
        borderWidth: 0, // Убираем границу
        borderCapStyle: "round",
      },
    ],
  };

  const options = {
    borderCapStyle: "round",
  };

  return (
    <div
      className="max-sm:w-32 max-sm:h-32 max-md:w-40 max-md:h-40 max-lg:w-60 max-lg:h-60"
      style={{ position: "relative" }}
    >
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h3 className="text-3xl" style={{ color: props.backgroundColor }}>
          {props.filled}
        </h3>
        <h3 className="max-md:text-sm" style={{ color: props.backgroundColor }}>
          {props.name}
        </h3>
      </div>
    </div>
  );
};

export default MyDoughnutChart;
