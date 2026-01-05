import type { ReactNode } from 'react';

/** 셀 데이터 타입 */
export type DataType = 'text' | 'number' | 'date' | 'boolean' | 'custom';

/** 정렬 방향 */
export type SortDirection = 'asc' | 'desc' | null;

/** 텍스트 정렬 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * 테이블 컬럼 정의
 * @template T - 행 데이터 타입
 */
export interface TableColumn<T = Record<string, unknown>> {
  /** 컬럼 고유 키 */
  key: keyof T extends string ? keyof T : string;
  /** 헤더 텍스트 */
  header: string;
  /** 컬럼 너비 (예: '100px', '20%') */
  width?: string;
  /** 편집 가능 여부 @default true */
  editable?: boolean;
  /** 셀 높이 */
  height?: string;
  /** 데이터 타입 @default 'text' */
  dataType?: DataType;
  /** 정렬 가능 여부 @default false */
  sortable?: boolean;
  /** 헤더 스타일 적용 (좌측 열 강조) */
  isHeaderColumn?: boolean;
  /** 행 병합 수 */
  rowSpan?: number;
  /** 열 병합 수 */
  colSpan?: number;
  /** 커스텀 렌더링 */
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode;
  /** 커스텀 정렬 함수 */
  sortFn?: (a: unknown, b: unknown) => number;
  /** 컬럼 배경색 (예: '#f0f0f0', 'rgba(255,0,0,0.1)') */
  backgroundColor?: string;
  /** 텍스트 정렬 @default 'left' */
  align?: TextAlign;
}

/** 테이블 행 데이터 타입 */
export type TableRow<T = Record<string, unknown>> = T;

/** 테이블 컴포넌트 Props */
export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: TableRow<T>[];
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
  onSort?: (columnKey: string, direction: SortDirection) => void;
  onSelectionChange?: (cells: CellPosition[]) => void;
  onPaste?: (startRow: number, startCol: number, values: string[][]) => void;
  /** 최대 높이 (스크롤 활성화) */
  maxHeight?: string;
  /** 행 높이 (기본값: 30px) */
  rowHeight?: string;
  /** 줄무늬 스타일 */
  striped?: boolean;
  className?: string;
  /** 행 선택 활성화 */
  enableRowSelection?: boolean;
  /** 선택된 행 인덱스 */
  selectedRowIndex?: number;
  /** 행 클릭 콜백 */
  onRowClick?: (rowIndex: number, row: T) => void;
  /** 키보드 네비게이션 활성화 (↑↓ 화살표) */
  enableKeyboardNavigation?: boolean;
}

/** 테이블 셀 Props */
export interface TableCellProps {
  value: unknown;
  editable?: boolean;
  width?: string;
  height?: string;
  rowHeight?: string;
  dataType?: DataType;
  isHeaderColumn?: boolean;
  rowSpan?: number;
  colSpan?: number;
  isSelected?: boolean;
  rowSelected?: boolean;
  /** 부모에서 편집 시작 요청 여부 */
  isEditingRequested?: boolean;
  /** 편집 시작 트리거 토큰(값이 바뀌면 편집 시작) */
  startEditingToken?: number;
  /** 편집 시작 시 초기 입력 값(타이핑 시작 등) */
  startEditingValue?: string | null;
  selectionEdge?: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  onEdit?: (value: unknown) => void;
  render?: (value: unknown) => ReactNode;
  backgroundColor?: string;
  align?: TextAlign;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseUp?: () => void;
}

/** 테이블 헤더 Props */
export interface TableHeaderProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (columnKey: string) => void;
}

/** 테이블 바디 Props */
export interface TableBodyProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: TableRow<T>[];
  rowHeight?: string;
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
  selectedCells?: Set<string>;
  selectionStart?: CellPosition | null;
  selectionEnd?: CellPosition | null;
  /** 키 입력 등으로 시작되는 편집 대상 셀 */
  editingCell?: CellPosition | null;
  /** 키 입력으로 시작된 경우 초기 값 */
  editStartValue?: string | null;
  /** 편집 시작 트리거 토큰 */
  editToken?: number;
  onCellMouseDown?: (rowIndex: number, colIndex: number) => void;
  onCellMouseEnter?: (rowIndex: number, colIndex: number) => void;
  onCellMouseUp?: () => void;
  /** 행 선택 활성화 */
  enableRowSelection?: boolean;
  /** 선택된 행 인덱스 */
  selectedRowIndex?: number;
  /** 호버된 행 인덱스 */
  hoveredRowIndex?: number;
  /** 행 클릭 콜백 */
  onRowClick?: (rowIndex: number) => void;
  /** 행 호버 콜백 */
  onRowHover?: (rowIndex: number | null) => void;
}

/** 셀 위치 */
export interface CellPosition {
  row: number;
  col: number;
}

/** 선택 범위 */
export interface SelectionRange {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
}
