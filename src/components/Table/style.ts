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
  cellPadding: '4px 16px',
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
export const TableOuterWrapper = styled.div<{ $width?: string }>`
  position: relative;
  display: inline-block;
  ${({ $width }) => $width && `width: ${$width};`}
  outline: none;

  &:focus {
    outline: none;
  }
`;

export const TableWrapper = styled.div<{ $borderColor?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
`;

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

export const TableTitleInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font: inherit;
  color: inherit;
  outline: none;
  padding: 0;
  
  &:focus {
    outline: none;
  }
`;

export const TableTitleActions = styled.div`
  display: flex;
  gap: 4px;
`;

export const TableContainer = styled.div<{ maxHeight?: string }>`
  width: 100%;
  overflow: auto;
  position: relative;
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 20px;
    height: 20px;
  }

  &::-webkit-scrollbar-track {
    background: ${defaultColors.body};
    border: 1px solid ${defaultColors.border};
    margin-top: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${defaultColors.scrollThumb};
    border: 1px solid ${defaultColors.scrollThumbBorder};

    &:hover {
      background: ${defaultColors.headerHover};
    }
  }

  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: block;
    height: 20px;
    background: ${defaultColors.header};
    border: 1px solid ${defaultColors.borderLight};
  }

  &::-webkit-scrollbar-button:vertical:start:decrement:hover,
  &::-webkit-scrollbar-button:vertical:end:increment:hover {
    background: ${defaultColors.headerHover};
  }
`;

// ============================================
// 테이블 기본 컴포넌트
// ============================================
export const StyledTable = styled.table<{ $fontFamily?: string }>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  font-family: ${({ $fontFamily }) => $fontFamily || typography.fontFamily.primary};
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
`;

export const TableHeaderCell = styled.th<{
  width?: string;
  sortable?: boolean;
  $height?: string;
  $fontSize?: string;
  $textColor?: string;
  $borderColor?: string;
}>`
  ${baseCellStyle}
  min-width: ${({ width }) => (width ? '0' : '80px')};
  background: inherit;
  border-right: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  border-bottom: 1px solid ${({ $borderColor }) => $borderColor || defaultColors.border};
  border-left: none;
  border-top: none;
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
  font-size: ${({ isHeaderColumn, $fontSize }) => $fontSize || (isHeaderColumn ? '15px' : '13px')};
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
  font-size: 13px;
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
