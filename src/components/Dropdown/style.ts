import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../style/theme/colors';
import { typography } from '../../style/theme/typography';

export interface StyledDropdownProps {
	size?: 'small' | 'medium' | 'large';
	onSelect?: (option: string) => void;
}

const getButtonSize = (size?: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			return css`
			height: 40px;
			`
		case 'medium':
			return css`
			height: 48px;
			`
		case 'large':
			return css`
			height: 56px;
			`
		default:
			return css`
			height: 48px;
			`
	}
}

const getFontSize = (size?: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			return css`
			font-size: ${typography.label.small.fontSize};
			`
		case 'medium':
			return css`
			font-size: ${typography.label.medium.fontSize};
			`
		case 'large':
			return css`
			font-size: ${typography.label.large.fontSize};
			`
		default:
			return css`
			font-size: ${typography.label.medium.fontSize};
			`
	}
}

export const StyledDropDown = styled.button<StyledDropdownProps>`
	background: ${colors.input.surface};
	border:1px solid ${colors.input.border};
    border-radius: 8px;
	display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
	width: 320px;
    ${({ onSelect }) => (onSelect ? colors.input['border-active'] : colors.input.border)};
    ${props => getButtonSize(props.size)}
	
    ${props => getButtonSize(props.size)}
`;

export const Box = styled.div`
    display: flex;
	height: 100%;
    padding: 0 16px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

export const Text = styled.p<StyledDropdownProps>`
    font-family: ${typography.fontFamily.primary};
	color: ${colors.text.disabled};
    font-style: normal;
    font-weight: 150;
    line-height: 150%;
    letter-spacing: 0;
	width: 246px;
    flex: 1 0 0;
	text-align: left;
	${props => getFontSize(props.size)}
`

export const Label = styled.p``