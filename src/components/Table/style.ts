import styled from '@emotion/styled';
import type { SortDirection } from '../../types/table';

// ============================================
// 디자인 토큰
// ============================================
const colors = {
  header: '#eef2f7',
  headerHover: '#d6e0eb',
  body: '#ffffff',
  bodyHover: '#f5f7fa',
  border: '#cdd1d5',
  borderLight: '#d6e0eb',
  text: '#131416',
  textSecondary: '#464c53',
  scrollThumb: '#e6e8ea',
  scrollThumbBorder: '#b1b8be',
} as const;

const spacing = {
  cellPadding: '12px 16px',
  headerPadding: '8px 16px',
} as const;

// ============================================
// 레이아웃 컴포넌트
// ============================================
export const TableOuterWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
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
    background: ${colors.body};
    border: 1px solid ${colors.border};
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.scrollThumb};
    border: 1px solid ${colors.scrollThumbBorder};

    &:hover {
      background: ${colors.headerHover};
    }
  }

  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: block;
    height: 20px;
    background: ${colors.header};
    border: 1px solid ${colors.borderLight};
  }

  &::-webkit-scrollbar-button:vertical:start:decrement:hover,
  &::-webkit-scrollbar-button:vertical:end:increment:hover {
    background: ${colors.headerHover};
  }
`;

// ============================================
// 테이블 기본 컴포넌트
// ============================================
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  font-family: 'Pretendard GOV', sans-serif;
`;

export const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${colors.header};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ striped?: boolean }>`
  &:nth-of-type(even) {
    ${({ striped }) => striped && `background-color: ${colors.bodyHover};`}
  }

  &:hover {
    background-color: ${colors.bodyHover};
  }
`;

// ============================================
// 셀 컴포넌트
// ============================================
const baseCellStyle = `
  min-width: 80px;
  box-sizing: border-box;
  vertical-align: middle;
  line-height: 1.5;
`;

export const TableHeaderCell = styled.th<{ width?: string; sortable?: boolean }>`
  ${baseCellStyle}
  background: ${colors.header};
  border: 1px solid ${colors.borderLight};
  padding: ${spacing.headerPadding};
  text-align: left;
  font-weight: 700;
  font-size: 15px;
  color: ${colors.text};
  height: 30px;
  white-space: nowrap;
  position: relative;
  ${({ width }) => width && `width: ${width};`}

  ${({ sortable }) =>
    sortable &&
    `
    cursor: pointer;
    user-select: none;

    &:hover {
      background: ${colors.headerHover};
    }
  `}
`;

export const TableDataCell = styled.td<{
  editable?: boolean;
  height?: string;
  isHeaderColumn?: boolean;
}>`
  ${baseCellStyle}
  background: ${({ isHeaderColumn }) => (isHeaderColumn ? colors.header : colors.body)};
  border: 1px solid ${({ isHeaderColumn }) => (isHeaderColumn ? colors.borderLight : colors.border)};
  border-top: 0;
  padding: ${({ isHeaderColumn }) => (isHeaderColumn ? spacing.headerPadding : spacing.cellPadding)};
  font-weight: ${({ isHeaderColumn }) => (isHeaderColumn ? 700 : 400)};
  font-size: ${({ isHeaderColumn }) => (isHeaderColumn ? '15px' : '17px')};
  color: ${({ isHeaderColumn }) => (isHeaderColumn ? colors.text : colors.textSecondary)};
  height: ${({ height }) => height ?? '30px'};
  position: relative;

  ${({ editable }) =>
    editable &&
    `
    cursor: text;
    &:hover {
      background-color: ${colors.bodyHover};
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
  background: ${colors.header};
  border: 1px solid ${colors.borderLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: ${colors.headerHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
    color: ${colors.text};
  }
`;
