import React from "react";
import * as S from "./style";
import { CheckBoxProps } from "../../types/checkBox.types";

const CheckBox = ({ size, select, state, onClick }: CheckBoxProps) => {
  const handleClick = () => {
    if (state !== "disabled" && onClick) {
      onClick();
    }
  };

  return (
    <S.Wrapper size={size} select={select} state={state} onClick={handleClick}>
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
      {select === "indeterminate" && <S.DashIcon state={state} />}
    </S.Wrapper>
  );
};

export default CheckBox;
