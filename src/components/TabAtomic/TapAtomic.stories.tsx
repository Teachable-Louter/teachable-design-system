import type { Meta, StoryObj } from '@storybook/react';
import { TabAtomic } from './TapAtomic';

const meta: Meta<typeof TabAtomic> = {
	title: 'Components/TabAtomic',
	component: TabAtomic,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		tabs: {
			control: 'object',
			description: '탭 목록 (문자열 배열)',
		},
		defaultSelected: {
			control: 'text',
			description: '기본 선택된 탭',
		},
		onChange: {
			action: 'changed',
			description: '탭 선택 시 호출되는 핸들러',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		tabs: ['교사', '학급'],
		defaultSelected: '교사',
	},
};

export const ThreeTabs: Story = {
	args: {
		tabs: ['탭 1', '탭 2', '탭 3'],
		defaultSelected: '탭 1',
	},
};

export const WithCustomTabs: Story = {
	args: {
		tabs: ['옵션 A', '옵션 B', '옵션 C', '옵션 D'],
		defaultSelected: '옵션 A',
	},
};

export const WithGap: Story = {
	args: {
		tabs: ['교사', '학급'],
		defaultSelected: '교사',
		gap: '25px',
	},
};

