import React from 'react';

/**
 * 데이터 타입
 */
export type DataType = 'text' | 'number' | 'date' | 'boolean' | 'custom';

/**
 * 정렬 방향
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * 테이블 컬럼 정의
 * @template T - 행 데이터의 타입
 */
export interface TableColumn<T = Record<string, unknown>> {
  /** 컬럼의 고유 키 (데이터 객체의 속성명과 매칭) */
  key: keyof T extends string ? keyof T : string;
  
  /** 헤더에 표시될 텍스트 */
  header: string;
  
  /** 컬럼의 너비 (ex: '100px', '20%') */
  width?: string;
  
  /** 셀 편집 가능 여부 (기본값: true) */
  editable?: boolean;
  
  /** 셀 높이 (ex: '30px', '50px') */
  height?: string;
  
  /** 데이터 타입 (기본값: 'text') */
  dataType?: DataType;
  
  /** 정렬 가능 여부 (기본값: false) */
  sortable?: boolean;
  
  /** 헤더 스타일 셀로 표시 (좌측 열 강조용) */
  isHeaderColumn?: boolean;
  
  /** 행 병합 개수 (rowspan) */
  rowSpan?: number;
  
  /** 열 병합 개수 (colspan) */
  colSpan?: number;
  
  /** 커스텀 렌더링 함수 */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  
  /** 커스텀 정렬 함수 */
  sortFn?: (a: unknown, b: unknown) => number;
}

/**
 * 테이블 행 데이터 타입
 */
export type TableRow<T = Record<string, unknown>> = T;

/**
 * 테이블 컴포넌트 Props
 */
export interface TableProps<T = Record<string, unknown>> {
  /** 테이블 컬럼 정의 배열 */
  columns: TableColumn<T>[];
  
  /** 테이블 데이터 배열 */
  data: TableRow<T>[];
  
  /** 셀 편집 콜백 함수 */
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
  
  /** 정렬 변경 콜백 함수 */
  onSort?: (columnKey: string, direction: SortDirection) => void;
  
  /** 테이블 최대 높이 (스크롤 활성화) */
  maxHeight?: string;
  
  /** 줄무늬 스타일 적용 여부 */
  striped?: boolean;
  
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 테이블 셀 컴포넌트 Props
 */
export interface TableCellProps {
  /** 셀의 값 */
  value: unknown;
  
  /** 편집 가능 여부 */
  editable?: boolean;
  
  /** 셀 높이 */
  height?: string;
  
  /** 데이터 타입 */
  dataType?: DataType;
  
  /** 헤더 스타일 적용 여부 */
  isHeaderColumn?: boolean;
  
  /** 행 병합 개수 */
  rowSpan?: number;
  
  /** 열 병합 개수 */
  colSpan?: number;
  
  /** 편집 완료 콜백 함수 */
  onEdit?: (value: unknown) => void;
  
  /** 커스텀 렌더링 함수 */
  render?: (value: unknown) => React.ReactNode;
}

/**
 * 테이블 헤더 컴포넌트 Props
 */
export interface TableHeaderProps<T = Record<string, unknown>> {
  /** 테이블 컬럼 정의 배열 */
  columns: TableColumn<T>[];
  
  /** 현재 정렬 중인 컬럼 키 */
  sortColumn?: string;
  
  /** 현재 정렬 방향 */
  sortDirection?: SortDirection;
  
  /** 정렬 변경 콜백 함수 */
  onSort?: (columnKey: string) => void;
}

/**
 * 테이블 바디 컴포넌트 Props
 */
export interface TableBodyProps<T = Record<string, unknown>> {
  /** 테이블 컬럼 정의 배열 */
  columns: TableColumn<T>[];
  
  /** 테이블 데이터 배열 */
  data: TableRow<T>[];
  
  /** 셀 편집 콜백 함수 */
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
}
