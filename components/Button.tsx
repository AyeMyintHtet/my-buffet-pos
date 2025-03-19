import React from "react";
import Button from "@mui/material/Button";

interface IButton {
  variant: "contained" | "outlined" | "text";
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
const ButtonCom = ({ variant, icon, text ,onClick}: IButton) => {
  return (
    <Button variant={variant} endIcon={icon} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ButtonCom;
