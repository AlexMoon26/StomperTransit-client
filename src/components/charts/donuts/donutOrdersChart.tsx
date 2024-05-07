"use client";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const DonutOrdersChart = (props) => {
  const data = {
    labels: ["В ожидании", "Выполняется", "Выполнены"],
    datasets: [
      {
        data: [props.pending, props.inProgress, props.completed],
        backgroundColor: [
          "rgba(192, 132, 252)",
          "rgba(249, 115, 22)",
          "rgba(74, 222, 128)",
        ],

        borderWidth: 1,
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
      {/*@ts-ignore*/}
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
        <h3 className="max-md:text-sm" style={{ color: props.backgroundColor }}>
          {props.name}
        </h3>
      </div>
    </div>
  );
};

export default DonutOrdersChart;
