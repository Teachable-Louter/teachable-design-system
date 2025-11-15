import React from 'react';
import { inputWrapperStyle, labelStyle, getInputStyle } from './style';
import { InputProps } from '../../type/input.types'

const Input: React.FC<InputProps> = ({
    size = 'medium',
    label = false,
    labelText = '',
    placeholder = '',
    value,
    onChange,
    disabled = false,
}) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <div style={inputWrapperStyle}>
            {label && labelText && <label style={labelStyle}>{labelText}</label>}
            <input
                style={getInputStyle(size, disabled, isFocused)}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default Input;