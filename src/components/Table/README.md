# Table Component

재사용 가능한 편집 가능 테이블 컴포넌트입니다.

## 주요 기능

- ✅ **셀 편집**: 더블클릭으로 편집 모드 진입, Enter/ESC로 저장/취소
- ✅ **정렬 기능**: 컬럼 헤더 클릭으로 오름차순/내림차순/정렬 해제
- ✅ **다양한 데이터 타입**: text, number, date, boolean 지원
- ✅ **셀 병합**: rowSpan, colSpan 지원
- ✅ **커스텀 렌더링**: 각 셀에 대한 커스텀 렌더링 함수 지원
- ✅ **스크롤**: maxHeight 설정 시 스크롤 기능 활성화
- ✅ **TypeScript**: 완벽한 타입 안정성

## 설치

```bash
npm install krds-uiux
```

## 기본 사용법

```tsx
import { Table } from 'krds-uiux';

const columns = [
  { key: 'id', header: 'ID', width: '80px' },
  { key: 'name', header: '이름', editable: true },
  { key: 'age', header: '나이', dataType: 'number', sortable: true },
];

const data = [
  { id: 1, name: '홍길동', age: 25 },
  { id: 2, name: '김철수', age: 30 },
  { id: 3, name: '이영희', age: 28 },
];

function MyTable() {
  return (
    <Table
      columns={columns}
      data={data}
      onCellEdit={(rowIndex, columnKey, value) => {
        console.log('셀 편집:', rowIndex, columnKey, value);
      }}
    />
  );
}
```

## 고급 사용법

### 1. 정렬 기능

```tsx
const columns = [
  { 
    key: 'name', 
    header: '이름', 
    sortable: true 
  },
  { 
    key: 'score', 
    header: '점수', 
    dataType: 'number',
    sortable: true 
  },
];

<Table
  columns={columns}
  data={data}
  onSort={(columnKey, direction) => {
    console.log('정렬:', columnKey, direction);
  }}
/>
```

### 2. 다양한 데이터 타입

```tsx
const columns = [
  { key: 'name', header: '이름', dataType: 'text' },
  { key: 'score', header: '점수', dataType: 'number' },
  { key: 'birthDate', header: '생년월일', dataType: 'date' },
  { key: 'isActive', header: '활성', dataType: 'boolean' },
];

const data = [
  {
    name: '홍길동',
    score: 95,
    birthDate: new Date('1995-05-15'),
    isActive: true,
  },
];

<Table columns={columns} data={data} />
```

### 3. 커스텀 렌더링

```tsx
const columns = [
  { key: 'name', header: '이름' },
  { 
    key: 'status', 
    header: '상태',
    render: (value) => (
      <span style={{ 
        color: value === 'active' ? 'green' : 'red' 
      }}>
        {value === 'active' ? '활성' : '비활성'}
      </span>
    )
  },
];
```

### 4. 셀 병합

```tsx
const columns = [
  { 
    key: 'subject', 
    header: '과목', 
    rowSpan: 2  // 2개 행 병합
  },
  { 
    key: 'schedule', 
    header: '시간표',
    colSpan: 2  // 2개 열 병합
  },
];
```

### 5. 스크롤 테이블

```tsx
<Table
  columns={columns}
  data={data}
  maxHeight="400px"  // 스크롤 활성화
/>
```

### 6. 커스텀 정렬 함수

```tsx
const columns = [
  {
    key: 'name',
    header: '이름',
    sortable: true,
    sortFn: (a, b) => {
      // 한글 이름 정렬
      return String(a).localeCompare(String(b), 'ko-KR');
    }
  },
];
```

## Props

### TableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn<T>[]` | - | 테이블 컬럼 정의 배열 |
| `data` | `TableRow<T>[]` | - | 테이블 데이터 배열 |
| `onCellEdit` | `(rowIndex, columnKey, value) => void` | - | 셀 편집 콜백 |
| `onSort` | `(columnKey, direction) => void` | - | 정렬 변경 콜백 |
| `maxHeight` | `string` | - | 최대 높이 (스크롤 활성화) |
| `striped` | `boolean` | `false` | 줄무늬 스타일 적용 |
| `className` | `string` | - | 추가 CSS 클래스 |

### TableColumn

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | - | 컬럼 키 (필수) |
| `header` | `string` | - | 헤더 텍스트 (필수) |
| `width` | `string` | - | 컬럼 너비 |
| `height` | `string` | - | 셀 높이 |
| `editable` | `boolean` | `true` | 편집 가능 여부 |
| `dataType` | `DataType` | `'text'` | 데이터 타입 |
| `sortable` | `boolean` | `false` | 정렬 가능 여부 |
| `rowSpan` | `number` | - | 행 병합 개수 |
| `colSpan` | `number` | - | 열 병합 개수 |
| `render` | `(value, row, rowIndex) => ReactNode` | - | 커스텀 렌더링 함수 |
| `sortFn` | `(a, b) => number` | - | 커스텀 정렬 함수 |

### DataType

```typescript
type DataType = 'text' | 'number' | 'date' | 'boolean' | 'custom';
```

### SortDirection

```typescript
type SortDirection = 'asc' | 'desc' | null;
```

## 스타일링

컴포넌트는 Figma 디자인 시스템을 기반으로 제작되었습니다:

- **헤더**: 배경 `#eef2f7`, border `#d6e0eb`, 높이 `30px`
- **셀**: 배경 `#ffffff`, border `#cdd1d5`, 높이 `30px`
- **폰트**: `Pretendard GOV`, 헤더 15px/Bold, 셀 17px/Regular
- **스크롤바**: 20px 너비, 커스텀 디자인

## 라이센스

MIT
