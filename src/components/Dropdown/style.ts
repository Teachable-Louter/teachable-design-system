import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../style';
import { typography } from '../../style';
import { checkedIconBase64 } from '../../assets/icons';

export interface StyledDropdownProps {
	size?: 'small' | 'medium' | 'large';
	onSelect?: (option: string) => void;
	isOpen?: boolean;
	isSelected?: boolean;
	width?: string;
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
			line-height: ${typography.label.small.lineHeight};
			font-weight: ${typography.label.small.fontWeight};
			`
		case 'medium':
			return css`
			font-size: ${typography.label.medium.fontSize};
			line-height: ${typography.label.medium.lineHeight};
			font-weight: ${typography.label.medium.fontWeight};
			`
		case 'large':
			return css`
			font-size: ${typography.label.large.fontSize};
			line-height: ${typography.label.large.lineHeight};
			font-weight: ${typography.label.large.fontWeight};
			`
		default:
			return css`
			font-size: ${typography.label.medium.fontSize};
			line-height: ${typography.label.medium.lineHeight};
			font-weight: ${typography.label.medium.fontWeight};
			`
	}
}
const getIconSize = (size?: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			return css`
			width: 16px;
			height: 16px;
			`
		case 'medium':
			return css`
			width: 20px;
			height: 20px;
			`
		case 'large':
			return css`
			width: 24px;
			height: 24px;
			`
		default:
			return css`
			width: 20px;
			height: 20px;
			`
	}
}
const getOptionSize = (size?: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small':
			return css`
				height: 23px;
			`
		case 'medium':
			return css`
				height: 26px;
			`
		case 'large':
			return css`
			height: 29px;
			`
		default:
			return css`
			height: 26px;
			`
	}
}

export const StyledDropDown = styled.button<StyledDropdownProps>`
	font-family: ${typography.fontFamily.primary};
	background: ${colors.input.surface};
    border-radius: 8px;
	display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
	width: ${({ width }) => width || '320px'};
	
    border: ${({ isOpen }) =>
            isOpen ? `2px solid ${colors.input['border-active']}` : `1px solid ${colors.input.border}`};
    ${props => getButtonSize(props.size)}
	
	cursor: pointer;
`;

export const StyledBox = styled.div`
    display: flex;
	height: 100%;
    padding: 0 16px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

export const StyledText = styled.p<StyledDropdownProps>`
    font-family: ${typography.fontFamily.primary};
    font-style: normal;
    letter-spacing: 0;
	width: 246px;
    flex: 1 0 0;
	text-align: left;
	${props => getFontSize(props.size)}
    color: ${({ isOpen }) => isOpen ? colors.text.static : colors.text.disabled};
`

export const StyledLabel = styled.p`
    font-family: ${typography.fontFamily.primary};
	color: ${colors.text.static};
`

export const StyledIcon = styled.div<StyledDropdownProps>`
    ${props => getIconSize(props.size)}
`

export const StyledOptions = styled.div<StyledDropdownProps>`
	border: 1px solid ${colors.border["gray-light"]};
	border-radius: 8px;

	z-index: 100;
    width: ${({ width }) => width ? `calc(${width} - 18px)` : '302px'};
    display: flex;
	position: fixed;
    padding: 12px 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    max-height: ${({ size }) =>
        size === 'small' ? '220px' :
		size === 'large' ? '260px' :
            '240px'};
    overflow-y: auto;
    overflow-x: hidden;
	
	background: ${colors.surface.white};
`

export const StyledOption = styled.div<StyledDropdownProps>`
    display: flex;
    padding: 8px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
	
	
	border-radius: 8px;
	
	color: ${colors.text.subtle};
	position: relative;
	
	${props => getFontSize(props.size)}
	${props => getOptionSize(props.size)}


	${({ isSelected }) => isSelected && css`
		background: ${colors.action["secondary-selected"]};
		color: ${colors.text.secondary};

		padding-left: 36px;

		&::after {
        content: '';
        width: 16px;
        height: 16px;
        background-image: url(${checkedIconBase64});
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
    }
	`}	&:hover {
		background: ${colors.action["secondary-hover"]};
	}
	&:active {
		background: ${colors.action["secondary-pressed"]};
	}
`