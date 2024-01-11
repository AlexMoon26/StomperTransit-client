// @ts-nocheck
"use client";
import React, { ForwardedRef, forwardRef, useState } from "react";
import { IMaskInput, IMaskInputProps } from "react-imask";
import { TextField } from "@mui/material";

interface IProps {
  fullWidth?: boolean;
  margin?;
  id?;
  label?;
  name?;
  value?;
  onChange?;
  onBlur?;
  error?;
  helperText?;
}

const TextMaskCustom = forwardRef(
  (
    props: IMaskInputProps & { inputRef: ForwardedRef<HTMLInputElement> },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <IMaskInput
        {...props}
        inputRef={ref as React.RefObject<HTMLInputElement>}
        mask="+7 (000) 000-00-00"
        definitions={{
          "#": /[1-9]/,
        }}
        overwrite
      />
    );
  }
);

const InputMaskPhone = ({
  fullWidth,
  margin,
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: IProps) => {
  return (
    <TextField
      margin={margin}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth={fullWidth ? true : false}
      label={label}
      error={error}
      helperText={helperText}
      InputProps={{
        inputComponent: TextMaskCustom,
      }}
    />
  );
};

export default InputMaskPhone;
