import styled from "@emotion/styled";
import { colors } from "@/style/theme";
import { typography } from "@/style/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 100vh;
  padding: 16px;
  background-color: ${colors.surface.white};
  gap: 16px;
`;

export const Title = styled.h3`
  padding: 4px 0;
  margin: 0;
  font-size: ${typography.heading.xxsmall.fontSize};
  font-weight: ${typography.heading.xxsmall.fontWeight};
  color: ${colors.text.bolder};
`;

interface TabItemProps {
  isSelected: boolean;
}
export const Tablist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const TabItem = styled.div<TabItemProps>`
  padding: 8px 8px;
  font-size: ${typography.body.xsmall.fontSize};
  font-weight: ${({ isSelected }) =>
    isSelected
      ? typography.body.xsmallBold.fontWeight
      : typography.body.xsmall.fontWeight};
  color: ${({ isSelected }) =>
    isSelected ? colors.text.secondary : colors.text.subtle};
  background-color: ${({ isSelected }) =>
    isSelected ? colors.action["secondary-selected"] : "transparent"};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected
        ? colors.action["secondary-selected"]
        : colors.action["secondary-hover"]};
  }

  &:active {
    background-color: ${colors.action["secondary-pressed"]};
  }
`;
