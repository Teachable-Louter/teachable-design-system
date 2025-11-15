import styled from '@emotion/styled';
import { css } from '@emotion/react';

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
                padding: 12 0px;
                font-size: 14px;
            `;
        case 'medium':
            return css`
                width: 168px;
                height: 40px;
                padding: 12 0px;
                font-size: 14px;
            `;
        case 'large':
            return css`
                width: 198px;
                height: 40px;
                padding: 12 0px;
                font-size: 16px;
            `;
        default:
            return css`
                width: 168px;
                height: 40px;
                padding: 0 12px;
                font-size: 14px;
            `;
    }
};

export const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    box-sizing: border-box;

    /* Size에 따른 스타일 */
    ${props => getButtonSizeStyle(props.buttonSize)}

    /* width와 height가 직접 전달된 경우 우선 적용 */
    ${props => props.width && css`
        width: ${props.width};
    `}
    
    ${props => props.height && css`
        height: ${props.height};
    `}

    ${props => props.buttonType === 'primary' && css`
        background-color: #0066ff;
        color: #ffffff;
        border: none;

        &:hover:not(:disabled) {
            background-color: #0052cc;
        }

        &:active:not(:disabled) {
            background-color: #003d99;
        }
    `}

    ${props => props.buttonType === 'secondary' && css`
        background-color: #ECF2FE;
        color: #0066ff;
        border: 1px solid #0066ff;
        

        &:hover:not(:disabled) {
            background-color: #f0f7ff;
        }

        &:active:not(:disabled) {
            background-color: #e0efff;
        }
    `}

    ${props => props.buttonType === 'tertiary' && css`
        background-color: transparent;
        color: #0066ff;
        border: 1px solid #58616A;

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