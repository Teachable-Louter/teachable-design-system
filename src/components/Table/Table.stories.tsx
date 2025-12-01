import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import type { TableColumn } from '../../types/table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object', description: '테이블 컬럼 정의' },
    data: { control: 'object', description: '테이블 데이터 배열' },
    maxHeight: { control: 'text', description: '최대 높이 (스크롤 활성화)' },
    striped: { control: 'boolean', description: '줄무늬 스타일' },
    onCellEdit: { action: 'cell-edited', description: '셀 편집 콜백' },
    onSort: { action: 'sorted', description: '정렬 콜백' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: '🎮 Playground',
  args: { columns: [], data: [] },
  render: () => {
    const [striped, setStriped] = useState(false);
    const [maxHeight, setMaxHeight] = useState('');
    const [showStatus, setShowStatus] = useState(true);
    const [editLog, setEditLog] = useState<string[]>([]);
    const [sortInfo, setSortInfo] = useState<{ key: string; direction: string } | null>(null);
    
    const [data, setData] = useState([
      { id: 1, name: '홍길동', age: 28, email: 'hong@example.com', department: '개발팀', salary: 4500000, joinDate: new Date('2022-03-15'), isActive: true, status: 'active' },
      { id: 2, name: '김철수', age: 32, email: 'kim@example.com', department: '디자인팀', salary: 5200000, joinDate: new Date('2021-07-01'), isActive: true, status: 'active' },
      { id: 3, name: '이영희', age: 26, email: 'lee@example.com', department: '기획팀', salary: 3800000, joinDate: new Date('2023-01-10'), isActive: false, status: 'inactive' },
      { id: 4, name: '박민수', age: 35, email: 'park@example.com', department: '개발팀', salary: 6000000, joinDate: new Date('2020-11-20'), isActive: true, status: 'active' },
      { id: 5, name: '정수진', age: 29, email: 'jung@example.com', department: '마케팅팀', salary: 4200000, joinDate: new Date('2022-08-05'), isActive: true, status: 'pending' },
      { id: 6, name: '최동현', age: 31, email: 'choi@example.com', department: '영업팀', salary: 4800000, joinDate: new Date('2021-03-22'), isActive: true, status: 'active' },
      { id: 7, name: '강지연', age: 27, email: 'kang@example.com', department: '인사팀', salary: 3900000, joinDate: new Date('2023-06-01'), isActive: true, status: 'pending' },
      { id: 8, name: '윤서준', age: 33, email: 'yoon@example.com', department: '개발팀', salary: 5500000, joinDate: new Date('2020-09-15'), isActive: false, status: 'inactive' },
    ]);

    const columns: TableColumn[] = [
      { key: 'id', header: 'ID', width: '50px', sortable: true, dataType: 'number' },
      { key: 'name', header: '이름', width: '90px', editable: true, sortable: true },
      { key: 'age', header: '나이', width: '70px', editable: true, sortable: true, dataType: 'number' },
      { key: 'department', header: '부서', width: '90px', sortable: true, editable: true },
      { key: 'salary', header: '급여', width: '110px', sortable: true, dataType: 'number', editable: true },
      { key: 'email', header: '이메일', width: '170px', editable: true },
      { key: 'joinDate', header: '입사일', width: '110px', dataType: 'date', sortable: true },
      { key: 'isActive', header: '재직', width: '70px', dataType: 'boolean', sortable: true },
      ...(showStatus ? [{
        key: 'status',
        header: '상태',
        width: '90px',
        sortable: true,
        render: (value: unknown) => {
          const statusMap: Record<string, { color: string; text: string; bg: string }> = {
            active: { color: '#16a34a', text: '활성', bg: '#dcfce7' },
            pending: { color: '#d97706', text: '대기', bg: '#fef3c7' },
            inactive: { color: '#dc2626', text: '비활성', bg: '#fee2e2' },
          };
          const { color, text, bg } = statusMap[value as string] || { color: '#6b7280', text: value, bg: '#f3f4f6' };
          return (
            <span style={{ color, fontWeight: 600, padding: '3px 8px', borderRadius: '10px', background: bg, fontSize: '11px' }}>
              {text}
            </span>
          );
        }
      }] : []),
    ];

    const handleEdit = (rowIndex: number, columnKey: string, value: unknown) => {
      const newData = [...data];
      newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
      setData(newData);
      const log = `[${new Date().toLocaleTimeString()}] ${rowIndex + 1}행 "${columnKey}" → "${value}"`;
      setEditLog(prev => [log, ...prev].slice(0, 5));
    };

    const handleSort = (columnKey: string, direction: string | null) => {
      setSortInfo(direction ? { key: columnKey, direction } : null);
    };

    const addRow = () => {
      const newId = Math.max(...data.map(d => d.id)) + 1;
      setData([...data, {
        id: newId, name: `신입 ${newId}`, age: 25, email: `new${newId}@example.com`,
        department: '미정', salary: 3500000, joinDate: new Date(), isActive: true, status: 'pending',
      }]);
    };

    const removeLastRow = () => {
      if (data.length > 1) setData(data.slice(0, -1));
    };

    const resetData = () => {
      setData([
        { id: 1, name: '홍길동', age: 28, email: 'hong@example.com', department: '개발팀', salary: 4500000, joinDate: new Date('2022-03-15'), isActive: true, status: 'active' },
        { id: 2, name: '김철수', age: 32, email: 'kim@example.com', department: '디자인팀', salary: 5200000, joinDate: new Date('2021-07-01'), isActive: true, status: 'active' },
        { id: 3, name: '이영희', age: 26, email: 'lee@example.com', department: '기획팀', salary: 3800000, joinDate: new Date('2023-01-10'), isActive: false, status: 'inactive' },
      ]);
      setEditLog([]);
      setSortInfo(null);
    };

    const btnStyle = { padding: '6px 12px', borderRadius: '6px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '13px' };
    const activeBtnStyle = { ...btnStyle, background: '#3b82f6', color: 'white', border: '1px solid #3b82f6' };

    return (
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginRight: '8px' }}>옵션:</span>
              <button style={striped ? activeBtnStyle : btnStyle} onClick={() => setStriped(!striped)}>{striped ? '✓ ' : ''}줄무늬</button>
              <button style={showStatus ? activeBtnStyle : btnStyle} onClick={() => setShowStatus(!showStatus)}>{showStatus ? '✓ ' : ''}상태 컬럼</button>
              <select value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} style={{ ...btnStyle, minWidth: '120px' }}>
                <option value="">스크롤 없음</option>
                <option value="200px">200px</option>
                <option value="300px">300px</option>
                <option value="400px">400px</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginRight: '8px' }}>데이터:</span>
              <button style={btnStyle} onClick={addRow}>➕ 행 추가</button>
              <button style={btnStyle} onClick={removeLastRow}>➖ 삭제</button>
              <button style={{ ...btnStyle, color: '#dc2626' }} onClick={resetData}>🔄 초기화</button>
              <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>{data.length}개 행</span>
            </div>
          </div>
          <Table columns={columns} data={data} striped={striped} maxHeight={maxHeight || undefined} onCellEdit={handleEdit} onSort={handleSort} />
          <div style={{ marginTop: '16px', padding: '12px 16px', background: '#eff6ff', borderRadius: '8px', fontSize: '13px', color: '#1e40af' }}>
            <strong>💡 사용법:</strong> 셀 더블클릭 → 편집 | 헤더 클릭 → 정렬
          </div>
        </div>
        <div style={{ width: '220px', padding: '16px', background: '#f8fafc', borderRadius: '8px', fontSize: '13px', height: 'fit-content' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>📊 현재 상태</h4>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>정렬</div>
            <div style={{ padding: '8px', background: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              {sortInfo ? <span><strong>{sortInfo.key}</strong> {sortInfo.direction === 'asc' ? '⬆️' : '⬇️'}</span> : <span style={{ color: '#9ca3af' }}>없음</span>}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>최근 편집</div>
            <div style={{ padding: '8px', background: 'white', borderRadius: '4px', border: '1px solid #e5e7eb', maxHeight: '150px', overflow: 'auto' }}>
              {editLog.length > 0 ? editLog.map((log, i) => (
                <div key={i} style={{ fontSize: '11px', color: '#4b5563', padding: '4px 0', borderBottom: i < editLog.length - 1 ? '1px solid #f3f4f6' : 'none' }}>{log}</div>
              )) : <span style={{ color: '#9ca3af', fontSize: '12px' }}>없음</span>}
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>통계</div>
            <div style={{ padding: '8px', background: 'white', borderRadius: '4px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>총 인원</span><strong>{data.length}명</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>재직중</span><strong>{data.filter(d => d.isActive).length}명</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>평균 나이</span><strong>{(data.reduce((s, d) => s + d.age, 0) / data.length).toFixed(1)}세</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>평균 급여</span><strong>{(data.reduce((s, d) => s + d.salary, 0) / data.length / 10000).toFixed(0)}만원</strong></div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const BasicUsage: Story = {
  name: '📋 기본 사용법',
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
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

export const EditableTable: Story = {
  name: '✏️ 편집 가능',
  args: { columns: [], data: [] },
  render: () => {
    const [data, setData] = useState([
      { id: 1, name: '홍길동', korean: 85, english: 90, math: 95, total: 270, average: 90 },
      { id: 2, name: '김철수', korean: 92, english: 88, math: 85, total: 265, average: 88.3 },
      { id: 3, name: '이영희', korean: 88, english: 95, math: 92, total: 275, average: 91.7 },
      { id: 4, name: '박민수', korean: 90, english: 87, math: 88, total: 265, average: 88.3 },
    ]);

    const columns: TableColumn[] = [
      { key: 'id', header: 'No', width: '50px' },
      { key: 'name', header: '이름', width: '100px', editable: true },
      { key: 'korean', header: '국어', width: '80px', editable: true, dataType: 'number' },
      { key: 'english', header: '영어', width: '80px', editable: true, dataType: 'number' },
      { key: 'math', header: '수학', width: '80px', editable: true, dataType: 'number' },
      { key: 'total', header: '총점', width: '80px', dataType: 'number' },
      { key: 'average', header: '평균', width: '80px', render: (value) => (
        <span style={{ fontWeight: 600, color: Number(value) >= 90 ? '#22c55e' : Number(value) >= 80 ? '#3b82f6' : '#6b7280' }}>
          {Number(value).toFixed(1)}
        </span>
      )},
    ];

    const handleEdit = (rowIndex: number, columnKey: string, value: unknown) => {
      const newData = [...data];
      const row = { ...newData[rowIndex] };
      row[columnKey as keyof typeof row] = value as never;
      if (['korean', 'english', 'math'].includes(columnKey)) {
        row.total = Number(row.korean) + Number(row.english) + Number(row.math);
        row.average = Number((row.total / 3).toFixed(1));
      }
      newData[rowIndex] = row;
      setData(newData);
    };

    return (
      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>
          💡 셀 더블클릭으로 편집 | Enter 저장 | ESC 취소 | 성적 수정 시 총점/평균 자동 계산
        </p>
        <Table columns={columns} data={data} onCellEdit={handleEdit} />
      </div>
    );
  },
};

export const SortableTable: Story = {
  name: '🔄 정렬 가능',
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'rank', header: '순위', width: '60px', sortable: true, dataType: 'number' },
      { key: 'name', header: '이름', width: '100px', sortable: true },
      { key: 'score', header: '점수', width: '80px', sortable: true, dataType: 'number' },
      { key: 'time', header: '소요시간', width: '100px', sortable: true },
      { key: 'grade', header: '등급', width: '80px', sortable: true, render: (value) => {
        const colors: Record<string, string> = { A: '#22c55e', B: '#3b82f6', C: '#f59e0b', D: '#ef4444' };
        return <span style={{ color: colors[value as string] || '#6b7280', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: `${colors[value as string]}15` }}>{String(value)}</span>;
      }},
    ];

    const data = [
      { rank: 1, name: '홍길동', score: 98, time: '45분', grade: 'A' },
      { rank: 2, name: '김철수', score: 95, time: '52분', grade: 'A' },
      { rank: 3, name: '이영희', score: 89, time: '48분', grade: 'B' },
      { rank: 4, name: '박민수', score: 85, time: '55분', grade: 'B' },
      { rank: 5, name: '정수진', score: 78, time: '60분', grade: 'C' },
      { rank: 6, name: '최동현', score: 72, time: '58분', grade: 'C' },
      { rank: 7, name: '강지연', score: 65, time: '62분', grade: 'D' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>💡 헤더 클릭으로 정렬 (오름차순 → 내림차순 → 해제)</p>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

export const CustomRendering: Story = {
  name: '🎨 커스텀 렌더링',
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'name', header: '프로젝트', width: '150px' },
      { key: 'status', header: '상태', width: '100px', render: (value) => {
        const map: Record<string, { color: string; text: string }> = {
          active: { color: '#22c55e', text: '진행중' },
          pending: { color: '#f59e0b', text: '대기' },
          completed: { color: '#3b82f6', text: '완료' },
          cancelled: { color: '#ef4444', text: '취소' },
        };
        const { color, text } = map[value as string] || { color: '#6b7280', text: value };
        return <span style={{ color, fontWeight: 600, padding: '4px 10px', borderRadius: '12px', background: `${color}15`, fontSize: '12px' }}>{text}</span>;
      }},
      { key: 'progress', header: '진행률', width: '180px', render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, height: '100%', background: Number(value) === 100 ? '#22c55e' : '#3b82f6', borderRadius: '3px' }} />
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '36px' }}>{String(value)}%</span>
        </div>
      )},
      { key: 'priority', header: '우선순위', width: '100px', render: (value) => {
        const icons: Record<string, string> = { high: '🔴', medium: '🟡', low: '🟢' };
        const texts: Record<string, string> = { high: '높음', medium: '보통', low: '낮음' };
        return <span style={{ fontSize: '13px' }}>{icons[value as string]} {texts[value as string]}</span>;
      }},
      { key: 'actions', header: '', width: '100px', render: (_, row) => (
        <button style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '12px' }} onClick={() => alert(`${row.name} 상세보기`)}>상세보기</button>
      )},
    ];

    const data = [
      { name: '디자인 시스템 구축', status: 'active', progress: 75, priority: 'high', actions: null },
      { name: 'API 리팩토링', status: 'pending', progress: 30, priority: 'medium', actions: null },
      { name: '사용자 인증 개선', status: 'completed', progress: 100, priority: 'high', actions: null },
      { name: '성능 최적화', status: 'active', progress: 45, priority: 'low', actions: null },
      { name: '문서화 작업', status: 'cancelled', progress: 10, priority: 'low', actions: null },
    ];

    return (
      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>💡 render 함수로 배지, 프로그레스바, 버튼 등 커스텀 UI 구현</p>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

export const Timetable: Story = {
  name: '📅 시간표',
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'period', header: '교시', width: '80px', isHeaderColumn: true, height: '50px' },
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
      <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', fontFamily: "'Pretendard GOV', sans-serif" }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '80px', height: '30px', background: '#eef2f7', border: '1px solid #d6e0eb', borderBottom: 'none', boxSizing: 'border-box' }} />
          <div style={{ flex: 1, height: '30px', background: '#eef2f7', border: '1px solid #d6e0eb', borderLeft: 'none', borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: '#131416', boxSizing: 'border-box' }}>강원석 시간표</div>
        </div>
        <Table columns={columns} data={data} />
      </div>
    );
  },
};

export const SelectableList: Story = {
  name: '✅ 선택 가능 목록',
  args: { columns: [], data: [] },
  render: () => {
    const [selectedRow, setSelectedRow] = useState<number>(0);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const columns = [
      { key: 'no', header: '번호', width: '60px' },
      { key: 'filename', header: '파일명' },
      { key: 'modifiedDate', header: '변경일자', width: '120px' },
      { key: 'school', header: '학교명' },
      { key: 'classCount', header: '학급', width: '70px' },
      { key: 'teacherCount', header: '교사', width: '70px' },
    ];

    const data = [
      { no: '01', filename: '2025학년도 2학기 시간표(실습)', modifiedDate: '2025-11-05', school: '대구SW마이스터고', classCount: '12', teacherCount: '0' },
      { no: '02', filename: '2025학년도 1학기 시간표', modifiedDate: '2025-03-02', school: '대구SW마이스터고', classCount: '12', teacherCount: '45' },
      { no: '03', filename: '2024학년도 2학기 시간표', modifiedDate: '2024-09-01', school: '대구SW마이스터고', classCount: '11', teacherCount: '42' },
      { no: '04', filename: '2024학년도 1학기 시간표', modifiedDate: '2024-03-04', school: '대구SW마이스터고', classCount: '11', teacherCount: '40' },
      { no: '05', filename: '테스트 시간표', modifiedDate: '2024-01-15', school: '테스트학교', classCount: '6', teacherCount: '20' },
    ];

    const getRowBg = (i: number) => selectedRow === i ? '#e7f4fe' : hoveredRow === i ? '#f4f5f6' : '#ffffff';

    return (
      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>💡 호버: #f4f5f6 | 선택: #e7f4fe | 현재 선택: {selectedRow + 1}번 행</p>
        <div style={{ width: '700px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Pretendard GOV', sans-serif" }}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} style={{ background: '#eef2f7', border: '1px solid #d6e0eb', padding: '8px 16px', textAlign: 'left', fontWeight: 700, fontSize: '14px', color: '#131416', height: '36px', boxSizing: 'border-box', width: col.width }}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} onClick={() => setSelectedRow(i)} onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)} style={{ cursor: 'pointer' }}>
                  {columns.map((col) => (
                    <td key={col.key} style={{ background: getRowBg(i), border: '1px solid #cdd1d5', padding: '10px 16px', fontSize: '13px', color: '#464c53', height: '36px', boxSizing: 'border-box', width: col.width, whiteSpace: 'nowrap', transition: 'background-color 0.15s ease' }}>{row[col.key as keyof typeof row]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};

export const ScrollableTable: Story = {
  name: '📊 스크롤 테이블',
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'id', header: 'ID', width: '60px', sortable: true, dataType: 'number' },
      { key: 'name', header: '이름', width: '100px', sortable: true },
      { key: 'department', header: '부서', width: '100px', sortable: true },
      { key: 'position', header: '직급', width: '80px' },
      { key: 'email', header: '이메일', width: '180px' },
      { key: 'phone', header: '연락처', width: '120px' },
    ];

    const departments = ['개발팀', '디자인팀', '기획팀', '영업팀', '인사팀', '마케팅팀'];
    const positions = ['사원', '대리', '과장', '차장', '부장'];
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `직원 ${i + 1}`,
      department: departments[i % departments.length],
      position: positions[i % positions.length],
      email: `employee${i + 1}@company.com`,
      phone: `010-${String(1000 + i).slice(-4)}-${String(5000 + i).slice(-4)}`,
    }));

    return (
      <div>
        <p style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>💡 maxHeight="400px" | 50개 행 | striped 적용</p>
        <Table columns={columns} data={data} maxHeight="400px" striped />
      </div>
    );
  },
};
