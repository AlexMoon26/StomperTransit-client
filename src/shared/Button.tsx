import React from "react";
import { Button as ButtonComponent } from "primereact/button";


const Button = ({ content }) => {
  return (
    <div>
        <ButtonComponent className="flex w-full justify-center my-3 border rounded-lg bg-green-500 ">{content}</ButtonComponent>
    </div>
  );
};

export default Button;
