import styled from "@emotion/styled";
import { colors } from "../../style/theme";
import { typography } from "../../style/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 100vh;
  padding: 16px;
  background-color: ${colors.surface.white};
  gap: 16px;
`;

export const Title = styled.span`
  padding: 4px 0;
  margin: 0;
  ${typography.heading.xxsmall}
  font-family:${typography.fontFamily.primary};
  color: ${colors.text.bolder};
`;

interface TabItemProps {
  isSelected: boolean;
  isDisabled?: boolean;
}
export const Tablist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const TabItem = styled.div<TabItemProps>`
  padding: 8px 8px;
  font-family: ${typography.fontFamily.primary};
  ${({ isSelected }) =>
    isSelected ? typography.body.xsmallBold : typography.body.xsmall}
  color: ${({ isSelected, isDisabled }) =>
    isDisabled
      ? colors.text.disabled
      : isSelected
      ? colors.text.secondary
      : colors.text.subtle};
  background-color: ${({ isSelected }) =>
    isSelected ? colors.action["secondary-selected"] : "transparent"};
  border-radius: 4px;
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};

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
