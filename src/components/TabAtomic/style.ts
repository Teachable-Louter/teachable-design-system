import styled from '@emotion/styled';
import { colors } from '../../style';
import { typography } from '../../style';

export interface StyledTabProps {
	isSelected?: boolean;
}

export const StyledTabContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0;
`;

export const StyledTab = styled.button<StyledTabProps>`
	font-family: ${typography.fontFamily.primary};
	font-size: ${typography.body.medium.fontSize};
	line-height: ${typography.body.medium.lineHeight};
	font-weight: ${typography.body.smallBold.fontWeight};
	
	color: ${({ isSelected }) => 
		isSelected ? colors.border.secondary : colors.text.subtle};
	
	background: transparent;
	border: none;
	border-bottom: ${({ isSelected }) => 
		isSelected ? `3px solid ${colors.border.secondary}` : '3px solid transparent'};
	
	padding: 8px 16px;
	cursor: pointer;
	
	transition: all 0.2s ease-in-out;
	
	&:hover {
		color: ${colors.text.primary};
	}
	
	&:active {
		color: ${colors.text.secondary};
		opacity: 0.8;
	}
`;

