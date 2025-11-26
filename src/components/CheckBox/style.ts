import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "@/style/theme";

interface WrapperProps {
  size: "medium" | "large";
  select: "off" | "on" | "indeterminate";
  state: "default" | "disabled";
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ size, select, state }) => {
    const dimensions = size === "large" ? "24px" : "20px";
    const borderRadius = size === "large" ? "8px" : "6px";

    return css`
      width: ${dimensions};
      height: ${dimensions};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${borderRadius};
      cursor: ${state === "disabled" ? "not-allowed" : "pointer"};
      transition: all 0.2s ease;

      ${state === "disabled" &&
      css`
        background-color: ${colors.surface.disabled};
        border: 1px solid ${colors.border.disabled};
      `}

      ${state === "default" &&
      select === "off" &&
      css`
        background-color: ${colors.surface.white};
        border: 1px solid ${colors.border["gray-dark"]};

        &:hover {
          border-color: ${colors.border.primary};
        }
      `}
      
      ${state === "default" &&
      (select === "on" || select === "indeterminate") &&
      css`
        background-color: ${colors.element.primary};
        border: 1px solid ${colors.element.primary};

        &:hover {
          background-color: ${colors.light.primary["60"]};
          border-color: ${colors.light.primary["60"]};
        }
      `}
    `;
  }}
`;

export const CheckIcon = styled.svg`
  width: 100%;
  height: 100%;
  padding: 2px;
`;

interface DashIconProps {
  state: "default" | "disabled";
}

export const DashIcon = styled.div<DashIconProps>`
  width: 60%;
  height: 2.5px;
  background-color: ${({ state }) =>
    state === "disabled"
      ? colors.element["disabled-dark"]
      : colors.element.inverse};
  border-radius: 2px;
`;
