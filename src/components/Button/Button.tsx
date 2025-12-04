import React from 'react';
import { ButtonProps } from '../../types/button.types';
import { StyledButton } from './style';

export const Button = ({
    width,
    height,
    type = 'primary',
    size = 'medium',
    label = "Button",
    onClick,
    disabled = false,
}: ButtonProps) => {
    return (
        <StyledButton
            width={width}
            height={height}
            buttonType={type}
            buttonSize={size}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </StyledButton>
    );
};