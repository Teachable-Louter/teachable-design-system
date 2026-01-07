# Table 컴포넌트 사용 가이드

## 설치

```bash
npm install teachable-design-system
```

## 기본 사용법

### Import

```tsx
import { Table } from 'teachable-design-system';
import type { TableColumn, TableStyleConfig } from 'teachable-design-system';
```

### 기본 예제

```tsx
import React from 'react';
import { Table } from 'teachable-design-system';
import type { TableColumn } from 'teachable-design-system';

interface UserData {
  id: number;
  name: string;
}

function App() {
  const columns: TableColumn<UserData>[] = [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'name', header: '이름', width: '120px' },
  ];

  const data: UserData[] = [
    { id: 1, name: '홍길동' },
    { id: 2, name: '김철수' },
  ];

  return (
    <Table<UserData>
      columns={columns}
      data={data}
    />
  );
}
```

---

## Props

### TableProps

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `columns` | `TableColumn<T>[]` | **필수** | 테이블 컬럼 정의 배열 |
| `data` | `TableRow<T>[]` | **필수** | 테이블 데이터 배열 |
| `title` | `string` | - | 테이블 제목 |
| `onTitleChange` | `(title: string) => void` | - | 제목 변경 콜백 |
| `onTitleDelete` | `() => void` | - | 제목 삭제 콜백 |
| `onCellEdit` | `(rowIndex, columnKey, value) => void` | - | 셀 편집 콜백 |
| `onSort` | `(columnKey, direction) => void` | - | 정렬 콜백 |
| `onSelectionChange` | `(cells) => void` | - | 셀 선택 변경 콜백 |
| `onPaste` | `(startRow, startCol, values) => void` | - | 붙여넣기 콜백 |
| `maxHeight` | `string` | - | 최대 높이 (스크롤 활성화) |
| `rowHeight` | `string` | `'30px'` | 행 높이 (deprecated: styleConfig 사용 권장) |
| `striped` | `boolean` | `false` | 줄무늬 스타일 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `enableRowSelection` | `boolean` | `false` | 행 선택 활성화 |
| `selectedRowIndex` | `number` | - | 선택된 행 인덱스 |
| `onRowClick` | `(rowIndex, row) => void` | - | 행 클릭 콜백 |
| `enableKeyboardNavigation` | `boolean` | `false` | 키보드 네비게이션 (↑↓) |
| `showAssignButton` | `boolean` | `false` | 보강배정하기 버튼 표시 |
| `onAssignClick` | `(cells: CellPosition[]) => void` | - | 보강배정하기 버튼 클릭 콜백 |
| `styleConfig` | `TableStyleConfig` | - | 스타일 설정 객체 |

### TableColumn

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `key` | `keyof T` | **필수** | 컬럼 고유 키 |
| `header` | `string` | **필수** | 헤더 텍스트 |
| `width` | `string` | - | 컬럼 너비 (예: '100px', '20%') |
| `editable` | `boolean` | `true` | 편집 가능 여부 |
| `height` | `string` | - | 셀 높이 |
| `dataType` | `DataType` | `'text'` | 데이터 타입 |
| `sortable` | `boolean` | `false` | 정렬 가능 여부 |
| `isHeaderColumn` | `boolean` | `false` | 헤더 스타일 적용 (좌측 열 강조) |
| `rowSpan` | `number` | - | 행 병합 수 |
| `colSpan` | `number` | - | 열 병합 수 |
| `render` | `(value, row, rowIndex) => ReactNode` | - | 커스텀 렌더링 |
| `sortFn` | `(a, b) => number` | - | 커스텀 정렬 함수 |
| `backgroundColor` | `string` | - | 컬럼 배경색 |
| `hoverBackgroundColor` | `string` | - | 셀 호버 시 배경색 |
| `selectedBackgroundColor` | `string` | - | 셀 선택 시 배경색 |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | 텍스트 정렬 |

### TableStyleConfig (NEW in v0.4.0)

전체 테이블 스타일을 한번에 설정할 수 있는 객체입니다.

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `headerHeight` | `string` | `'30px'` | 헤더 행 높이 |
| `bodyRowHeight` | `string` | `'30px'` | 바디 행 높이 |
| `fontFamily` | `string` | - | 폰트 패밀리 |
| `headerFontSize` | `string` | `'14px'` | 헤더 폰트 크기 |
| `bodyFontSize` | `string` | `'14px'` | 바디 폰트 크기 |
| `headerBackgroundColor` | `string` | `'#f5f5f5'` | 헤더 배경색 |
| `headerTextColor` | `string` | `'#333'` | 헤더 텍스트 색상 |
| `bodyBackgroundColor` | `string` | `'#fff'` | 바디 배경색 |
| `bodyTextColor` | `string` | `'#333'` | 바디 텍스트 색상 |
| `borderColor` | `string` | `'#e0e0e0'` | 테두리 색상 |
| `hoverBackgroundColor` | `string` | `'#f0f0f0'` | 호버 시 배경색 |
| `selectedBackgroundColor` | `string` | `'#e3f2fd'` | 선택 시 배경색 |
| `selectedBorderColor` | `string` | `'#1976d2'` | 선택 시 테두리 색상 |

### DataType

- `'text'`: 텍스트
- `'number'`: 숫자
- `'date'`: 날짜
- `'boolean'`: 불리언 (예/아니오로 표시)
- `'custom'`: 커스텀

---

## 사용 예제

### 1. 기본 테이블

```tsx
const columns: TableColumn[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'name', header: '이름', width: '120px' },
];

const data = [
  { id: 1, name: '홍길동' },
  { id: 2, name: '김철수' },
];

<Table columns={columns} data={data} />
```

### 2. 제목이 있는 테이블 (NEW in v0.4.0)

```tsx
import React, { useState } from 'react';
import { Table } from 'teachable-design-system';

function TitleTable() {
  const [title, setTitle] = useState('1학년 1반 시간표');
  const [data, setData] = useState([...]);

  const columns = [...];

  return (
    <Table
      columns={columns}
      data={data}
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      onTitleDelete={() => setTitle('')}
    />
  );
}
```

### 3. styleConfig를 사용한 스타일 커스터마이징 (NEW in v0.4.0)

```tsx
import { Table } from 'teachable-design-system';
import type { TableStyleConfig } from 'teachable-design-system';

function StyledTable() {
  const styleConfig: TableStyleConfig = {
    headerHeight: '48px',
    bodyRowHeight: '40px',
    fontFamily: 'Georgia, serif',
    headerFontSize: '14px',
    bodyFontSize: '13px',
    headerBackgroundColor: '#1e40af',
    headerTextColor: '#ffffff',
    bodyTextColor: '#1f2937',
    borderColor: '#1e40af',
    hoverBackgroundColor: '#dbeafe',
    selectedBackgroundColor: '#93c5fd',
    selectedBorderColor: '#1e40af',
  };

  return (
    <Table
      columns={columns}
      data={data}
      styleConfig={styleConfig}
    />
  );
}
```

### 4. 보강배정하기 버튼 (NEW in v0.4.0)

```tsx
function AssignTable() {
  return (
    <Table
      columns={columns}
      data={data}
      showAssignButton={true}
      onAssignClick={(cells) => {
        console.log('보강배정할 셀:', cells);
        // 보강배정 로직 실행
      }}
    />
  );
}
```

### 5. 컬럼별 호버/선택 색상 설정 (NEW in v0.4.0)

```tsx
const columns: TableColumn[] = [
  { key: 'id', header: 'ID', width: '60px', editable: false },
  { key: 'normal', header: '기본', width: '120px' },
  { 
    key: 'custom', 
    header: '커스텀 색상', 
    width: '120px',
    hoverBackgroundColor: '#fef3c7',
    selectedBackgroundColor: '#fde68a',
  },
  { 
    key: 'highlight', 
    header: '하이라이트', 
    width: '120px',
    hoverBackgroundColor: '#dcfce7',
    selectedBackgroundColor: '#bbf7d0',
  },
];
```

### 6. 행 선택 가능한 테이블

```tsx
import React, { useState } from 'react';
import { Table } from 'teachable-design-system';

interface FileData {
  no: string;
  filename: string;
  modifiedDate: string;
}

function FileSelectTable() {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const columns: TableColumn<FileData>[] = [
    { key: 'no', header: '번호', width: '80px' },
    { key: 'filename', header: '파일명', width: '300px' },
    { key: 'modifiedDate', header: '변경일자', width: '140px' },
  ];

  const data: FileData[] = [
    { no: '01', filename: '2025학년도 2학기 시간표', modifiedDate: '2025-11-05' },
    { no: '02', filename: '2025학년도 1학기 시간표', modifiedDate: '2025-03-01' },
  ];

  return (
    <Table<FileData>
      columns={columns}
      data={data}
      enableRowSelection
      enableKeyboardNavigation
      selectedRowIndex={selectedRow}
      onRowClick={(rowIndex) => setSelectedRow(rowIndex)}
    />
  );
}
```

### 7. 편집 가능한 테이블 (editable: false 설정)

```tsx
import React, { useState } from 'react';
import { Table } from 'teachable-design-system';

interface EditRow {
  id: number;
  name: string;
  score: number;
}

function EditableTable() {
  const [data, setData] = useState<EditRow[]>([
    { id: 1, name: '홍길동', score: 90 },
    { id: 2, name: '김철수', score: 75 },
  ]);

  const columns: TableColumn<EditRow>[] = [
    { 
      key: 'id', 
      header: 'ID', 
      width: '60px', 
      editable: false,  // 편집 불가, 선택/드래그도 불가
      dataType: 'number' 
    },
    { key: 'name', header: '이름', width: '140px' },
    { key: 'score', header: '점수', width: '100px', dataType: 'number' },
  ];

  return (
    <Table<EditRow>
      columns={columns}
      data={data}
      onCellEdit={(rowIndex, columnKey, value) => {
        setData((prev) =>
          prev.map((row, idx) =>
            idx === rowIndex 
              ? ({ ...row, [columnKey]: value } as EditRow) 
              : row
          )
        );
      }}
    />
  );
}
```

### 8. 스크롤 가능한 테이블

```tsx
<Table
  columns={columns}
  data={data}
  maxHeight="400px"
/>
```

### 9. 커스텀 렌더링

```tsx
const columns: TableColumn[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { 
    key: 'status', 
    header: '상태', 
    width: '100px',
    render: (value) => {
      const color = value === 'active' ? '#16a34a' : '#dc2626';
      return (
        <span style={{ 
          padding: '2px 8px', 
          borderRadius: '12px', 
          backgroundColor: value === 'active' ? '#dcfce7' : '#fee2e2',
          color 
        }}>
          {value === 'active' ? '활성' : '비활성'}
        </span>
      );
    }
  },
];
```

### 10. 정렬 기능

```tsx
const columns: TableColumn[] = [
  { key: 'id', header: 'ID', width: '60px', sortable: true, dataType: 'number' },
  { key: 'name', header: '이름', width: '120px', sortable: true },
  { key: 'date', header: '날짜', width: '120px', sortable: true, dataType: 'date' },
];

<Table
  columns={columns}
  data={data}
  onSort={(columnKey, direction) => {
    console.log(`Sort: ${columnKey} ${direction}`);
  }}
/>
```

---

## 주요 기능

### 1. 셀 편집
- 기본적으로 모든 셀이 편집 가능합니다
- `editable: false`로 특정 컬럼의 편집, 선택, 드래그를 모두 비활성화합니다
- 더블클릭 또는 Enter 키로 편집 모드 진입
- `onCellEdit` 콜백으로 변경 사항 처리

### 2. 테이블 제목 (NEW)
- `title` prop으로 테이블 상단에 제목 표시
- 제목 클릭 시 인라인 편집 가능
- `onTitleChange`, `onTitleDelete` 콜백 지원

### 3. 스타일 설정 (NEW)
- `styleConfig` 객체로 전체 스타일 일괄 설정
- 헤더/바디 높이, 폰트, 색상 등 세밀한 커스터마이징
- 컬럼별 `hoverBackgroundColor`, `selectedBackgroundColor` 개별 설정 가능

### 4. 보강배정 버튼 (NEW)
- `showAssignButton={true}`로 컨텍스트 메뉴에 보강배정하기 버튼 추가
- `onAssignClick` 콜백으로 선택된 셀 정보 전달

### 5. 행 선택
- `enableRowSelection`으로 행 선택 기능 활성화
- `selectedRowIndex`로 선택된 행 제어
- `onRowClick` 콜백으로 클릭 이벤트 처리

### 6. 키보드 네비게이션
- `enableKeyboardNavigation`으로 활성화
- ↑↓ 화살표 키로 행 이동
- Enter 키로 셀 편집 시작

### 7. 다중 셀 선택
- 마우스 드래그로 여러 셀 선택
- `onSelectionChange` 콜백으로 선택 변경 처리
- `editable: false` 셀은 선택에서 제외됨

### 8. 컨텍스트 메뉴
- 셀 우클릭 시 컨텍스트 메뉴 표시
- 복사, 붙여넣기, 삭제 기능
- 보강배정하기 버튼 (옵션)

### 9. 데이터 타입 지원
- `text`: 일반 텍스트
- `number`: 숫자 (정렬 시 숫자로 비교)
- `date`: 날짜 (자동 포맷)
- `boolean`: 불리언 (예/아니오 표시)

### 10. 텍스트 정렬
- `align` 속성으로 셀 내용 정렬 제어
- `'left'`, `'center'`, `'right'` 지원

---

## TypeScript 지원

테이블은 완전한 TypeScript 지원을 제공합니다:

```tsx
import { Table } from 'teachable-design-system';
import type { TableColumn, TableStyleConfig, CellPosition } from 'teachable-design-system';

interface MyData {
  id: number;
  name: string;
  email: string;
}

// 타입 안전성 보장
const columns: TableColumn<MyData>[] = [
  { key: 'id', header: 'ID' },      // ✅ OK
  { key: 'name', header: '이름' },  // ✅ OK
  // { key: 'age', header: '나이' }, // ❌ Error: 'age'는 MyData에 없음
];

const data: MyData[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
];

<Table<MyData> columns={columns} data={data} />
```

---

## 마이그레이션 가이드 (v0.3.x → v0.4.x)

### rowHeight → styleConfig.bodyRowHeight

```tsx
// Before (v0.3.x)
<Table rowHeight="40px" />

// After (v0.4.x) - 권장
<Table styleConfig={{ bodyRowHeight: '40px' }} />
```

### 새로운 기능 활용

```tsx
// v0.4.x 새 기능
<Table
  title="시간표"
  onTitleChange={(t) => setTitle(t)}
  showAssignButton={true}
  onAssignClick={(cells) => handleAssign(cells)}
  styleConfig={{
    headerHeight: '48px',
    bodyRowHeight: '40px',
    headerBackgroundColor: '#1e40af',
    headerTextColor: '#fff',
  }}
/>
```

---

## 주의사항

1. **TypeScript 제네릭 사용**: 타입 안전성을 위해 `Table<YourDataType>` 형식으로 사용하세요
2. **고유 키**: 각 컬럼의 `key`는 데이터 객체의 실제 키와 일치해야 합니다
3. **행 선택**: `enableRowSelection`과 `selectedRowIndex`, `onRowClick`은 함께 사용하세요
4. **편집 모드**: `onCellEdit` 콜백을 제공하지 않으면 편집 내용이 저장되지 않습니다
5. **editable: false**: 해당 컬럼은 편집, 선택, 드래그가 모두 비활성화됩니다
6. **스크롤**: `maxHeight` 설정 시 부모 컨테이너의 너비를 명시적으로 지정하세요

---

## 버전 정보

- 현재 버전: `0.4.2`
- React 18.x 또는 19.x 필요
- Emotion 의존성 필요

### v0.4.0 주요 변경사항
- ✨ `TableStyleConfig` 인터페이스 추가 (헤더/바디 높이, 폰트, 색상 통합 설정)
- ✨ 테이블 제목 기능 (`title`, `onTitleChange`, `onTitleDelete`)
- ✨ 보강배정하기 버튼 (`showAssignButton`, `onAssignClick`)
- ✨ 컬럼별 호버/선택 색상 (`hoverBackgroundColor`, `selectedBackgroundColor`)
- 🐛 `editable: false` 셀의 선택/드래그 비활성화
- 🐛 더블클릭 시 width 확장 버그 수정 (`table-layout: fixed`)

---

## 라이센스

이 컴포넌트는 `teachable-design-system` 패키지의 일부입니다.
