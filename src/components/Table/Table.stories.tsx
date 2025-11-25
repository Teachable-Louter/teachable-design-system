import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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

유연하고 커스터마이징 가능한 테이블 컴포넌트입니다.

## 주요 기능
- ✅ **셀 편집** - 더블클릭으로 인라인 편집
- ✅ **정렬** - 헤더 클릭으로 오름차순/내림차순
- ✅ **다양한 데이터 타입** - text, number, date, boolean 지원
- ✅ **커스텀 렌더링** - render 함수로 자유로운 UI 구성
- ✅ **스크롤** - maxHeight로 고정 높이 스크롤
- ✅ **헤더 컬럼** - isHeaderColumn으로 좌측 열 강조
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: '테이블 컬럼 정의',
      table: {
        type: { 
          summary: 'TableColumn[]',
          detail: `{
  key: string;           // 데이터 키
  header: string;        // 헤더 텍스트
  width?: string;        // 너비 (예: '100px')
  height?: string;       // 셀 높이
  editable?: boolean;    // 편집 가능 여부
  sortable?: boolean;    // 정렬 가능 여부
  dataType?: DataType;   // 데이터 타입
  isHeaderColumn?: boolean; // 헤더 스타일 적용
  render?: (value, row, rowIndex) => ReactNode; // 커스텀 렌더
}`
        },
      },
    },
    data: {
      control: 'object',
      description: '테이블 데이터 배열',
    },
    maxHeight: {
      control: 'text',
      description: '최대 높이 (스크롤 활성화)',
    },
    striped: {
      control: 'boolean',
      description: '줄무늬 스타일',
    },
    onCellEdit: {
      action: 'cell-edited',
      description: '셀 편집 콜백',
    },
    onSort: {
      action: 'sorted',
      description: '정렬 콜백',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// 🎮 Playground - 모든 기능을 직접 체험
// ============================================================
export const Playground: Story = {
  name: '🎮 Playground',
  args: { columns: [], data: [] },
  render: () => {
    // 옵션 상태
    const [striped, setStriped] = useState(false);
    const [maxHeight, setMaxHeight] = useState('');
    const [showStatus, setShowStatus] = useState(true);
    const [editLog, setEditLog] = useState<string[]>([]);
    const [sortInfo, setSortInfo] = useState<{ key: string; direction: string } | null>(null);
    
    // 데이터 상태
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

    // 컬럼 정의 (모든 기능 포함)
    const columns: TableColumn[] = [
      { 
        key: 'id', 
        header: 'ID', 
        width: '50px', 
        sortable: true, 
        dataType: 'number',
        isHeaderColumn: false,
      },
      { 
        key: 'name', 
        header: '이름', 
        width: '90px', 
        editable: true, 
        sortable: true,
      },
      { 
        key: 'age', 
        header: '나이', 
        width: '70px', 
        editable: true, 
        sortable: true, 
        dataType: 'number',
      },
      { 
        key: 'department', 
        header: '부서', 
        width: '90px', 
        sortable: true,
        editable: true,
      },
      { 
        key: 'salary', 
        header: '급여', 
        width: '110px', 
        sortable: true, 
        dataType: 'number',
        editable: true,
      },
      { 
        key: 'email', 
        header: '이메일', 
        width: '170px', 
        editable: true,
      },
      { 
        key: 'joinDate', 
        header: '입사일', 
        width: '110px', 
        dataType: 'date', 
        sortable: true,
      },
      { 
        key: 'isActive', 
        header: '재직', 
        width: '70px', 
        dataType: 'boolean',
        sortable: true,
      },
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
            <span style={{ 
              color, 
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '10px',
              background: bg,
              fontSize: '11px',
            }}>
              {text}
            </span>
          );
        }
      }] : []),
    ];

    // 편집 핸들러
    const handleEdit = (rowIndex: number, columnKey: string, value: unknown) => {
      const newData = [...data];
      newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
      setData(newData);
      
      const log = `[${new Date().toLocaleTimeString()}] ${rowIndex + 1}행 "${columnKey}" → "${value}"`;
      setEditLog(prev => [log, ...prev].slice(0, 5));
    };

    // 정렬 핸들러
    const handleSort = (columnKey: string, direction: string | null) => {
      setSortInfo(direction ? { key: columnKey, direction } : null);
    };

    // 행 추가
    const addRow = () => {
      const newId = Math.max(...data.map(d => d.id)) + 1;
      setData([...data, {
        id: newId,
        name: `신입 ${newId}`,
        age: 25,
        email: `new${newId}@example.com`,
        department: '미정',
        salary: 3500000,
        joinDate: new Date(),
        isActive: true,
        status: 'pending',
      }]);
    };

    // 마지막 행 삭제
    const removeLastRow = () => {
      if (data.length > 1) {
        setData(data.slice(0, -1));
      }
    };

    // 데이터 초기화
    const resetData = () => {
      setData([
        { id: 1, name: '홍길동', age: 28, email: 'hong@example.com', department: '개발팀', salary: 4500000, joinDate: new Date('2022-03-15'), isActive: true, status: 'active' },
        { id: 2, name: '김철수', age: 32, email: 'kim@example.com', department: '디자인팀', salary: 5200000, joinDate: new Date('2021-07-01'), isActive: true, status: 'active' },
        { id: 3, name: '이영희', age: 26, email: 'lee@example.com', department: '기획팀', salary: 3800000, joinDate: new Date('2023-01-10'), isActive: false, status: 'inactive' },
      ]);
      setEditLog([]);
      setSortInfo(null);
    };

    const buttonStyle = {
      padding: '6px 12px',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      background: 'white',
      cursor: 'pointer',
      fontSize: '13px',
      transition: 'all 0.15s',
    };

    const activeButtonStyle = {
      ...buttonStyle,
      background: '#3b82f6',
      color: 'white',
      border: '1px solid #3b82f6',
    };

    return (
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* 메인 테이블 영역 */}
        <div style={{ flex: 1 }}>
          {/* 컨트롤 패널 */}
          <div style={{ 
            marginBottom: '16px', 
            padding: '16px', 
            background: '#f8fafc', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {/* 옵션 토글 */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginRight: '8px' }}>옵션:</span>
              <button 
                style={striped ? activeButtonStyle : buttonStyle}
                onClick={() => setStriped(!striped)}
              >
                {striped ? '✓ ' : ''}줄무늬
              </button>
              <button 
                style={showStatus ? activeButtonStyle : buttonStyle}
                onClick={() => setShowStatus(!showStatus)}
              >
                {showStatus ? '✓ ' : ''}상태 컬럼
              </button>
              <select 
                value={maxHeight}
                onChange={(e) => setMaxHeight(e.target.value)}
                style={{ ...buttonStyle, minWidth: '120px' }}
              >
                <option value="">스크롤 없음</option>
                <option value="200px">200px 스크롤</option>
                <option value="300px">300px 스크롤</option>
                <option value="400px">400px 스크롤</option>
              </select>
            </div>

            {/* 데이터 조작 */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginRight: '8px' }}>데이터:</span>
              <button style={buttonStyle} onClick={addRow}>➕ 행 추가</button>
              <button style={buttonStyle} onClick={removeLastRow}>➖ 마지막 행 삭제</button>
              <button style={{ ...buttonStyle, color: '#dc2626' }} onClick={resetData}>🔄 초기화</button>
              <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
                현재 {data.length}개 행
              </span>
            </div>
          </div>

          {/* 테이블 */}
          <Table 
            columns={columns} 
            data={data} 
            striped={striped}
            maxHeight={maxHeight || undefined}
            onCellEdit={handleEdit}
            onSort={handleSort}
          />

          {/* 사용법 안내 */}
          <div style={{ 
            marginTop: '16px', 
            padding: '12px 16px', 
            background: '#eff6ff', 
            borderRadius: '8px',
            fontSize: '13px',
            color: '#1e40af',
          }}>
            <strong>💡 사용법:</strong> 셀 더블클릭으로 편집 | 헤더 클릭으로 정렬 | 위 옵션으로 기능 토글
          </div>
        </div>

        {/* 사이드 패널 - 상태 정보 */}
        <div style={{ 
          width: '220px', 
          padding: '16px', 
          background: '#f8fafc', 
          borderRadius: '8px',
          fontSize: '13px',
          height: 'fit-content',
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>📊 현재 상태</h4>
          
          {/* 정렬 상태 */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>정렬</div>
            <div style={{ 
              padding: '8px', 
              background: 'white', 
              borderRadius: '4px', 
              border: '1px solid #e5e7eb' 
            }}>
              {sortInfo ? (
                <span>
                  <strong>{sortInfo.key}</strong> {sortInfo.direction === 'asc' ? '⬆️ 오름차순' : '⬇️ 내림차순'}
                </span>
              ) : (
                <span style={{ color: '#9ca3af' }}>정렬 없음</span>
              )}
            </div>
          </div>

          {/* 편집 로그 */}
          <div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>최근 편집</div>
            <div style={{ 
              padding: '8px', 
              background: 'white', 
              borderRadius: '4px', 
              border: '1px solid #e5e7eb',
              maxHeight: '150px',
              overflow: 'auto',
            }}>
              {editLog.length > 0 ? (
                editLog.map((log, i) => (
                  <div key={i} style={{ 
                    fontSize: '11px', 
                    color: '#4b5563',
                    padding: '4px 0',
                    borderBottom: i < editLog.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}>
                    {log}
                  </div>
                ))
              ) : (
                <span style={{ color: '#9ca3af', fontSize: '12px' }}>편집 기록 없음</span>
              )}
            </div>
          </div>

          {/* 통계 */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>통계</div>
            <div style={{ 
              padding: '8px', 
              background: 'white', 
              borderRadius: '4px', 
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>총 인원</span>
                <strong>{data.length}명</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>재직중</span>
                <strong>{data.filter(d => d.isActive).length}명</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>평균 나이</span>
                <strong>{(data.reduce((sum, d) => sum + d.age, 0) / data.length).toFixed(1)}세</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span>평균 급여</span>
                <strong>{(data.reduce((sum, d) => sum + d.salary, 0) / data.length / 10000).toFixed(0)}만원</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### 🎮 모든 기능을 직접 체험해보세요!

**테이블 기능:**
- 📝 셀 더블클릭 → 인라인 편집 (이름, 나이, 부서, 급여, 이메일)
- 🔄 헤더 클릭 → 정렬 (오름차순 → 내림차순 → 해제)
- 📅 날짜 자동 포맷 (YYYY.MM.DD)
- ✓/✗ Boolean 표시 (예/아니오)
- 🏷️ 상태 배지 커스텀 렌더링

**컨트롤 패널:**
- 줄무늬 / 상태 컬럼 토글
- 스크롤 높이 설정
- 행 추가 / 삭제 / 초기화

**사이드 패널:**
- 현재 정렬 상태
- 편집 로그
- 실시간 통계
        `,
      },
    },
  },
};

// ============================================================
// 📋 기본 사용법
// ============================================================
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
  parameters: {
    docs: {
      description: {
        story: `
### 가장 기본적인 테이블

\`\`\`tsx
<Table
  columns={[
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'name', header: '이름', width: '120px' },
    { key: 'email', header: '이메일' },
  ]}
  data={[
    { id: 1, name: '홍길동', email: 'hong@example.com' },
    { id: 2, name: '김철수', email: 'kim@example.com' },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
};

// ============================================================
// ✏️ 편집 가능 테이블
// ============================================================
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
      { 
        key: 'average', 
        header: '평균', 
        width: '80px',
        render: (value) => (
          <span style={{ 
            fontWeight: 600, 
            color: Number(value) >= 90 ? '#22c55e' : Number(value) >= 80 ? '#3b82f6' : '#6b7280' 
          }}>
            {Number(value).toFixed(1)}
          </span>
        )
      },
    ];

    const handleEdit = (rowIndex: number, columnKey: string, value: unknown) => {
      const newData = [...data];
      const row = { ...newData[rowIndex] };
      row[columnKey as keyof typeof row] = value as never;
      
      // 성적 변경 시 총점/평균 자동 계산
      if (['korean', 'english', 'math'].includes(columnKey)) {
        row.total = Number(row.korean) + Number(row.english) + Number(row.math);
        row.average = Number((row.total / 3).toFixed(1));
      }
      
      newData[rowIndex] = row;
      setData(newData);
    };

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
          <strong>💡 사용법</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#64748b' }}>
            <li>셀을 <strong>더블클릭</strong>하여 편집 모드 진입</li>
            <li><strong>Enter</strong>로 저장, <strong>ESC</strong>로 취소</li>
            <li>성적 수정 시 총점/평균 자동 계산</li>
          </ul>
        </div>
        <Table columns={columns} data={data} onCellEdit={handleEdit} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### 인라인 편집 기능

- \`editable: true\` 설정으로 셀 편집 활성화
- \`onCellEdit\` 콜백으로 변경사항 처리
- 계산 필드 자동 업데이트 예시 포함
        `,
      },
    },
  },
};

// ============================================================
// 🔄 정렬 가능 테이블
// ============================================================
export const SortableTable: Story = {
  name: '🔄 정렬 가능',
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'rank', header: '순위', width: '60px', sortable: true, dataType: 'number' },
      { key: 'name', header: '이름', width: '100px', sortable: true },
      { key: 'score', header: '점수', width: '80px', sortable: true, dataType: 'number' },
      { key: 'time', header: '소요시간', width: '100px', sortable: true },
      { 
        key: 'grade', 
        header: '등급', 
        width: '80px', 
        sortable: true,
        render: (value) => {
          const colors: Record<string, string> = { A: '#22c55e', B: '#3b82f6', C: '#f59e0b', D: '#ef4444' };
          return (
            <span style={{ 
              color: colors[value as string] || '#6b7280',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '4px',
              background: `${colors[value as string]}15` || '#f1f5f9'
            }}>
              {String(value)}
            </span>
          );
        }
      },
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
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
          <strong>💡 사용법</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#64748b' }}>
            <li>헤더를 <strong>클릭</strong>하여 정렬</li>
            <li>정렬 순서: 오름차순 → 내림차순 → 해제</li>
            <li>숫자, 문자열 자동 정렬 지원</li>
          </ul>
        </div>
        <Table 
          columns={columns} 
          data={data}
          onSort={(key, dir) => console.log(`정렬: ${key} ${dir}`)} 
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### 헤더 클릭으로 정렬

- \`sortable: true\` 설정으로 정렬 활성화
- \`dataType\`에 따라 정렬 방식 자동 결정
- 커스텀 정렬: \`sortFn: (a, b) => number\`
        `,
      },
    },
  },
};

// ============================================================
// 🎨 커스텀 렌더링
// ============================================================
export const CustomRendering: Story = {
  name: '🎨 커스텀 렌더링',
  args: { columns: [], data: [] },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'name', header: '프로젝트', width: '150px' },
      { 
        key: 'status', 
        header: '상태', 
        width: '100px', 
        render: (value) => {
          const statusMap: Record<string, { color: string; text: string }> = {
            active: { color: '#22c55e', text: '진행중' },
            pending: { color: '#f59e0b', text: '대기' },
            completed: { color: '#3b82f6', text: '완료' },
            cancelled: { color: '#ef4444', text: '취소' },
          };
          const { color, text } = statusMap[value as string] || { color: '#6b7280', text: value };
          return (
            <span style={{ 
              color, 
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '12px',
              background: `${color}15`,
              fontSize: '12px',
            }}>
              {text}
            </span>
          );
        }
      },
      { 
        key: 'progress', 
        header: '진행률', 
        width: '180px',
        render: (value) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              flex: 1, 
              height: '6px', 
              background: '#e5e7eb', 
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${value}%`, 
                height: '100%', 
                background: Number(value) === 100 ? '#22c55e' : '#3b82f6',
                borderRadius: '3px',
                transition: 'width 0.3s'
              }} />
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '36px' }}>
              {String(value)}%
            </span>
          </div>
        )
      },
      { 
        key: 'priority', 
        header: '우선순위', 
        width: '100px',
        render: (value) => {
          const icons: Record<string, string> = { high: '🔴', medium: '🟡', low: '🟢' };
          const texts: Record<string, string> = { high: '높음', medium: '보통', low: '낮음' };
          return (
            <span style={{ fontSize: '13px' }}>
              {icons[value as string]} {texts[value as string]}
            </span>
          );
        }
      },
      { 
        key: 'actions', 
        header: '', 
        width: '100px',
        render: (_, row) => (
          <button 
            style={{ 
              padding: '4px 12px', 
              borderRadius: '4px',
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.15s',
            }}
            onClick={() => alert(`${row.name} 상세보기`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.color = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = 'inherit';
            }}
          >
            상세보기
          </button>
        )
      },
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
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
          <strong>💡 커스텀 렌더링 예시</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#64748b' }}>
            <li><strong>상태</strong>: 배지 스타일</li>
            <li><strong>진행률</strong>: 프로그레스 바</li>
            <li><strong>우선순위</strong>: 이모지 + 텍스트</li>
            <li><strong>액션</strong>: 인터랙티브 버튼</li>
          </ul>
        </div>
        <Table columns={columns} data={data} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### render 함수로 자유로운 UI 구성

\`\`\`tsx
{
  key: 'status',
  header: '상태',
  render: (value, row, rowIndex) => (
    <CustomComponent value={value} />
  )
}
\`\`\`
        `,
      },
    },
  },
};

// ============================================================
// 📅 시간표 (실제 활용 예시)
// ============================================================
export const Timetable: Story = {
  name: '📅 시간표',
  args: { columns: [], data: [] },
  render: () => {
    const styles = {
      wrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: 'fit-content',
        fontFamily: "'Pretendard GOV', sans-serif",
      },
      titleRow: {
        display: 'flex',
      },
      emptyCell: {
        width: '80px',
        height: '30px',
        background: '#eef2f7',
        border: '1px solid #d6e0eb',
        borderBottom: 'none',
        boxSizing: 'border-box' as const,
      },
      titleCell: {
        flex: 1,
        height: '30px',
        background: '#eef2f7',
        border: '1px solid #d6e0eb',
        borderLeft: 'none',
        borderBottom: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '15px',
        fontWeight: 700,
        color: '#131416',
        boxSizing: 'border-box' as const,
      },
    };

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
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
          <strong>💡 시간표 구현 포인트</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#64748b' }}>
            <li><strong>isHeaderColumn: true</strong> → 교시 열 헤더 스타일</li>
            <li><strong>height: '50px'</strong> → 셀 높이 지정</li>
            <li>상단 타이틀 행은 별도 구현</li>
          </ul>
        </div>
        <div style={styles.wrapper}>
          <div style={styles.titleRow}>
            <div style={styles.emptyCell} />
            <div style={styles.titleCell}>강원석 시간표</div>
          </div>
          <Table columns={columns} data={data} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Figma 디자인 기반 시간표

\`isHeaderColumn\` 속성으로 좌측 열을 헤더 스타일로 표시합니다.
        `,
      },
    },
  },
};

// ============================================================
// ✅ 선택 가능한 목록
// ============================================================
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

    const getRowBackground = (rowIndex: number): string => {
      if (selectedRow === rowIndex) return '#e7f4fe';
      if (hoveredRow === rowIndex) return '#f4f5f6';
      return '#ffffff';
    };

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
          <strong>💡 인터랙션</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#64748b' }}>
            <li><strong>호버</strong>: 배경색 #f4f5f6 (gray-subtler)</li>
            <li><strong>선택</strong>: 배경색 #e7f4fe (information-subtler)</li>
            <li>현재 선택: <strong>{selectedRow + 1}번</strong> 행</li>
          </ul>
        </div>
        <div style={{ width: '700px' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontFamily: "'Pretendard GOV', sans-serif",
          }}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      background: '#eef2f7',
                      border: '1px solid #d6e0eb',
                      padding: '8px 16px',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#131416',
                      height: '36px',
                      boxSizing: 'border-box',
                      width: col.width,
                    }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => setSelectedRow(rowIndex)}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        background: getRowBackground(rowIndex),
                        border: '1px solid #cdd1d5',
                        padding: '10px 16px',
                        fontSize: '13px',
                        color: '#464c53',
                        height: '36px',
                        boxSizing: 'border-box',
                        width: col.width,
                        whiteSpace: 'nowrap',
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      {row[col.key as keyof typeof row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### 행 선택 + 호버 효과

Figma 디자인 가이드 기반:
- 호버: \`#f4f5f6\`
- 선택: \`#e7f4fe\`
        `,
      },
    },
  },
};

// ============================================================
// 📊 스크롤 + 대용량 데이터
// ============================================================
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
        <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
          <strong>💡 대용량 데이터 처리</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', color: '#64748b' }}>
            <li><strong>maxHeight="400px"</strong> → 스크롤 활성화</li>
            <li>50개 행 렌더링 (성능 최적화 적용)</li>
            <li>헤더 클릭으로 정렬 가능</li>
          </ul>
        </div>
        <Table columns={columns} data={data} maxHeight="400px" striped />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### 스크롤 가능한 대용량 테이블

\`maxHeight\` 속성으로 고정 높이를 설정하면 자동으로 스크롤이 활성화됩니다.
\`striped\` 속성으로 줄무늬 스타일을 적용할 수 있습니다.
        `,
      },
    },
  },
};
