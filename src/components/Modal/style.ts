import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors } from "../../style";
import { typography } from "../../style";

interface WrapperProps {
  size?: "small" | "medium" | "large";
}

const getSizeStyles = (size?: string) => {
  switch (size) {
    case "small":
      return css`
        width: 400px;
        height: 368px;
      `;
    case "medium":
      return css`
        width: 560px;
        height: 340px;
      `;
    case "large":
    default:
      return css`
        width: 760px;
        height: 392px;
      `;
  }
};

// 커스텀 스크롤바 스타일
const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Wrapper = styled.div<WrapperProps>`
  ${(props) => getSizeStyles(props.size)}
  max-height: 90vh;
  padding: 24px;
  background-color: ${colors.surface["white-subtler"]};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${customScrollbar}
`;

export const Title = styled.h2`
  margin: 0 0 16px 0;
  ${typography.heading.medium};
  color: ${colors.text["basic"]};
`;

export const Description = styled.p`
  margin: 0;
  ${typography.body.medium};
  color: ${colors.text["basic"]};
  line-height: 1.5;
  padding-right: 8px;
`;

export const MainTextArea = styled.div`
  width: 100%;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
  ${customScrollbar}
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 24px;
  cursor: pointer;
`;

export const ButtonArea = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  width: 100%;
  height: auto;
  margin-top: 24px;
  flex-shrink: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
