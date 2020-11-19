import React from "react";
import { InputStyled } from "./general.styles";

interface IntputProps {
  type?: string;
  placeholder: string;
  name?: string;
  regex?: string;
  required?: boolean;
  reference: React.MutableRefObject<any>;
}

export const Input: React.FC<IntputProps> = ({
  type,
  placeholder,
  name,
  regex,
  required,
  reference,
}) => {
  return (
    <InputStyled
      type={type ? type : "text"}
      pattern={regex ? regex : undefined}
      placeholder={placeholder}
      name={name ? name : undefined}
      required={required}
      ref={reference}
    />
  );
};
