import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '../../style/theme/colors';
import { typography } from '../../style/theme/typography';

interface StyledButtonProps {
    width?: string;
    height?: string;
    buttonType?: string;
    buttonSize?: string;
    disabled?: boolean;
}

const getButtonSizeStyle = (size?: string) => {
    switch (size) {
        case 'small':
            return css`
                width: 148px;
                height: 40px;
                padding: 12px 0px;
                font-size: ${typography.label.small.fontSize};
                line-height: ${typography.label.small.lineHeight};
                font-weight: ${typography.label.small.fontWeight};
                font-family: ${typography.fontFamily.primary};
                letter-spacing: -0.02em;
            `;
        case 'medium':
            return css`
                width: 168px;
                height: 40px;
                padding: 12px 0px;
                font-size: ${typography.label.medium.fontSize};
                line-height: ${typography.label.medium.lineHeight};
                font-weight: ${typography.label.medium.fontWeight};
                font-family: ${typography.fontFamily.primary};
                letter-spacing: -0.02em;
            `;
        case 'large':
            return css`
                width: 198px;
                height: 40px;
                padding: 12px 0px;
                font-size: ${typography.label.medium.fontSize};
                line-height: ${typography.label.medium.lineHeight};
                font-weight: ${typography.label.medium.fontWeight};
                font-family: ${typography.fontFamily.primary};
                letter-spacing: -0.02em;
            `;
        default:
            return css`
                width: 168px;
                height: 40px;
                padding: 12px 24px;
                font-size: ${typography.label.medium.fontSize};
                line-height: ${typography.label.medium.lineHeight};
                font-weight: ${typography.label.medium.fontWeight};
                font-family: ${typography.fontFamily.primary};
                letter-spacing: -0.02em;
            `;
    }
};

export const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    box-sizing: border-box;
    white-space: nowrap;

    /* Size에 따른 스타일 */
    ${props => getButtonSizeStyle(props.buttonSize)}

    ${props => props.width && css`
        width: ${props.width};
    `}
    
    ${props => props.height && css`
        height: ${props.height};
    `}

    ${props => props.buttonType === 'primary' && css`
        background-color: ${colors.button["primary-fill"]};
        color: ${colors.text["inverse-static"]};
        border: none;

        &:hover:not(:disabled) {
            background-color: ${colors.button["primary-fill-hover"]};
        }

        &:active:not(:disabled) {
            background-color: ${colors.button["tertiary-fill"]};
        }
    `}

    ${props => props.buttonType === 'secondary' && css`
        background-color: ${colors.button['secondary-fill']};
        color: ${colors.text['primary']};
        border: 1px solid ${colors.button["secondary-border"]};

        &:hover:not(:disabled) {
            background-color: ${colors.button['secondary-fill-hover']};
        }

        &:active:not(:disabled) {
            background-color: #e0efff;
        }
    `}

    ${props => props.buttonType === 'tertiary' && css`
        background-color: transparent;
        color: ${colors.text["basic"]};
        border: 1px solid ${colors.button["tertiary-border"]};

        &:hover:not(:disabled) {
            background-color: #f0f7ff;
        }

        &:active:not(:disabled) {
            background-color: #e0efff;
        }
    `}

    /* Disabled 스타일 */
    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;