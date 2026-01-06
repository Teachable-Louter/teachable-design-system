import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '모달 크기',
    },
    title: {
      control: 'text',
      description: '모달 제목',
    },
    description: {
      control: 'text',
      description: '모달 설명',
    },
    isVisionButton: {
      control: 'boolean',
      description: '버튼 영역 표시 여부 (true: 표시, false: 숨김)',
    },
    cancelButtonLabel: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
    confirmButtonLabel: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

// 인터랙티브 플레이그라운드 (Controls 사용)
export const Playground: Story = {
  args: {
    title: "플레이그라운드 모달",
    description: "Controls 패널에서 props를 자유롭게 변경해보세요!",
    isVisionButton: true,
    size: "large",
    cancelButtonLabel: "취소",
    confirmButtonLabel: "확인",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>모달 열기</button>
        {isOpen && (
          <Modal 
            {...args}
            onClose={() => setIsOpen(false)}
            onConfirm={() => console.log('확인 클릭')}
            onCancel={() => console.log('취소 클릭')}
          />
        )}
      </>
    );
  },
};

// 기본 모달 (버튼 있음)
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>모달 열기</button>
        {isOpen && (
          <Modal 
            title="기본 모달"
            description="이것은 기본 모달입니다. 간단한 메시지를 표시할 수 있습니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
          />
        )}
      </>
    );
  },
};

// 긴 텍스트 모달
export const LongText: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>긴 텍스트 모달 열기</button>
        {isOpen && (
          <Modal 
            title="긴 텍스트가 포함된 모달"
            description={[
              '첫 번째 단락입니다. 여러 줄의 텍스트를 표시할 수 있습니다.',
              '두 번째 단락입니다. 각 줄은 자동으로 줄바꿈됩니다.',
              '',
              '빈 줄도 추가할 수 있습니다.',
              '네 번째 단락입니다. 스크롤이 필요할 정도로 긴 텍스트도 표시할 수 있습니다.',
              '다섯 번째 단락입니다.',
              '여섯 번째 단락입니다.',
              '일곱 번째 단락입니다.',
              '여덟 번째 단락입니다.',
              '아홉 번째 단락입니다.',
              '열 번째 단락입니다.',
            ]}
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
          />
        )}
      </>
    );
  },
};

// 여러 줄 제목
export const MultiLineTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>여러 줄 제목 모달 열기</button>
        {isOpen && (
          <Modal 
            title={['첫 번째 제목 줄', '두 번째 제목 줄', '세 번째 제목 줄']}
            description="제목이 여러 줄로 표시될 수 있습니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
          />
        )}
      </>
    );
  },
};

// Small 사이즈
export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>작은 모달 열기</button>
        {isOpen && (
          <Modal 
            size="small" 
            title="작은 모달"
            description="이것은 작은 크기의 모달입니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
          />
        )}
      </>
    );
  },
};

// Medium 사이즈
export const Medium: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>중간 모달 열기</button>
        {isOpen && (
          <Modal 
            size="medium" 
            title="중간 모달"
            description="이것은 중간 크기의 모달입니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
          />
        )}
      </>
    );
  },
};

// Large 사이즈
export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>큰 모달 열기</button>
        {isOpen && (
          <Modal 
            size="large" 
            title="큰 모달"
            description="이것은 큰 크기의 모달입니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
          />
        )}
      </>
    );
  },
};

// 확인 모달
export const ConfirmAction: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>확인 모달 열기</button>
        {isOpen && (
          <Modal 
            title="작업 확인"
            description="정말로 이 작업을 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
            onConfirm={() => alert('작업이 실행되었습니다')}
          />
        )}
      </>
    );
  },
};

// 커스텀 버튼 텍스트
export const CustomButtonLabels: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>커스텀 버튼 모달 열기</button>
        {isOpen && (
          <Modal 
            title="변경 사항 저장"
            description="변경 사항을 저장하시겠습니까?"
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
            cancelButtonLabel="아니오"
            confirmButtonLabel="저장"
            onConfirm={() => alert('저장되었습니다')}
          />
        )}
      </>
    );
  },
};

// 삭제 확인 모달
export const DeleteConfirm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>삭제 확인 모달 열기</button>
        {isOpen && (
          <Modal 
            title="삭제 확인"
            description="정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
            cancelButtonLabel="취소"
            confirmButtonLabel="삭제"
            onConfirm={() => alert('삭제되었습니다')}
          />
        )}
      </>
    );
  },
};

// 에러 모달
export const ErrorMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>에러 모달 열기</button>
        {isOpen && (
          <Modal 
            title="오류 발생"
            description={[
              '요청을 처리하는 중 오류가 발생했습니다.',
              '',
              '다시 시도하거나 관리자에게 문의해주세요.',
            ]}
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
            cancelButtonLabel="닫기"
            confirmButtonLabel="재시도"
            onConfirm={() => alert('재시도합니다')}
          />
        )}
      </>
    );
  },
};

// 성공 모달
export const SuccessMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>성공 모달 열기</button>
        {isOpen && (
          <Modal 
            title="작업 완료"
            description="요청하신 작업이 성공적으로 완료되었습니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={true}
            confirmButtonLabel="확인"
          />
        )}
      </>
    );
  },
};

// 버튼 없는 모달
export const NoButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>버튼 없는 모달 열기</button>
        {isOpen && (
          <Modal 
            title="버튼 없는 모달"
            description="이 모달은 버튼이 없습니다. 닫기 버튼이나 배경 클릭으로만 닫을 수 있습니다."
            onClose={() => setIsOpen(false)}
            isVisionButton={false}
          />
        )}
      </>
    );
  },
};

// 버튼 없는 모달 + 긴 텍스트
export const NoButtonLongText: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>버튼 없는 모달 (긴 텍스트) 열기</button>
        {isOpen && (
          <Modal 
            title="버튼 없는 모달 - 긴 텍스트"
            description={[
              '첫 번째 단락입니다.',
              '두 번째 단락입니다.',
              '세 번째 단락입니다.',
              '',
              '버튼 없이 내용만 표시됩니다.',
              '스크롤이 필요한 경우에도 잘 작동합니다.',
              '다섯 번째 단락입니다.',
              '여섯 번째 단락입니다.',
              '일곱 번째 단락입니다.',
              '여덟 번째 단락입니다.',
            ]}
            onClose={() => setIsOpen(false)}
            isVisionButton={false}
          />
        )}
      </>
    );
  },
};