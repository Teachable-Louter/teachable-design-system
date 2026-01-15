import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
    title: 'Components/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isRangeMode: {
            control: 'boolean',
            description: '범위 선택 모드 활성화',
        },
        locale: {
            control: 'select',
            options: ['ko', 'en'],
            description: '언어 설정',
        },
        width: {
            control: 'text',
            description: '컴포넌트 너비',
        },
    },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// 기본 범위 선택 모드
export const Default: Story = {
    args: {
        isRangeMode: true,
        locale: 'ko',
        onDateSelect: (date) => console.log('Selected date:', date),
        onRangeSelect: (start, end) => console.log('Selected range:', start, end),
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
    },
};

// 범위가 미리 선택된 상태
export const WithPreselectedRange: Story = {
    args: {
        isRangeMode: true,
        startDate: new Date(2025, 10, 12), // 2025년 11월 12일
        endDate: new Date(2025, 10, 21), // 2025년 11월 21일
        locale: 'ko',
        onRangeSelect: (start, end) => console.log('Selected range:', start, end),
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
    },
};

// 단일 날짜 선택 모드
export const SingleDateMode: Story = {
    args: {
        isRangeMode: false,
        locale: 'ko',
        onDateSelect: (date) => console.log('Selected date:', date),
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
    },
};

// 영어 버전
export const EnglishLocale: Story = {
    args: {
        isRangeMode: true,
        locale: 'en',
        onRangeSelect: (start, end) => console.log('Selected range:', start, end),
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
    },
};

// 최소/최대 날짜 제한
export const WithDateLimits: Story = {
    args: {
        isRangeMode: true,
        locale: 'ko',
        minDate: new Date(2025, 10, 5), // 2025년 11월 5일
        maxDate: new Date(2025, 10, 25), // 2025년 11월 25일
        onRangeSelect: (start, end) => console.log('Selected range:', start, end),
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
    },
};

// 커스텀 너비
export const CustomWidth: Story = {
    args: {
        isRangeMode: true,
        locale: 'ko',
        width: '450px',
        onRangeSelect: (start, end) => console.log('Selected range:', start, end),
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
    },
};
