import styled from "@emotion/styled";
import { colors } from "../../style/theme/colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 100vh;
  padding: 18px;
  background-color: ${colors.surface.white};
  border: 1px solid ${colors.border["gray-light"]};
  gap: 4px;
`;

export const Title = styled.h3`
  margin: 0 0 16px 0;
  padding: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.text.basic};
`;

interface TabItemProps {
  isSelected: boolean;
}

export const TabItem = styled.div<TabItemProps>`
  padding: 10px 12px;
  font-size: 16px;
  font-weight: ${({ isSelected }) =>
    isSelected ? 700 : 400};
  color: ${({ isSelected }) =>
    isSelected ? colors.text.secondary : colors.text.subtle};
  background-color: ${({ isSelected }) =>
    isSelected ? colors.action["secondary-selected"] : "transparent"};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? colors.action["secondary-selected"] : colors.action["secondary-hover"]};
  }

  &:active {
    background-color: ${colors.action["secondary-pressed"]};
  }
`;
