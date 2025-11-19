import { Meta, StoryObj } from "@storybook/react";
import CheckBox from "./CheckBox";
import React, { useState } from "react";

const meta = {
  title: "Components/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["medium", "large"],
      description: "체크박스 크기",
    },
    select: {
      control: "select",
      options: ["off", "on", "indeterminate"],
      description: "체크박스 선택 상태",
    },
    state: {
      control: "select",
      options: ["default", "disabled"],
      description: "체크박스 활성화 상태",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 체크박스 (Off 상태)
export const Default: Story = {
  args: {
    size: "large",
    select: "off",
    state: "default",
  },
};

// 체크된 상태
export const Checked: Story = {
  args: {
    size: "large",
    select: "on",
    state: "default",
  },
};

// 중간 상태 (Indeterminate)
export const Indeterminate: Story = {
  args: {
    size: "large",
    select: "indeterminate",
    state: "default",
  },
};

// Medium 크기
export const MediumSize: Story = {
  args: {
    size: "medium",
    select: "on",
    state: "default",
  },
};

// Large 크기
export const LargeSize: Story = {
  args: {
    size: "large",
    select: "on",
    state: "default",
  },
};

// 비활성화 상태 (Off)
export const DisabledOff: Story = {
  args: {
    size: "large",
    select: "off",
    state: "disabled",
  },
};

// 비활성화 상태 (Checked)
export const DisabledChecked: Story = {
  args: {
    size: "large",
    select: "on",
    state: "disabled",
  },
};

// 비활성화 상태 (Indeterminate)
export const DisabledIndeterminate: Story = {
  args: {
    size: "large",
    select: "indeterminate",
    state: "disabled",
  },
};

// 인터랙티브 예제
export const Interactive = {
  args: {
    size: "large" as const,
    state: "default" as const,
  },
  render: () => {
    const [select, setSelect] = useState<"off" | "on" | "indeterminate">("off");

    const handleClick = () => {
      setSelect((prev) => {
        if (prev === "off") return "on";
        if (prev === "on") return "indeterminate";
        return "off";
      });
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <CheckBox
          size="large"
          select={select}
          state="default"
          onClick={handleClick}
        />
        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
          클릭하여 상태 변경: {select}
        </p>
      </div>
    );
  },
};

// 모든 상태 비교
export const AllStates = {
  args: {
    size: "large" as const,
    state: "default" as const,
  },
  render: () => (
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
          Default
        </h4>
        <CheckBox size="large" select="off" state="default" />
        <CheckBox size="large" select="on" state="default" />
        <CheckBox size="large" select="indeterminate" state="default" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
          Disabled
        </h4>
        <CheckBox size="large" select="off" state="disabled" />
        <CheckBox size="large" select="on" state="disabled" />
        <CheckBox size="large" select="indeterminate" state="disabled" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>Medium</h4>
        <CheckBox size="medium" select="off" state="default" />
        <CheckBox size="medium" select="on" state="default" />
        <CheckBox size="medium" select="indeterminate" state="default" />
      </div>
    </div>
  ),
};
