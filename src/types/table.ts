import type { ReactNode, RefObject } from 'react';

/** 셀 데이터 타입 */
export type DataType = 'text' | 'number' | 'date' | 'boolean' | 'custom';

/** 정렬 방향 */
export type SortDirection = 'asc' | 'desc' | null;

/** 텍스트 정렬 */
export type TextAlign = 'left' | 'center' | 'right';

/** 테이블 스타일 설정 */
export interface TableStyleConfig {
  /** 헤더 높이 */
  headerHeight?: string;
  /** 바디 행 높이 */
  bodyRowHeight?: string;
  /** 폰트 패밀리 */
  fontFamily?: string;
  /** 헤더 폰트 크기 */
  headerFontSize?: string;
  /** 바디 폰트 크기 */
  bodyFontSize?: string;
  /** 헤더 배경색 */
  headerBackgroundColor?: string;
  /** 헤더 텍스트 색상 */
  headerTextColor?: string;
  /** 바디 배경색 */
  bodyBackgroundColor?: string;
  /** 바디 텍스트 색상 */
  bodyTextColor?: string;
  /** 테두리 색상 */
  borderColor?: string;
  /** 호버 시 배경색 */
  hoverBackgroundColor?: string;
  /** 선택 시 배경색 */
  selectedBackgroundColor?: string;
  /** 선택 시 테두리 색상 */
  selectedBorderColor?: string;
}

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
  /** 셀 호버 시 배경색 */
  hoverBackgroundColor?: string;
  /** 셀 선택 시 배경색 */
  selectedBackgroundColor?: string;
  /** 텍스트 정렬 @default 'left' */
  align?: TextAlign;
}

/** 테이블 행 데이터 타입 */
export type TableRow<T = Record<string, unknown>> = T;

/** 테이블 컴포넌트 Props */
export interface TableProps<T = Record<string, unknown>> {
  /** 테이블 제목 */
  title?: string;
  /** 제목 변경 콜백 */
  onTitleChange?: (title: string) => void;
  /** 제목 삭제 콜백 */
  onTitleDelete?: () => void;
  columns: TableColumn<T>[];
  data: TableRow<T>[];
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
  onSort?: (columnKey: string, direction: SortDirection) => void;
  onSelectionChange?: (cells: CellPosition[]) => void;
  onPaste?: (startRow: number, startCol: number, values: string[][]) => void;
  /** 최대 높이 (스크롤 활성화) */
  maxHeight?: string;
  /** 행 높이 (기본값: 30px) - deprecated, use styleConfig.bodyRowHeight */
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
  /** 보강배정하기 버튼 표시 여부 */
  showAssignButton?: boolean;
  /** 보강배정하기 버튼 클릭 콜백 */
  onAssignClick?: (cells: CellPosition[]) => void;
  /** 스타일 설정 */
  styleConfig?: TableStyleConfig;
  /** 셀 클릭 시 선택 리스트 모달 표시 여부 */
  enableCellSelectList?: boolean;
  /** 셀 클릭 시 표시할 선택 리스트 */
  cellSelectList?: string[];
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
  /** 컬럼 배경색 (예: '#f0f0f0', 'rgba(255,0,0,0.1)') */
  backgroundColor?: string;
  /** 셀 호버 시 배경색 */
  hoverBackgroundColor?: string;
  /** 셀 선택 시 배경색 */
  selectedBackgroundColor?: string;
  /** 텍스트 정렬 @default 'left' */
  align?: TextAlign;
  /** 스타일 설정 */
  styleConfig?: TableStyleConfig;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseUp?: () => void;
  /** 셀 클릭 시 선택 리스트 모달 표시 여부 */
  enableSelectList?: boolean;
  /** 선택 리스트 */
  selectList?: string[];
  /** 선택 리스트 아이템 클릭 콜백 */
  onSelectListItemClick?: (value: string) => void;
}

/** 테이블 헤더 Props */
export interface TableHeaderProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (columnKey: string) => void;
  /** 스타일 설정 */
  styleConfig?: TableStyleConfig;
  /** 테이블 제목 */
  title?: string;
  /** 제목 변경 콜백 */
  onTitleChange?: (title: string) => void;
  /** 제목 삭제 콜백 */
  onTitleDelete?: () => void;
  /** 제목 편집 상태 */
  isEditingTitle?: boolean;
  /** 제목 편집 상태 변경 */
  setIsEditingTitle?: (editing: boolean) => void;
  /** 제목 값 */
  titleValue?: string;
  /** 제목 값 변경 */
  setTitleValue?: (value: string) => void;
  /** 제목 저장 */
  onTitleSave?: () => void;
  /** 제목 키다운 */
  onTitleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 첫 번째 컸럼 너비 (타이틀 영역 좌측 셀 너비) */
  firstColumnWidth?: string;
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
  /** 스타일 설정 */
  styleConfig?: TableStyleConfig;
  /** 부모 스크롤 컨테이너 참조 (가상화용) */
  parentRef?: RefObject<HTMLDivElement | null>;
  /** 셀 클릭 시 선택 리스트 모달 활성화 */
  enableCellSelectList?: boolean;
  /** 셀 선택 리스트 아이템들 */
  cellSelectList?: string[];
  /** 셀 선택 리스트 아이템 클릭 콜백 */
  onCellSelectListItemClick?: (rowIndex: number, columnKey: string, value: string) => void;
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
