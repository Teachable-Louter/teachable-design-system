import  { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: 'text',
			description: '버튼의 너비 (예: "100px", "50%")',
		},
		height: {
			control: 'text',
			description: '버튼의 높이',
			defaultValue: '40px',
		},
		variant: {
			control: 'select',
			options: ['primary', 'secondary'],
			description: '버튼 스타일 변형',
		},
		children: {
			control: 'text',
			description: '버튼 텍스트',
		},
		onClick: {
			action: 'clicked',
			description: '클릭 이벤트 핸들러',
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Primary 버튼
export const Primary: Story = {
	args: {
		variant: 'primary',
		children: 'Primary Button',
	},
};

// Secondary 버튼
export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Secondary Button',
	},
};

// 커스텀 너비
export const CustomWidth: Story = {
	args: {
		variant: 'primary',
		children: 'Wide Button',
		width: '200px',
	},
};

// 커스텀 높이
export const CustomHeight: Story = {
	args: {
		variant: 'primary',
		children: 'Tall Button',
		height: '60px',
	},
};

// 전체 너비
export const FullWidth: Story = {
	args: {
		variant: 'primary',
		children: 'Full Width Button',
		width: '100%',
	},
	parameters: {
		layout: 'padded',
	},
};

// 작은 버튼
export const Small: Story = {
	args: {
		variant: 'primary',
		children: 'Small',
		width: '80px',
		height: '32px',
	},
};

// 큰 버튼
export const Large: Story = {
	args: {
		variant: 'primary',
		children: 'Large Button',
		width: '180px',
		height: '56px',
	},
};

// 클릭 이벤트 예제
export const WithClickHandler: Story = {
	args: {
		variant: 'primary',
		children: 'Click Me',
		onClick: () => alert('Button clicked!'),
	},
};