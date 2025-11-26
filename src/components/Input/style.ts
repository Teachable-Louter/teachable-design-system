import React from 'react';
import { typography } from '@/style';

export const getInputWrapperStyle = (size: 'small' | 'medium' | 'large'): React.CSSProperties => {
    let height = '48px';

    switch (size) {
        case 'small':
            height = '41px';
            break;
        case 'medium':
            height = '48px';
            break;
        case 'large':
            height = '56px';
            break;
    }

    return {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '306px',
        height: height,
    };
};

export const labelStyle: React.CSSProperties = {
    ...typography.label.small,
    color: '#333',
};

export const getInputStyle = (
    inputSize: 'small' | 'medium' | 'large',
    disabled: boolean,
    isFocused: boolean
): React.CSSProperties => {
    let padding = '0px 16px';
    let fontSize = typography.label.medium.fontSize;
    let lineHeight = typography.label.medium.lineHeight;
    let fontWeight = typography.label.medium.fontWeight;
    let height = '48px';
    let width = '306px';

    switch (inputSize) {
        case 'small':
            fontSize = typography.label.small.fontSize;
            lineHeight = typography.label.small.lineHeight;
            fontWeight = typography.label.small.fontWeight;
            height = '40px';
            break;
        case 'medium':
            fontSize = typography.label.medium.fontSize;
            lineHeight = typography.label.medium.lineHeight;
            fontWeight = typography.label.medium.fontWeight;
            height = '48px';
            break;
        case 'large':
            fontSize = typography.label.large.fontSize;
            lineHeight = typography.label.large.lineHeight;
            fontWeight = typography.label.large.fontWeight;
            height = '56px';
            break;
    }

    return {
        width,
        height,
        minHeight: height,
        maxHeight: height,
        padding,
        fontSize,
        lineHeight,
        fontWeight,
        fontFamily: typography.fontFamily.primary,
        border: isFocused ? '1px solid #4a90e2' : '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: isFocused ? '0 0 0 3px rgba(74, 144, 226, 0.1)' : 'none',
        backgroundColor: disabled ? '#f5f5f5' : '#fff',
        cursor: disabled ? 'not-allowed' : 'text',
        color: '#333',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
    };
};