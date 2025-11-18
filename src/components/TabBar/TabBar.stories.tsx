import { Meta, StoryObj } from "@storybook/react";
import TabBar from "./TabBar";
import React from "react";

const meta = {
  title: "Components/TabBar",
  component: TabBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "탭 아이템 목록",
    },
    defaultSelectedId: {
      control: "text",
      description: "기본 선택된 탭 ID",
    },
    onChange: {
      action: "changed",
      description: "탭 변경 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { id: "1", label: "기본 정보 등록" },
  { id: "2", label: "교사명 등록" },
  { id: "3", label: "과목명 등록" },
  { id: "4", label: "요일별 시수 등록" },
  { id: "5", label: "시수표 등록" },
  { id: "6", label: "일과시간 등록" },
];

// 기본 TabBar
export const Default: Story = {
  args: {
    items: sampleItems,
    defaultSelectedId: "4",
  },
};

// 첫 번째 항목 선택
export const FirstSelected: Story = {
  args: {
    items: sampleItems,
    defaultSelectedId: "1",
  },
};

// 마지막 항목 선택
export const LastSelected: Story = {
  args: {
    items: sampleItems,
    defaultSelectedId: "6",
  },
};

// 적은 항목
export const FewItems: Story = {
  args: {
    items: [
      { id: "1", label: "기본 정보 등록" },
      { id: "2", label: "교사명 등록" },
      { id: "3", label: "과목명 등록" },
    ],
    defaultSelectedId: "2",
  },
};

// 많은 항목
export const ManyItems: Story = {
  args: {
    items: [
      { id: "1", label: "기본 정보 등록" },
      { id: "2", label: "교사명 등록" },
      { id: "3", label: "과목명 등록" },
      { id: "4", label: "요일별 시수 등록" },
      { id: "5", label: "시수표 등록" },
      { id: "6", label: "일과시간 등록" },
      { id: "7", label: "추가 설정" },
      { id: "8", label: "고급 옵션" },
    ],
    defaultSelectedId: "1",
  },
};

// 인터랙티브 예제
export const Interactive: Story = {
  args: {
    items: sampleItems,
    defaultSelectedId: "4",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TabBar {...args} onChange={(id) => console.log("Selected:", id)} />
      <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
        탭을 클릭하여 선택 상태를 변경하세요
      </p>
    </div>
  ),
};
