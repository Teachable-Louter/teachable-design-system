import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "../../style/theme/colors";
import { typography } from "../../style/theme/typography";

interface InputWrapperProps {
  width?: string;
  inputSize?: string;
}

interface StyledInputProps {
  width?: string;
  height?: string;
  inputSize?: string;
  disabled?: boolean;
  isPassword?: boolean;
}

interface IconButtonProps {
  disabled?: boolean;
}

const getInputSizeStyle = (size?: string) => {
  switch (size) {
    case "small":
      return css`
        height: 40px;
        font-size: ${typography.label.small.fontSize};
        line-height: ${typography.label.small.lineHeight};
        font-weight: ${typography.label.small.fontWeight};
      `;
    case "medium":
      return css`
        height: 48px;
        font-size: ${typography.label.medium.fontSize};
        line-height: ${typography.label.medium.lineHeight};
        font-weight: ${typography.label.medium.fontWeight};
      `;
    case "large":
      return css`
        height: 56px;
        font-size: ${typography.label.large.fontSize};
        line-height: ${typography.label.large.lineHeight};
        font-weight: ${typography.label.large.fontWeight};
      `;
    default:
      return css`
        height: 48px;
        font-size: ${typography.label.medium.fontSize};
        line-height: ${typography.label.medium.lineHeight};
        font-weight: ${typography.label.medium.fontWeight};
      `;
  }
};

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${(props) => props.width || "306px"};
`;

export const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  font-size: ${typography.label.small.fontSize};
  line-height: ${typography.label.small.lineHeight};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.fontFamily.primary};
  color: ${colors.text.subtle};
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledInput = styled.input<StyledInputProps>`
  width: ${(props) => props.width || "306px"};
  padding: ${(props) => (props.isPassword ? "0px 48px 0px 16px" : "0px 16px")};
  font-family: ${typography.fontFamily.primary};
  border: 1px solid ${colors.input.border};
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.disabled ? colors.input["surface-disabled"] : colors.input.surface};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
  color: ${colors.text.basic};
  box-sizing: border-box;

  ${(props) => getInputSizeStyle(props.inputSize)}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}

  &:focus {
    border: 1px solid ${colors.input["border-active"]};
    box-shadow: 0 0 0 3px ${colors.light.primary["5"]};
  }

  &:disabled {
    border: 1px solid ${colors.input["border-disabled"]};
    color: ${colors.text.disabled};
  }

  &::placeholder {
    color: ${colors.text.disabled};
  }
`;

export const IconButton = styled.button<IconButtonProps>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: opacity 0.2s ease;

  svg {
    color: ${(props) =>
      props.disabled ? colors.icon.disabled : colors.icon.gray};
  }
`;
