
import React,{ useState } from 'react';
import { getInputWrapperStyle, labelStyle, getInputStyle } from './style';
import { InputProps } from '../../types/input.types'

export const Input = ({
    size = 'medium',
    label = false,
    labelText = '',
    placeholder = '',
    value,
    onChange,
    disabled = false,
}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={getInputWrapperStyle(size)}>
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