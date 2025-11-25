import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Table from './Table';
import type { TableColumn } from '../../types/table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Table Component

편집 가능하고 정렬 가능한 테이블 컴포넌트입니다.

## 주요 기능
- ✅ 셀 편집 (더블클릭)
- ✅ 정렬 기능
- ✅ 다양한 데이터 타입 지원
- ✅ 셀 병합 (rowSpan/colSpan)
- ✅ 스크롤 기능
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: '테이블 컬럼 정의 배열',
      table: {
        type: { 
          summary: 'TableColumn[]',
          detail: `{
  key: string;
  header: string;
  width?: string;
  height?: string;
  editable?: boolean;
  dataType?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  sortable?: boolean;
  rowSpan?: number;
  colSpan?: number;
  render?: (value, row, rowIndex) => ReactNode;
  sortFn?: (a, b) => number;
}`
        },
      },
    },
    data: {
      control: 'object',
      description: '테이블 데이터 배열',
      table: {
        type: { summary: 'Array<Record<string, unknown>>' },
      },
    },
    maxHeight: {
      control: 'text',
      description: '테이블 최대 높이 (스크롤 활성화)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    striped: {
      control: 'boolean',
      description: '줄무늬 스타일 적용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
      table: {
        type: { summary: 'string' },
      },
    },
    onCellEdit: {
      action: 'cell-edited',
      description: '셀 편집 콜백 함수',
      table: {
        type: { summary: '(rowIndex, columnKey, value) => void' },
      },
    },
    onSort: {
      action: 'sorted',
      description: '정렬 변경 콜백 함수',
      table: {
        type: { summary: '(columnKey, direction) => void' },
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// 🎮 Interactive Playground - Controls 패널에서 모든 속성 수정 가능
export const Playground: Story = {
  args: {
    columns: [{
      "key": "id",
      "header": "ID",
      "width": "80px",
      "editable": false,
      "sortable": true,
      "dataType": "number"
    }, {
      "key": "name",
      "header": "이름",
      "width": "120px",
      "editable": true,
      "sortable": true
    }, {
      "key": "age",
      "header": "내나이",
      "width": "80px",
      "editable": true,
      "sortable": true,
      "dataType": "number"
    }, {
      "key": "email",
      "header": "이메일",
      "width": "200px",
      "editable": true
    }, {
      "key": "department",
      "header": "부서",
      "width": "120px",
      "sortable": true
    }],
    data: [{
      "id": 1,
      "name": "홍길동",
      "age": 25,
      "email": "hong@example.com",
      "department": "개발팀"
    }, {
      "id": 2,
      "name": "김철수",
      "age": 30,
      "email": "kim@example.com",
      "department": "디자인팀"
    }, {
      "id": 3,
      "name": "이영희",
      "age": 28,
      "email": "lee@example.com",
      "department": "기획팀"
    }, {
      "id": 4,
      "name": "박민수",
      "age": 1647283649750866,
      "email": "park@example.com",
      "department": "개발팀"
    }, {
      "id": 5,
      "name": "정수진",
      "age": 27,
      "email": "jung@example.com",
      "department": "마케팅팀"
    }],
    maxHeight: "30",
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: '💡 **Controls 패널**에서 columns, data, maxHeight, striped 등 모든 속성을 실시간으로 수정해보세요!',
      },
    },
  },
};

// 기본 테이블
export const Basic: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '80px', editable: false },
      { key: 'name', header: '이름', width: '120px' },
      { key: 'email', header: '이메일', width: '200px' },
      { key: 'department', header: '부서', width: '100px' },
    ],
    data: [
      { id: 1, name: '홍길동', email: 'hong@example.com', department: '개발팀' },
      { id: 2, name: '김철수', email: 'kim@example.com', department: '디자인팀' },
      { id: 3, name: '이영희', email: 'lee@example.com', department: '기획팀' },
      { id: 4, name: '박민수', email: 'park@example.com', department: '개발팀' },
    ],
  },
};

// 편집 가능한 테이블
export const Editable: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => {
    const [data, setData] = useState([
      { id: 1, name: '홍길동', age: 25, email: 'hong@example.com' },
      { id: 2, name: '김철수', age: 30, email: 'kim@example.com' },
      { id: 3, name: '이영희', age: 28, email: 'lee@example.com' },
    ]);

    const columns: TableColumn[] = [
      { key: 'id', header: 'ID', width: '80px', editable: false },
      { key: 'name', header: '이름', width: '120px', editable: true },
      { key: 'age', header: '나이', width: '80px', editable: true, dataType: 'number' },
      { key: 'email', header: '이메일', width: '200px', editable: true },
    ];

    const handleEdit = (rowIndex: number, columnKey: string, value: unknown) => {
      const newData = [...data];
      newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
      setData(newData);
      console.log('편집됨:', { rowIndex, columnKey, value });
    };

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 셀을 더블클릭하여 편집할 수 있습니다. Enter로 저장, ESC로 취소
        </p>
        <Table columns={columns} data={data} onCellEdit={handleEdit} />
      </div>
    );
  },
};

// 정렬 가능한 테이블
export const Sortable: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'name', header: '이름', sortable: true },
      { key: 'age', header: '나이', dataType: 'number', sortable: true },
      { key: 'score', header: '점수', dataType: 'number', sortable: true },
      { key: 'grade', header: '등급', sortable: true },
    ];

    const data = [
      { name: '홍길동', age: 25, score: 95, grade: 'A' },
      { name: '김철수', age: 30, score: 87, grade: 'B' },
      { name: '이영희', age: 28, score: 92, grade: 'A' },
      { name: '박민수', age: 22, score: 78, grade: 'C' },
      { name: '정수진', age: 27, score: 88, grade: 'B' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 컬럼 헤더를 클릭하여 정렬할 수 있습니다 (오름차순 → 내림차순 → 정렬 해제)
        </p>
        <Table
          columns={columns}
          data={data}
          onSort={(columnKey, direction) => {
            console.log('정렬:', columnKey, direction);
          }}
        />
      </div>
    );
  },
};

// 다양한 데이터 타입
export const DataTypes: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'name', header: '이름', dataType: 'text' },
      { key: 'age', header: '나이', dataType: 'number', sortable: true },
      { key: 'salary', header: '급여', dataType: 'number', sortable: true },
      { key: 'joinDate', header: '입사일', dataType: 'date', sortable: true },
      { key: 'isActive', header: '재직중', dataType: 'boolean', width: '100px' },
    ];

    const data = [
      {
        name: '홍길동',
        age: 25,
        salary: 3500000,
        joinDate: new Date('2023-03-15'),
        isActive: true,
      },
      {
        name: '김철수',
        age: 30,
        salary: 4200000,
        joinDate: new Date('2021-07-01'),
        isActive: true,
      },
      {
        name: '이영희',
        age: 28,
        salary: 3800000,
        joinDate: new Date('2022-01-10'),
        isActive: false,
      },
    ];

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 text, number(콤마 포맷), date(YYYY.MM.DD), boolean(예/아니오) 타입 지원
        </p>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

// 커스텀 렌더링
export const CustomRender: Story = {
  args: {
    columns: [],
    data: [],
    striped: true
  },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'name', header: '이름' },
      { key: 'status', header: '상태', width: '120px', render: (value) => {
        const color = value === 'active' ? '#22c55e' : value === 'pending' ? '#f59e0b' : '#ef4444';
        const text = value === 'active' ? '활성' : value === 'pending' ? '대기' : '비활성';
        return (
          <span style={{ 
            color, 
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: `${color}20`
          }}>
            {text}
          </span>
        );
      }},
      { key: 'progress', header: '진행률', render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            flex: 1, 
            height: '8px', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${value}%`, 
              height: '100%', 
              backgroundColor: '#3b82f6',
              transition: 'width 0.3s'
            }} />
          </div>
          <span style={{ fontSize: '13px', color: '#6b7280', minWidth: '40px' }}>
            {String(value)}%
          </span>
        </div>
      )},
      { key: 'actions', header: '액션', render: () => (
        <button 
          style={{ 
            padding: '4px 12px', 
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          onClick={() => alert('버튼 클릭!')}
        >
          상세보기
        </button>
      )},
    ];

    const data = [
      { name: '프로젝트 A', status: 'active', progress: 75, actions: null },
      { name: '프로젝트 B', status: 'pending', progress: 45, actions: null },
      { name: '프로젝트 C', status: 'inactive', progress: 100, actions: null },
    ];

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 render 함수로 커스텀 UI를 렌더링할 수 있습니다
        </p>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

// 스크롤 테이블
export const Scrollable: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'id', header: 'No', width: '60px' },
      { key: 'name', header: '이름' },
      { key: 'department', header: '부서' },
      { key: 'position', header: '직급' },
    ];

    const data = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `사원 ${i + 1}`,
      department: ['개발팀', '디자인팀', '기획팀', '영업팀'][i % 4],
      position: ['사원', '대리', '과장', '부장'][i % 4],
    }));

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 maxHeight 설정으로 스크롤 기능을 활성화할 수 있습니다
        </p>
        <Table columns={columns} data={data} maxHeight="400px" />
      </div>
    );
  },
};

// 시간표 (셀 병합)
export const Timetable: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'period', header: '교시', width: '80px', isHeaderColumn: true },
      { key: 'monday', header: '월', width: '120px', height: '50px' },
      { key: 'tuesday', header: '화', width: '120px', height: '50px' },
      { key: 'wednesday', header: '수', width: '120px', height: '50px' },
      { key: 'thursday', header: '목', width: '120px', height: '50px' },
      { key: 'friday', header: '금', width: '120px', height: '50px' },
    ];

    const data = [
      { period: '1교시', monday: '수학', tuesday: '국어', wednesday: '영어', thursday: '과학', friday: '체육' },
      { period: '2교시', monday: '국어', tuesday: '수학', wednesday: '과학', thursday: '영어', friday: '음악' },
      { period: '3교시', monday: '영어', tuesday: '과학', wednesday: '수학', thursday: '국어', friday: '미술' },
      { period: '4교시', monday: '과학', tuesday: '영어', wednesday: '국어', thursday: '수학', friday: '사회' },
      { period: '5교시', monday: '체육', tuesday: '음악', wednesday: '미술', thursday: '사회', friday: '역사' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 height 속성으로 셀 높이 조정, isHeaderColumn으로 좌측 열 강조 표시
        </p>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

// 성적표 (복합 예제)
export const GradeSheet: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const [data, setData] = useState([
      { id: 1, name: '홍길동', korean: 85, english: 90, math: 95, total: 270, average: 90 },
      { id: 2, name: '김철수', korean: 92, english: 88, math: 85, total: 265, average: 88.3 },
      { id: 3, name: '이영희', korean: 88, english: 95, math: 92, total: 275, average: 91.7 },
      { id: 4, name: '박민수', korean: 90, english: 87, math: 88, total: 265, average: 88.3 },
    ]);

    const columns: TableColumn[] = [
      { key: 'id', header: 'No', width: '60px', editable: false, sortable: true, dataType: 'number' },
      { key: 'name', header: '이름', width: '100px', sortable: true },
      { key: 'korean', header: '국어', width: '80px', editable: true, sortable: true, dataType: 'number' },
      { key: 'english', header: '영어', width: '80px', editable: true, sortable: true, dataType: 'number' },
      { key: 'math', header: '수학', width: '80px', editable: true, sortable: true, dataType: 'number' },
      { key: 'total', header: '총점', width: '80px', editable: false, sortable: true, dataType: 'number' },
      { 
        key: 'average', 
        header: '평균', 
        width: '80px', 
        editable: false, 
        sortable: true,
        dataType: 'number',
        render: (value) => (
          <span style={{ fontWeight: 600, color: Number(value) >= 90 ? '#22c55e' : '#6b7280' }}>
            {Number(value).toFixed(1)}
          </span>
        )
      },
    ];

    const handleEdit = (rowIndex: number, columnKey: string, value: unknown) => {
      const newData = [...data];
      const row = { ...newData[rowIndex] };
      row[columnKey as keyof typeof row] = value as never;
      
      // 총점과 평균 자동 계산
      if (['korean', 'english', 'math'].includes(columnKey)) {
        row.total = Number(row.korean) + Number(row.english) + Number(row.math);
        row.average = Number((row.total / 3).toFixed(1));
      }
      
      newData[rowIndex] = row;
      setData(newData);
    };

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 성적을 편집하면 총점과 평균이 자동으로 계산됩니다
        </p>
        <Table columns={columns} data={data} onCellEdit={handleEdit} />
      </div>
    );
  },
};

// 대용량 데이터 (성능 테스트)
export const LargeDataset: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'id', header: 'ID', width: '80px', sortable: true, dataType: 'number' },
      { key: 'name', header: '이름', sortable: true },
      { key: 'email', header: '이메일', width: '200px' },
      { key: 'age', header: '나이', width: '80px', sortable: true, dataType: 'number' },
      { key: 'city', header: '도시', sortable: true },
    ];

    const cities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산'];
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 40),
      city: cities[i % cities.length],
    }));

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 100개의 행을 가진 테이블 (useMemo로 정렬 성능 최적화)
        </p>
        <Table columns={columns} data={data} maxHeight="500px" />
      </div>
    );
  },
};

// 셀 병합 예제 (Figma처럼)
export const CellMerging: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'code', header: '코드', width: '80px', isHeaderColumn: true },
      { key: 'teacher', header: '교사', width: '80px', isHeaderColumn: true },
      { key: 'period', header: '교시', width: '80px', isHeaderColumn: true },
      { key: 'mon', header: '월', width: '94px', height: '50px' },
      { key: 'tue', header: '화', width: '94px', height: '50px' },
      { key: 'wed', header: '수', width: '94px', height: '50px' },
      { key: 'thu', header: '목', width: '94px', height: '50px' },
      { key: 'fri', header: '금', width: '94px', height: '50px' },
      { key: 'sat', header: '토', width: '94px', height: '50px' },
    ];

    const data = [
      { code: '01', teacher: '강원석', period: '1', mon: '', tue: '101과학', wed: '', thu: '101과학', fri: '', sat: '' },
      { code: '02', teacher: '권헌춘', period: '2', mon: '104과학', tue: '', wed: '102과학', thu: '', fri: '', sat: '' },
      { code: '03', teacher: '김돈호', period: '3', mon: '', tue: '104과학', wed: '', thu: '104과학', fri: '', sat: '' },
      { code: '04', teacher: '김상숙', period: '4', mon: '101과학', tue: '104과학', wed: '103과학', thu: '102과학', fri: '', sat: '' },
      { code: '05', teacher: '김영아', period: '5', mon: '', tue: '103과학', wed: '103과학', thu: '', fri: '103과학', sat: '' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 Figma 디자인처럼 좌측 3개 열을 헤더 스타일로 표시 (isHeaderColumn: true)
        </p>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

// 강원석 시간표 (병합된 헤더)
export const TeacherSchedule: Story = {
  args: { columns: [], data: [] },
  render: () => {
    // 첫 번째 행에는 빈 셀과 병합된 "강원석 시간표" 헤더
    const headerColumns: TableColumn[] = [
      { key: 'empty', header: '', width: '80px', isHeaderColumn: true },
      { key: 'title', header: '강원석 시간표', colSpan: 6, width: '564px', isHeaderColumn: true },
    ];

    const columns: TableColumn[] = [
      { key: 'period', header: '교시', width: '80px', isHeaderColumn: true },
      { key: 'mon', header: '월', width: '94px', height: '50px' },
      { key: 'tue', header: '화', width: '94px', height: '50px' },
      { key: 'wed', header: '수', width: '94px', height: '50px' },
      { key: 'thu', header: '목', width: '94px', height: '50px' },
      { key: 'fri', header: '금', width: '94px', height: '50px' },
      { key: 'sat', header: '토', width: '94px', height: '50px' },
    ];

    const data = [
      { period: '1', mon: '', tue: '101과학', wed: '', thu: '101과학', fri: '', sat: '' },
      { period: '2', mon: '104과학', tue: '', wed: '102과학', thu: '', fri: '', sat: '' },
      { period: '3', mon: '', tue: '104과학', wed: '', thu: '104과학', fri: '', sat: '' },
      { period: '4', mon: '101과학', tue: '104과학', wed: '103과학', thu: '102과학', fri: '', sat: '' },
      { period: '5', mon: '', tue: '103과학', wed: '103과학', thu: '', fri: '103과학', sat: '' },
      { period: '6', mon: '', tue: '103과학', wed: '', thu: '', fri: '', sat: '' },
      { period: '7', mon: '', tue: '102과학', wed: '', thu: '', fri: '', sat: '' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '16px', color: '#666' }}>
          💡 Figma의 "강원석 시간표"처럼 colSpan으로 헤더 병합 가능
        </p>
        <div style={{ marginBottom: '8px' }}>
          <Table columns={headerColumns} data={[{ empty: '', title: '' }]} />
        </div>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};
