import React from "react";
import * as S from "./style";

export interface CheckBoxProps {
  size: "medium" | "large";
  select: "off" | "on" | "interminate";
  state: "default" | "disabled";
  onClick?: () => void;
}

const CheckBox = ({ size, select, state, onClick }: CheckBoxProps) => {
  const handleClick = () => {
    if (state !== "disabled" && onClick) {
      onClick();
    }
  };

  return (
    <S.Container
      size={size}
      select={select}
      state={state}
      onClick={handleClick}
    >
      {select === "off" && <></>}
      {select === "on" && (
        <S.CheckIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6L9 17L4 12"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </S.CheckIcon>
      )}
      {select === "interminate" && <S.DashIcon state={state} />}
    </S.Container>
  );
};

export default CheckBox;
