import { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta = {
	title: 'Components/Dropdown',
	component: Dropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		placeholder: {
			control: 'text',
			description: '기본',
		},
		size: {
			control: 'text',
			description: '트리거 버튼 높이',
		},
		label: {
			control: 'text',
			description: '상단 라벨 텍스트',
		},
		options: {
			control: 'object',
			description: '표시할 옵션 문자열 배열',
		},
		onSelect: {
			action: 'selected',
			description: '옵션 선택 시 호출되는 핸들러',
		},
	},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: '과목 선택',
		placeholder: '가상학급수',
		options: ['국어', '영어', '수학', '사회', '과학'],
		size: 'medium'
	},
};

export const WithCustomSize: Story = {
	args: {
		label: '강의 분류',
		placeholder: '가상학급수',
		size: 'large',
		options: ['정규 과정', '특강', '워크숍'],
	},
};

export const MiniSize: Story = {
	args: {
		label: '강의 분류',
		placeholder: '가상학급수',
		size: 'small',
		options: ['정규 과정', '특강', '워크숍'],
	},
};

export const WithoutLabel: Story = {
	args: {
		placeholder: '가상학급수',
		options: ['옵션 1', '옵션 2', '옵션 3'],
	},
};

export const ManiOptions: Story = {
	args: {
		placeholder: '가상학급수',
		options: ['옵션 1', '옵션 2', '옵션 3', '옵션 1', '옵션 2', '옵션 3','옵션 1', '옵션 2', '옵션 3'],
	},
};
