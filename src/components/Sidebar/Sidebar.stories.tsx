// src/components/Sidebar/Sidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
	title: 'Components/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		buttonStyle: {
			control: 'text'
		},
		description: {
			control: 'object',
		}
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		buttonStyle: 'one',
		description: [['입력 방법', ['입력을 하기위해 더블클릭 또는 Enter키를 치세요.', '성명 입력 후에는 반드시 Enter키를 치세요.', '정식 과목명에는 과목의 실제 명칭을 기제하세요.(예. 수학 과목이 여러개인 경우 수학1: X 수학: O)','단축 과목명에는 시간표에 들어갈 과목 명칭을 작성하세요']],['삭제 방법', ['중간의 과목은 삭제 할 수 없습니다.', '맨 끝 과목만 삭제 가능합니다.']]]
	},
};

export const Default2: Story = {
	args: {
		buttonStyle: 'two',
		description: [['입력 방법', ['입력을 하기위해 더블클릭 또는 Enter키를 치세요.', '성명 입력 후에는 반드시 Enter키를 치세요.', '정식 과목명에는 과목의 실제 명칭을 기제하세요.(예. 수학 과목이 여러개인 경우 수학1: X 수학: O)','단축 과목명에는 시간표에 들어갈 과목 명칭을 작성하세요']],['삭제 방법', ['중간의 과목은 삭제 할 수 없습니다.', '맨 끝 과목만 삭제 가능합니다.']],['입력 방법', ['입력을 하기위해 더블클릭 또는 Enter키를 치세요.', '성명 입력 후에는 반드시 Enter키를 치세요.', '정식 과목명에는 과목의 실제 명칭을 기제하세요.(예. 수학 과목이 여러개인 경우 수학1: X 수학: O)','단축 과목명에는 시간표에 들어갈 과목 명칭을 작성하세요']],['삭제 방법', ['중간의 과목은 삭제 할 수 없습니다.', '맨 끝 과목만 삭제 가능합니다.']],['입력 방법', ['입력을 하기위해 더블클릭 또는 Enter키를 치세요.', '성명 입력 후에는 반드시 Enter키를 치세요.', '정식 과목명에는 과목의 실제 명칭을 기제하세요.(예. 수학 과목이 여러개인 경우 수학1: X 수학: O)','단축 과목명에는 시간표에 들어갈 과목 명칭을 작성하세요']],['삭제 방법', ['중간의 과목은 삭제 할 수 없습니다.', '맨 끝 과목만 삭제 가능합니다.']],['입력 방법', ['입력을 하기위해 더블클릭 또는 Enter키를 치세요.', '성명 입력 후에는 반드시 Enter키를 치세요.', '정식 과목명에는 과목의 실제 명칭을 기제하세요.(예. 수학 과목이 여러개인 경우 수학1: X 수학: O)','단축 과목명에는 시간표에 들어갈 과목 명칭을 작성하세요']],['삭제 방법', ['중간의 과목은 삭제 할 수 없습니다.', '맨 끝 과목만 삭제 가능합니다.']]]
	},
};

export const Default3: Story = {
	args: {
		buttonStyle: 'two',
		description: [['입력 방법', ['입력을 하기위해 ', '성명 입력 ', '정식 칭을 작성하세요']],['삭제 방법', ['중간의 과목습니다.', '맨 끝 과목합니다.']]]
		
	},
};

export const WithBackground: Story = {
	parameters: {
		backgrounds: {
			default: 'light',
			values: [
				{ name: 'light', value: '#f4f5f6' },
				{ name: 'dark', value: '#202124' },
			],
		},
	},
};

