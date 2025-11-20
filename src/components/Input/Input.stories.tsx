import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { useState } from 'react';
import { InputProps } from '../../type/input.types';

const meta: Meta<InputProps> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: '인풋의 크기',
        },
        label: {
            control: 'boolean',
            description: 'label 표시 여부',
        },
        labelText: {
            control: 'text',
            description: 'label에 표시될 텍스트',
        },
        placeholder: {
            control: 'text',
            description: 'placeholder 텍스트',
        },
        disabled: {
            control: 'boolean',
            description: '비활성화 여부',
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
    args: {
        size: 'medium',
        label: true,
        labelText: 'Label',
        placeholder: 'Enter text...',
        disabled: false,
    },
};

// Small 사이즈
export const Small: Story = {
    args: {
        size: 'small',
        label: true,
        labelText: 'Small Input',
        placeholder: 'Small size input',
    },
};

// Medium 사이즈
export const Medium: Story = {
    args: {
        size: 'medium',
        label: true,
        labelText: 'Medium Input',
        placeholder: 'Medium size input',
    },
};

// Large 사이즈
export const Large: Story = {
    args: {
        size: 'large',
        label: true,
        labelText: 'Large Input',
        placeholder: 'Large size input',
    },
};

// Label 없음
export const WithoutLabel: Story = {
    args: {
        size: 'medium',
        label: false,
        placeholder: 'Input without label',
    },
};

// Disabled 상태
export const Disabled: Story = {
    args: {
        size: 'medium',
        label: true,
        labelText: 'Disabled Input',
        placeholder: 'This input is disabled',
        disabled: true,
    },
};

// 인터랙티브 예제 (Controlled Input)
export const Controlled: Story = {
    render: (args) => {
        const [value, setValue] = useState('');
        
        return (
            <div style={{ width: '300px' }}>
                <Input
                    {...args}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    Current value: {value || '(empty)'}
                </p>
            </div>
        );
    },
    args: {
        size: 'medium',
        label: true,
        labelText: 'Controlled Input',
        placeholder: 'Type something...',
    },
};

// 모든 사이즈 비교
export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
            <Input
                size="small"
                label={true}
                labelText="Small"
                placeholder="Small input"
            />
            <Input
                size="medium"
                label={true}
                labelText="Medium"
                placeholder="Medium input"
            />
            <Input
                size="large"
                label={true}
                labelText="Large"
                placeholder="Large input"
            />
        </div>
    ),
};