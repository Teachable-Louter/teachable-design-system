import styled from "@emotion/styled";
import { colors } from "../../style/theme/colors";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 16px;
  background-color: ${colors.surface.white};
  border: 1px solid ${colors.border["gray-light"]};
  border-radius: 12px;
  gap: 4px;
`;

interface TabItemProps {
  isSelected: boolean;
}

export const TabItem = styled.div<TabItemProps>`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ isSelected }) =>
    isSelected ? colors.text.basic : colors.text.subtle};
  background-color: ${({ isSelected }) =>
    isSelected ? colors.action["primary-selected"] : "transparent"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected
        ? colors.action["primary-selected"]
        : colors.action["primary-hover"]};
  }

  &:active {
    background-color: ${colors.action["primary-pressed"]};
  }
`;
