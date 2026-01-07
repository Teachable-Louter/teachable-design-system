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

// ========== 정렬 기능 테스트 ==========
interface SortableData extends Record<string, unknown> {
  id: number;
  name: string;
  score: number;
  date: string;
}

const SortableTableComponent = () => {
  const columns: TableColumn<SortableData>[] = [
    { key: 'id', header: 'ID', width: '60px', sortable: true, dataType: 'number' },
    { key: 'name', header: '이름', width: '120px', sortable: true },
    { key: 'score', header: '점수', width: '100px', sortable: true, dataType: 'number' },
    { key: 'date', header: '날짜', width: '120px', sortable: true, dataType: 'date' },
  ];

  const data: SortableData[] = [
    { id: 3, name: '이영희', score: 88, date: '2025-01-03' },
    { id: 1, name: '홍길동', score: 95, date: '2025-01-01' },
    { id: 2, name: '김철수', score: 72, date: '2025-01-05' },
    { id: 4, name: '박민수', score: 100, date: '2025-01-02' },
  ];

  return (
    <div style={{ width: '420px' }}>
      <p style={{ marginBottom: '10px', color: '#666' }}>헤더를 클릭하여 정렬하세요 (asc → desc → none)</p>
      <Table<SortableData>
        columns={columns}
        data={data}
        onSort={(columnKey, direction) => {
          console.log(`Sort: ${columnKey} ${direction}`);
        }}
      />
    </div>
  );
};

export const Sortable: Story = {
  name: 'Sortable',
  args: { columns: [], data: [] },
  render: () => <SortableTableComponent />,
};

// ========== 데이터 타입 테스트 (date, boolean) ==========
interface DataTypeData extends Record<string, unknown> {
  id: number;
  name: string;
  birthDate: string;
  active: boolean;
  score: number;
}

const DataTypeTableComponent = () => {
  const columns: TableColumn<DataTypeData>[] = [
    { key: 'id', header: 'ID', width: '60px', dataType: 'number' },
    { key: 'name', header: '이름', width: '100px', dataType: 'text' },
    { key: 'birthDate', header: '생년월일', width: '120px', dataType: 'date' },
    { key: 'active', header: '활성화', width: '80px', dataType: 'boolean' },
    { key: 'score', header: '점수', width: '80px', dataType: 'number' },
  ];

  const data: DataTypeData[] = [
    { id: 1, name: '홍길동', birthDate: '1990-05-15', active: true, score: 95 },
    { id: 2, name: '김철수', birthDate: '1985-12-20', active: false, score: 82 },
    { id: 3, name: '이영희', birthDate: '1995-03-08', active: true, score: 78 },
  ];

  return (
    <div style={{ width: '460px' }}>
      <p style={{ marginBottom: '10px', color: '#666' }}>다양한 데이터 타입: date(날짜), boolean(예/아니오)</p>
      <Table<DataTypeData>
        columns={columns}
        data={data}
      />
    </div>
  );
};

export const DataTypes: Story = {
  name: 'Data Types',
  args: { columns: [], data: [] },
  render: () => <DataTypeTableComponent />,
};

// ========== 커스텀 렌더링 테스트 ==========
interface CustomRenderData extends Record<string, unknown> {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  progress: number;
}

const CustomRenderTableComponent = () => {
  const columns: TableColumn<CustomRenderData>[] = [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'name', header: '이름', width: '100px' },
    { 
      key: 'status', 
      header: '상태', 
      width: '100px',
      render: (value) => {
        const statusColors: Record<string, { bg: string; text: string }> = {
          active: { bg: '#dcfce7', text: '#16a34a' },
          inactive: { bg: '#fee2e2', text: '#dc2626' },
          pending: { bg: '#fef3c7', text: '#d97706' },
        };
        const statusLabels: Record<string, string> = {
          active: '활성',
          inactive: '비활성',
          pending: '대기중',
        };
        const statusValue = value as string;
        const color = statusColors[statusValue] || { bg: '#f3f4f6', text: '#6b7280' };
        const label = statusLabels[statusValue] || statusValue;
        return (
          <span style={{ 
            padding: '2px 8px', 
            borderRadius: '12px', 
            backgroundColor: color.bg, 
            color: color.text,
            fontSize: '12px',
            fontWeight: 500,
          }}>
            {label}
          </span>
        );
      }
    },
    { 
      key: 'progress', 
      header: '진행률', 
      width: '150px',
      render: (value) => {
        const percent = Number(value);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              flex: 1, 
              height: '8px', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${percent}%`, 
                height: '100%', 
                backgroundColor: percent >= 80 ? '#16a34a' : percent >= 50 ? '#d97706' : '#dc2626',
                transition: 'width 0.3s'
              }} />
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{percent}%</span>
          </div>
        );
      }
    },
  ];

  const data: CustomRenderData[] = [
    { id: 1, name: '프로젝트 A', status: 'active', progress: 85 },
    { id: 2, name: '프로젝트 B', status: 'pending', progress: 45 },
    { id: 3, name: '프로젝트 C', status: 'inactive', progress: 20 },
    { id: 4, name: '프로젝트 D', status: 'active', progress: 100 },
  ];

  return (
    <div style={{ width: '430px' }}>
      <p style={{ marginBottom: '10px', color: '#666' }}>커스텀 렌더링: 상태 뱃지, 진행률 바</p>
      <Table<CustomRenderData>
        columns={columns}
        data={data}
      />
    </div>
  );
};

export const CustomRender: Story = {
  name: 'Custom Render',
  args: { columns: [], data: [] },
  render: () => <CustomRenderTableComponent />,
};

// ========== 컬럼 배경색 테스트 ==========
interface BackgroundColorData extends Record<string, unknown> {
  id: number;
  category: string;
  value: number;
  note: string;
}

const BackgroundColorTableComponent = () => {
  const columns: TableColumn<BackgroundColorData>[] = [
    { key: 'id', header: 'ID', width: '60px', backgroundColor: '#f0f9ff' },
    { key: 'category', header: '카테고리', width: '120px', backgroundColor: '#ecfdf5', isHeaderColumn: true },
    { key: 'value', header: '값', width: '100px', backgroundColor: '#fef3c7' },
    { key: 'note', header: '비고', width: '150px', backgroundColor: '#fce7f3' },
  ];

  const data: BackgroundColorData[] = [
    { id: 1, category: '카테고리 A', value: 100, note: '비고 1' },
    { id: 2, category: '카테고리 B', value: 200, note: '비고 2' },
    { id: 3, category: '카테고리 C', value: 300, note: '비고 3' },
  ];

  return (
    <div style={{ width: '450px' }}>
      <p style={{ marginBottom: '10px', color: '#666' }}>컬럼별 배경색 설정</p>
      <Table<BackgroundColorData>
        columns={columns}
        data={data}
      />
    </div>
  );
};

export const BackgroundColor: Story = {
  name: 'Background Color',
  args: { columns: [], data: [] },
  render: () => <BackgroundColorTableComponent />,
};

// ========== 다중 셀 선택 테스트 ==========
interface MultiSelectData extends Record<string, unknown> {
  id: number;
  col1: string;
  col2: string;
  col3: string;
}

const MultiSelectTableComponent = () => {
  const [selectedCells, setSelectedCells] = useState<string>('');

  const columns: TableColumn<MultiSelectData>[] = [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'col1', header: '컬럼1', width: '100px' },
    { key: 'col2', header: '컬럼2', width: '100px' },
    { key: 'col3', header: '컬럼3', width: '100px' },
  ];

  const data: MultiSelectData[] = [
    { id: 1, col1: 'A1', col2: 'B1', col3: 'C1' },
    { id: 2, col1: 'A2', col2: 'B2', col3: 'C2' },
    { id: 3, col1: 'A3', col2: 'B3', col3: 'C3' },
    { id: 4, col1: 'A4', col2: 'B4', col3: 'C4' },
  ];

  return (
    <div style={{ width: '380px' }}>
      <p style={{ marginBottom: '10px', color: '#666' }}>
        마우스 드래그로 여러 셀 선택, 우클릭으로 컨텍스트 메뉴
      </p>
      <Table<MultiSelectData>
        columns={columns}
        data={data}
        onSelectionChange={(cells) => {
          setSelectedCells(`선택된 셀: ${cells.length}개 - ${cells.map(c => `(${c.row},${c.col})`).join(', ')}`);
        }}
      />
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>{selectedCells}</p>
    </div>
  );
};

export const MultiSelect: Story = {
  name: 'Multi Select',
  args: { columns: [], data: [] },
  render: () => <MultiSelectTableComponent />,
};

// ========== 전체 기능 통합 테스트 ==========
interface FullFeatureData extends Record<string, unknown> {
  id: number;
  name: string;
  score: number;
  date: string;
  active: boolean;
}

const FullFeatureTableComponent = () => {
  const [data, setData] = useState<FullFeatureData[]>([
    { id: 1, name: '홍길동', score: 95, date: '2025-01-01', active: true },
    { id: 2, name: '김철수', score: 82, date: '2025-01-05', active: false },
    { id: 3, name: '이영희', score: 78, date: '2025-01-03', active: true },
    { id: 4, name: '박민수', score: 100, date: '2025-01-02', active: true },
    { id: 5, name: '최지우', score: 65, date: '2025-01-04', active: false },
  ]);

  const columns: TableColumn<FullFeatureData>[] = [
    { key: 'id', header: 'ID', width: '60px', editable: false, sortable: true, dataType: 'number', align: 'center' },
    { key: 'name', header: '이름', width: '120px', sortable: true },
    { key: 'score', header: '점수', width: '100px', sortable: true, dataType: 'number', align: 'right' },
    { key: 'date', header: '날짜', width: '120px', sortable: true, dataType: 'date' },
    { 
      key: 'active', 
      header: '상태', 
      width: '80px', 
      dataType: 'boolean',
      render: (value) => (
        <span style={{ color: value ? '#16a34a' : '#dc2626' }}>
          {value ? '✓ 활성' : '✗ 비활성'}
        </span>
      )
    },
  ];

  return (
    <div style={{ width: '500px' }}>
      <p style={{ marginBottom: '10px', color: '#666' }}>
        전체 기능: 정렬, 편집, 데이터 타입, 커스텀 렌더링, 다중 선택
      </p>
      <Table<FullFeatureData>
        columns={columns}
        data={data}
        onCellEdit={(rowIndex, columnKey, value) => {
          setData((prev) =>
            prev.map((row, idx) =>
              idx === rowIndex ? ({ ...row, [columnKey]: value } as FullFeatureData) : row
            )
          );
          console.log(`Edit: row ${rowIndex}, column ${columnKey}, value ${value}`);
        }}
        onSort={(columnKey, direction) => {
          console.log(`Sort: ${columnKey} ${direction}`);
        }}
        onSelectionChange={(cells) => {
          console.log(`Selection: ${cells.length} cells`);
        }}
      />
    </div>
  );
};

export const FullFeature: Story = {
  name: 'Full Feature',
  args: { columns: [], data: [] },
  render: () => <FullFeatureTableComponent />,
};
