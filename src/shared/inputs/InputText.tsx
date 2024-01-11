import { InputProps } from "@/types/types";
import React from "react";

const InputText = ({ data, placeholder, content }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={"id_" + data}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {data}
      </label>
      <input
        id={"id_" + data}
        className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-none focus:border-gray-400"
        required
        placeholder={placeholder}
        value={content}
      />
    </div>
  );
};

export default InputText;
