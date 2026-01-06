import React,{ useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import type { TableColumn } from '../../types/table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'name', header: '이름', width: '120px' },
    ],
    data: [
      { id: 1, name: '홍길동' },
      { id: 2, name: '김철수' },
    ],
  },
};

interface FileData extends Record<string, unknown> {
  no: string;
  filename: string;
  modifiedDate: string;
  school: string;
  classCount: string;
  teacherCount: string;
}

const FileSelectComponent = () => {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const columns: TableColumn<FileData>[] = [
    { key: 'no', header: '번호', width: '80px' },
    { key: 'filename', header: '파일명', width: '300px' },
    { key: 'modifiedDate', header: '변경일자', width: '140px' },
    { key: 'school', header: '학교명', width: '250px' },
    { key: 'classCount', header: '학급', width: '80px' },
    { key: 'teacherCount', header: '교사', width: '80px' },
  ];

  const data: FileData[] = [
    { no: '01', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '02', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '03', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '04', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '05', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '06', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '07', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '08', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '09', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
    { no: '10', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구소프트웨어마이스터고', classCount: '12', teacherCount: '0' },
  ];

  return (
    <div style={{ width: '716px' }}>
      <Table<FileData>
        columns={columns}
        data={data}
        enableRowSelection
        enableKeyboardNavigation
        selectedRowIndex={selectedRow}
        onRowClick={(rowIndex) => setSelectedRow(rowIndex)}
      />
    </div>
  );
};

export const FileSelect: Story = {
  name: 'File Select',
  args: { columns: [], data: [] },
  render: () => <FileSelectComponent />,
};

interface MemberData extends Record<string, unknown> {
  code: string;
  teacher: string;
}

const MemberListComponent = () => {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const columns: TableColumn<MemberData>[] = [
    { key: 'code', header: '코드', width: '80px' },
    { key: 'teacher', header: '교사', width: '80px' },
  ];

  const data: MemberData[] = [
    { code: '01', teacher: '강원석' },
    { code: '02', teacher: '권헌춘' },
    { code: '03', teacher: '김돈호' },
    { code: '04', teacher: '김상숙' },
    { code: '05', teacher: '김영아' },
    { code: '06', teacher: '김익현' },
    { code: '07', teacher: '김인숙' },
    { code: '08', teacher: '김지영' },
    { code: '09', teacher: '김지운' },
    { code: '10', teacher: '류주혜' },
    { code: '11', teacher: '마아람' },
    { code: '12', teacher: '김인숙' },
    { code: '13', teacher: '김지영' },
    { code: '14', teacher: '김지운' },
    { code: '15', teacher: '류주혜' },
    { code: '16', teacher: '마아람' },
    { code: '17', teacher: '마아람' },
    { code: '18', teacher: '마아람' },
    { code: '19', teacher: '마아람' },
  ];

  return (
    <div style={{ width: '180px' }}>
      <Table<MemberData>
        columns={columns}
        data={data}
        enableRowSelection
        enableKeyboardNavigation
        selectedRowIndex={selectedRow}
        onRowClick={(rowIndex) => setSelectedRow(rowIndex)}
        maxHeight="570px"
      />
    </div>
  );
};

export const MemberList: Story = {
  name: 'Member List',
  args: { columns: [], data: [] },
  render: () => <MemberListComponent />,
};

interface EditRow extends Record<string, unknown> {
  id: number;
  name: string;
  score: number;
}

const EditTableComponent = () => {
  const [data, setData] = useState<EditRow[]>([
    { id: 1, name: '홍길동', score: 90 },
    { id: 2, name: '김철수', score: 75 },
    { id: 3, name: '이영희', score: 88 },
  ]);

  const columns: TableColumn<EditRow>[] = [
    { key: 'id', header: 'ID', width: '60px', editable: false, dataType: 'number' },
    { key: 'name', header: '이름', width: '140px' },
    { key: 'score', header: '점수', width: '100px', dataType: 'number' },
  ];

  return (
    <div style={{ width: '320px' }}>
      <Table<EditRow>
        columns={columns}
        data={data}
        onCellEdit={(rowIndex, columnKey, value) => {
          setData((prev) =>
            prev.map((row, idx) =>
              idx === rowIndex ? ({ ...row, [columnKey]: value } as EditRow) : row
            )
          );
        }}
      />
    </div>
  );
};

export const Edit: Story = {
  name: 'Edit',
  args: { columns: [], data: [] },
  render: () => <EditTableComponent />,
};

interface AlignData extends Record<string, unknown> {
  id: number;
  left: string;
  center: string;
  right: string;
  number: number;
}

const AlignTableComponent = () => {
  const columns: TableColumn<AlignData>[] = [
    { key: 'id', header: 'ID', width: '60px', align: 'center' },
    { key: 'left', header: '좌측 정렬', width: '150px', align: 'left' },
    { key: 'center', header: '중앙 정렬', width: '150px', align: 'center' },
    { key: 'right', header: '우측 정렬', width: '150px', align: 'right' },
    { key: 'number', header: '숫자', width: '100px', align: 'right', dataType: 'number' },
  ];

  const data: AlignData[] = [
    { id: 1, left: 'Left', center: 'Center', right: 'Right', number: 1234 },
    { id: 2, left: 'Text', center: 'Text', right: 'Text', number: 5678 },
    { id: 3, left: 'Sample', center: 'Sample', right: 'Sample', number: 9012 },
  ];

  return (
    <div style={{ width: '650px' }}>
      <Table<AlignData>
        columns={columns}
        data={data}
      />
    </div>
  );
};

export const TextAlign: Story = {
  name: 'Text Align',
  args: { columns: [], data: [] },
  render: () => <AlignTableComponent />,
};
