import React from 'react';
import {  } from 'krds-uiux'

export const inputWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '192px',
};

export const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
};

export const getInputStyle = (
    inputSize: 'small' | 'medium' | 'large',
    disabled: boolean,
    isFocused: boolean
): React.CSSProperties => {
    let padding = '12px 16px';
    let fontSize = '16px';
    let height = '48px';

    switch (inputSize) {
        case 'small':
            fontSize = '14px';
            height = '40px';
            break;
        case 'medium':
            fontSize = '16px';
            height = '48px';
            break;
        case 'large':
            fontSize = '18px';
            height = '56px';
            break;
    }

    return {
        width: '192px',
        padding,
        fontSize,
        border: isFocused ? '1px solid #4a90e2' : '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: isFocused ? '0 0 0 3px rgba(74, 144, 226, 0.1)' : 'none',
        backgroundColor: disabled ? '#f5f5f5' : '#fff',
        cursor: disabled ? 'not-allowed' : 'text',
        color: '#333',
    };
};