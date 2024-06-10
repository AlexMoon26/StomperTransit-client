import React, { useEffect, useState } from "react";
import moment from "moment";

const TimeSinceUpdate = ({ updatedAt }) => {
  const [timeSinceUpdate, setTimeSinceUpdate] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = moment();
      const updatedTime = moment(updatedAt);
      const duration = moment.duration(now.diff(updatedTime));

      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      const timeString = `${hours} часов ${minutes} минут ${seconds} секунд`;
      setTimeSinceUpdate(timeString);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [updatedAt]);

  return (
    <span className="inline-flex items-center justify-center text-md font-medium mr-2 px-2.5 py-0.5 rounded-full text-gray-400">
      {timeSinceUpdate}
    </span>
  );
};

export default TimeSinceUpdate;
