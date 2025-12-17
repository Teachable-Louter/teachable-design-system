import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ButtonProps } from '../../types/button.types';
import React from 'react';

const meta: Meta<ButtonProps> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary'],
            description: '버튼 타입',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: '버튼 크기',
        },
        label: {
            control: 'text',
            description: '버튼 텍스트',
        },
        width: {
            control: 'text',
            description: '버튼 너비 (ex: 100px, 50%, auto)',
        },
        height: {
            control: 'text',
            description: '버튼 높이',
        },
        disabled: {
            control: 'boolean',
            description: '비활성화 여부',
        },
        onClick: {
            action: 'clicked',
            description: '클릭 이벤트',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary 버튼
export const Primary: Story = {
    args: {
        type: 'primary',
        size: 'medium',
        label: 'Primary Button',
    },
};

// Secondary 버튼
export const Secondary: Story = {
    args: {
        type: 'secondary',
        size: 'medium',
        label: 'Secondary Button',
    },
};

// Tertiary 버튼
export const Tertiary: Story = {
    args: {
        type: 'tertiary',
        size: 'medium',
        label: 'Tertiary Button',
    },
};

// Small 사이즈
export const Small: Story = {
    args: {
        type: 'primary',
        size: 'small',
        label: 'Small Button',
    },
};

// Medium 사이즈 (기본)
export const Medium: Story = {
    args: {
        type: 'primary',
        size: 'medium',
        label: 'Medium Button',
    },
};

// Large 사이즈
export const Large: Story = {
    args: {
        type: 'primary',
        size: 'large',
        label: 'Large Button',
    },
};

// 비활성화 상태
export const Disabled: Story = {
    args: {
        type: 'primary',
        size: 'medium',
        label: 'Disabled Button',
        disabled: true,
    },
};

// 커스텀 너비
export const CustomWidth: Story = {
    args: {
        type: 'primary',
        size: 'medium',
        label: 'Custom Width Button',
        width: '300px',
    },
};

// 전체 너비
export const FullWidth: Story = {
    args: {
        type: 'primary',
        size: 'medium',
        label: 'Full Width Button',
        width: '100%',
    },
    parameters: {
        layout: 'padded',
    },
};


// 다양한 조합
export const Playground: Story = {
    args: {
        type: 'primary',
        size: 'medium',
        label: 'Button',
        disabled: false,
    },
};