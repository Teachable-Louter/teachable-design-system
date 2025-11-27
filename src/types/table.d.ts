import type { ReactNode } from 'react';

/** 셀 데이터 타입 */
export type DataType = 'text' | 'number' | 'date' | 'boolean' | 'custom';

/** 정렬 방향 */
export type SortDirection = 'asc' | 'desc' | null;

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
}

/** 테이블 행 데이터 타입 */
export type TableRow<T = Record<string, unknown>> = T;

/** 테이블 컴포넌트 Props */
export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: TableRow<T>[];
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
  onSort?: (columnKey: string, direction: SortDirection) => void;
  /** 최대 높이 (스크롤 활성화) */
  maxHeight?: string;
  /** 줄무늬 스타일 */
  striped?: boolean;
  className?: string;
}

/** 테이블 셀 Props */
export interface TableCellProps {
  value: unknown;
  editable?: boolean;
  height?: string;
  dataType?: DataType;
  isHeaderColumn?: boolean;
  rowSpan?: number;
  colSpan?: number;
  onEdit?: (value: unknown) => void;
  render?: (value: unknown) => ReactNode;
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
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
}
