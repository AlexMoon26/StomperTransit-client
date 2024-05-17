import React from "react";

export function ChartLoader() {
  return (
    <div
      role="status"
      className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 h-[300px] max-lg:h-[240px]"
    >
      <div className="flex items-baseline mt-12">
        <div className="w-full bg-gray-200 rounded-t-lg h-32 dark:bg-gray-700"></div>
        <div className="w-full h-20 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-20 ms-6 dark:bg-gray-700"></div>
        <div className="w-full h-20 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-36 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-20 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-10 ms-6 dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
