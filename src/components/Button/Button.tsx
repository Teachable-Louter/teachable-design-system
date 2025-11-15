import React from 'react';
import { StyledButton } from './style';
import { ButtonProps } from '../../type/button.types';

const Button: React.FC<ButtonProps> = ({
    width,
    height,
    type = 'primary',
    size = 'medium',
    label = "Button",
    onClick,
    disabled = false,
}) => {
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

export default Button;