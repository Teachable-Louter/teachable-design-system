import styled from '@emotion/styled';
import { colors as themeColors, typography } from '../../style/theme';
import type { SortDirection, TableStyleConfig } from '../../types/table';

// ============================================
// 디자인 토큰
// ============================================
export const defaultColors = {
  header: themeColors.surface['secondary-subtler'],
  headerHover: themeColors.action['secondary-pressed'],
  body: themeColors.surface.white,
  bodyHover: themeColors.surface['gray-subtler'],
  border: themeColors.border['gray-light'],
  borderLight: themeColors.border['secondary-light'],
  text: themeColors.text.bolder,
  textSecondary: themeColors.text.subtle,
  scrollThumb: themeColors.surface['gray-subtle'],
  scrollThumbBorder: themeColors.border.gray,
  selected: themeColors.surface['information-subtler'],
  selectedBorder: themeColors.border.primary,
  disabledText: themeColors.text.disabled,
} as const;

const spacing = {
  cellPadding: '0 16px',
  headerPadding: '0 16px',
} as const;

// ============================================
// 헬퍼 함수
// ============================================
/**
 * 테이블 셀의 배경색을 결정합니다.
 * 우선순위: 선택됨 > 헤더 컬럼 > 행 선택됨 (inherit) > 커스텀 배경색 > 기본 배경색
 */
const getCellBackgroundColor = (params: {
  isSelected?: boolean;
  isHeaderColumn?: boolean;
  rowSelected?: boolean;
  backgroundColor?: string;
  selectedBackgroundColor?: string;
}): string => {
  const { isSelected, isHeaderColumn, rowSelected, backgroundColor, selectedBackgroundColor } = params;
  
  if (isSelected) return selectedBackgroundColor || defaultColors.selected;
  if (isHeaderColumn) return defaultColors.header;
  if (rowSelected) return 'inherit'; // 행 선택 시 부모 스타일 상속
  return backgroundColor || defaultColors.body;
};

// ============================================
// 레이아웃 컴포넌트
// ============================================
export const TableOuterWrapper = styled.div<{ $width?: string; $hasScroll?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ $width, $hasScroll }) => $width ? `width: ${$hasScroll ? `calc(${$width} + 20px)` : $width};` : ''}
  outline: none;

  &:focus {
    outline: none;
  }
`;

export const TableWrapper = styled.div<{ $borderColor?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
`;

// ============================================
// 타이틀 행 (테이블 헤더 내부)
// ============================================
export const TableTitleRow = styled.tr``;

export const TableTitleCell = styled.th<{
  $isEmpty?: boolean;
  $fontFamily?: string;
  $fontSize?: string;
  $textColor?: string;
  $borderColor?: string;
  $backgroundColor?: string;
}>`
  box-sizing: border-box;
  vertical-align: middle;
  line-height: 1.5;
  font-family: ${({ $fontFamily }) => $fontFamily || typography.fontFamily.primary};
  font-size: ${({ $fontSize }) => $fontSize || '15px'};
  font-weight: 700;
  color: ${({ $textColor }) => $textColor || defaultColors.text};
  background: ${({ $backgroundColor }) => $backgroundColor || defaultColors.header};
  border-right: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  border-left: none;
  border-top: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  padding: 0 16px;
  text-align: ${({ $isEmpty }) => ($isEmpty ? 'left' : 'center')};
  white-space: nowrap;
  min-width: 80px;

  &:first-of-type {
    border-left: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  }
`;

export const TableTitleInput = styled.input<{ $fontSize?: string }>`
  border: none;
  background: transparent;
  font: inherit;
  font-size: ${({ $fontSize }) => $fontSize || '15px'};
  color: inherit;
  outline: none;
  padding: 0;
  text-align: center;
  width: 100%;
  
  &:focus {
    outline: none;
  }
`;

export const TableTitleActions = styled.div`
  display: inline-flex;
  gap: 4px;
  margin-left: 8px;
`;

// 기존 TableTitle은 deprecated - 하위 호환성을 위해 유지
export const TableTitle = styled.div<{ $fontFamily?: string }>`
  padding: 8px 16px;
  font-family: ${({ $fontFamily }) => $fontFamily || typography.fontFamily.primary};
  font-size: 16px;
  font-weight: 700;
  color: ${defaultColors.text};
  background: ${defaultColors.header};
  border-bottom: 1px solid ${defaultColors.borderLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableContainer = styled.div<{ maxHeight?: string; $headerHeight?: string }>`
  width: 100%;
  overflow-y: ${({ maxHeight }) => maxHeight ? 'auto' : 'visible'};
  overflow-x: hidden;
  position: relative;
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}

  /* 스크롤바 스타일 - Figma 디자인 기반 */
  &::-webkit-scrollbar {
    width: 20px;
  }

  /* 스크롤바 트랙 - 흰색 배경 */
  &::-webkit-scrollbar-track {
    background: ${defaultColors.body};
    border: 1px solid ${defaultColors.borderLight};
  }

  /* 스크롤바 thumb - 헤더 색상과 테두리 */
  &::-webkit-scrollbar-thumb {
    background: ${defaultColors.header};
    border: 1px solid ${defaultColors.borderLight};

    &:hover {
      background: ${defaultColors.headerHover};
    }
  }

  /* 위쪽 화살표 버튼 - 헤더(24px) + 버튼(20px) = 44px, 하단 20px만 클릭 가능하도록 pointer-events 설정 불가하므로 전체 44px */
  &::-webkit-scrollbar-button:vertical:start:decrement {
    display: block;
    height: 44px;
    background: ${defaultColors.header};
    border: 1px solid ${defaultColors.borderLight};
    background-image: 
      linear-gradient(to bottom, transparent 23px, ${defaultColors.borderLight} 23px, ${defaultColors.borderLight} 24px, transparent 24px),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2333363d' d='M6 0L0 6.5h12L6 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center top, center 32px;
  }

  /* 아래쪽 화살표 버튼 */
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: block;
    height: 20px;
    background: ${defaultColors.header};
    border: 1px solid ${defaultColors.borderLight};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2333363d' d='M6 8L12 1.5H0L6 8z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center center;
  }

  &::-webkit-scrollbar-button:vertical:start:decrement:hover,
  &::-webkit-scrollbar-button:vertical:end:increment:hover {
    background-color: ${defaultColors.headerHover};
  }

  /* 스크롤바 코너 */
  &::-webkit-scrollbar-corner {
    background: ${defaultColors.header};
    border: 1px solid ${defaultColors.borderLight};
  }
`;

// ============================================
// 테이블 기본 컴포넌트
// ============================================
export const StyledTable = styled.table<{ 
  $fontFamily?: string; 
  $fontSize?: string;
  $fontWeight?: number;
  $lineHeight?: string;
}>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  font-family: ${({ $fontFamily }) => $fontFamily || typography.fontFamily.primary};
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize};`}
  ${({ $fontWeight }) => $fontWeight && `font-weight: ${$fontWeight};`}
  ${({ $lineHeight }) => $lineHeight && `line-height: ${$lineHeight};`}
`;

export const TableHead = styled.thead<{ $backgroundColor?: string }>`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ $backgroundColor }) => $backgroundColor || defaultColors.header};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ striped?: boolean; $hoverColor?: string }>`
  &:nth-of-type(even) {
    ${({ striped }) => striped && `background-color: ${defaultColors.bodyHover};`}
  }

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor || defaultColors.bodyHover};
  }
`;

// ============================================
// 셀 컴포넌트
// ============================================
const baseCellStyle = `
  box-sizing: border-box;
  vertical-align: middle;
  line-height: 1.5;
  font-family: ${typography.fontFamily.primary};
`;

export const TableHeaderCell = styled.th<{
  width?: string;
  sortable?: boolean;
  $height?: string;
  $fontSize?: string;
  $textColor?: string;
  $borderColor?: string;
  $isFirstRow?: boolean;
}>`
  ${baseCellStyle}
  min-width: ${({ width }) => (width ? '0' : '80px')};
  background: inherit;
  border-right: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  border-left: none;
  border-top: ${({ $isFirstRow, $borderColor }) => $isFirstRow ? `1px solid ${$borderColor || defaultColors.border}` : 'none'};
  padding: ${spacing.headerPadding};
  text-align: left;
  font-weight: 700;
  font-size: ${({ $fontSize }) => $fontSize || '15px'};
  color: ${({ $textColor }) => $textColor || defaultColors.text};
  height: ${({ $height }) => $height || '23px'};
  white-space: nowrap;
  position: relative;
  ${({ width }) => width && `width: ${width};`}

  &:first-of-type {
    border-left: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  }

  ${({ sortable }) =>
    sortable &&
    `
    cursor: pointer;
    user-select: none;

    &:hover {
      background: ${defaultColors.headerHover};
    }
  `}
`;

export const TableDataCell = styled.td<{
  $editable?: boolean;
  width?: string;
  height?: string;
  isHeaderColumn?: boolean;
  isSelected?: boolean;
  $edgeTop?: boolean;
  $edgeBottom?: boolean;
  $edgeLeft?: boolean;
  $edgeRight?: boolean;
  $rowSelected?: boolean;
  $backgroundColor?: string;
  $hoverBackgroundColor?: string;
  $selectedBackgroundColor?: string;
  $selectedBorderColor?: string;
  $align?: 'left' | 'center' | 'right';
  $fontSize?: string;
  $textColor?: string;
  $borderColor?: string;
}>`
  ${baseCellStyle}
  min-width: ${({ width }) => (width ? '0' : '80px')};
  background: ${({ isHeaderColumn, isSelected, $rowSelected, $backgroundColor, $selectedBackgroundColor }) => 
    getCellBackgroundColor({
      isSelected,
      isHeaderColumn,
      rowSelected: $rowSelected,
      backgroundColor: $backgroundColor,
      selectedBackgroundColor: $selectedBackgroundColor,
    })};
  border-right: 1px solid ${({ isHeaderColumn, $borderColor }) => 
    $borderColor || (isHeaderColumn ? defaultColors.borderLight : defaultColors.border)};
  border-bottom: 1px solid ${({ isHeaderColumn, $borderColor }) => 
    $borderColor || (isHeaderColumn ? defaultColors.borderLight : defaultColors.border)};
  border-left: none;
  border-top: none;
  padding: ${({ isHeaderColumn }) => (isHeaderColumn ? spacing.headerPadding : spacing.cellPadding)};
  font-weight: ${({ isHeaderColumn }) => (isHeaderColumn ? 700 : 400)};
  font-size: ${({ isHeaderColumn, $fontSize }) => $fontSize || '15px'};
  color: ${({ isHeaderColumn, $textColor }) => $textColor || (isHeaderColumn ? defaultColors.text : defaultColors.textSecondary)};
  height: ${({ height }) => height ?? '30px'};
  position: relative;
  user-select: none;
  text-align: ${({ $align }) => $align ?? 'left'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 0;

  &:first-of-type {
    border-left: 1px solid ${({ isHeaderColumn, $borderColor }) => 
      $borderColor || (isHeaderColumn ? defaultColors.borderLight : defaultColors.border)};
  }

  ${({ isSelected, $edgeTop, $edgeBottom, $edgeLeft, $edgeRight, $selectedBorderColor }) =>
    isSelected &&
    `
    z-index: 1;
    box-shadow: 
      ${$edgeTop ? `inset 0 2px 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}` : `inset 0 0.5px 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}50`}${$edgeBottom ? `, inset 0 -2px 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}` : `, inset 0 -0.5px 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}50`}${$edgeLeft ? `, inset 2px 0 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}` : `, inset 0.5px 0 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}50`}${$edgeRight ? `, inset -2px 0 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}` : `, inset -0.5px 0 0 0 ${$selectedBorderColor || defaultColors.selectedBorder}50`};
  `}

  ${({ isSelected, isHeaderColumn, $rowSelected, $hoverBackgroundColor }) =>
    !isSelected && !$rowSelected && !isHeaderColumn &&
    `
    &:hover {
      background-color: ${$hoverBackgroundColor || defaultColors.bodyHover};
    }
  `}

  ${({ $editable }) =>
    $editable
    ? `cursor: cell;`
    : `cursor: default;`
  }

  ${({ isSelected, $selectedBackgroundColor }) =>
    isSelected &&
    `
    &:hover {
      background-color: ${$selectedBackgroundColor || defaultColors.selected};
    }
  `}
`;

// ============================================
// 정렬 및 입력 컴포넌트
// ============================================
export const SortIcon = styled.span<{ active?: boolean; direction?: SortDirection }>`
  display: inline-flex;
  flex-direction: column;
  margin-left: 4px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const CellContent = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EditableInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  color: inherit;
  margin: -12px -16px;
  padding: ${spacing.cellPadding};

  &:focus {
    outline: none;
  }
`;

// ============================================
// 스크롤 컨트롤
// ============================================
export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ScrollButton = styled.button<{ position: 'top' | 'bottom' }>`
  width: 20px;
  height: 20px;
  padding: 0;
  background: ${defaultColors.header};
  border: 1px solid ${defaultColors.borderLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: ${defaultColors.headerHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
    color: ${defaultColors.text};
  }
`;

// ============================================
// 컨텍스트 메뉴
// ============================================
export const ContextMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

export const ContextMenu = styled.div<{ x: number; y: number }>`
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  z-index: 1000;
  min-width: 160px;
  background: ${defaultColors.body};
  border: 1px solid ${defaultColors.border};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  font-family: ${typography.fontFamily.primary};
`;

export const ContextMenuItem = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 15px;
  color: ${({ disabled }) => (disabled ? defaultColors.disabledText : defaultColors.text)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ disabled }) => (disabled ? 'transparent' : defaultColors.bodyHover)};
  }

  span.shortcut {
    margin-left: auto;
    font-size: 11px;
    color: ${defaultColors.disabledText};
  }
`;

export const ContextMenuDivider = styled.div`
  height: 1px;
  background: ${defaultColors.borderLight};
  margin: 4px 0;
`;

// ============================================
// 셀 선택 리스트 모달
// ============================================
export const CellSelectListWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const CellSelectListDropdown = styled.div<{ $visible: boolean; $rowHeight?: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  width: max-content;
  z-index: 100;
  background: ${defaultColors.body};
  border: 1px solid ${defaultColors.border};
  border-top: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: ${({ $rowHeight }) => {
    const height = parseInt($rowHeight || '30', 10);
    return `${height * 3}px`;
  }}; /* 약 3개 아이템 높이 */
  overflow-y: auto;
  overflow-x: visible;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};

  /* 스크롤바 스타일 - 우측으로 넘침 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${defaultColors.body};
  }

  &::-webkit-scrollbar-thumb {
    background: ${defaultColors.scrollThumb};
    border-radius: 4px;

    &:hover {
      background: ${defaultColors.headerHover};
    }
  }
`;

export const CellSelectListItem = styled.div<{ $highlighted?: boolean }>`
  padding: 6px 12px;
  font-size: 15px;
  color: ${defaultColors.textSecondary};
  cursor: pointer;
  background: ${({ $highlighted }) => ($highlighted ? defaultColors.selected : 'transparent')};
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${defaultColors.bodyHover};
  }
`;
