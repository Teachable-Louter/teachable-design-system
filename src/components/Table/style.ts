import styled from '@emotion/styled';
import type { SortDirection } from '../../types/table';

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: none;
  border-radius: 0;
`;

export const TableContainer = styled.div<{ maxHeight?: string }>`
  width: 100%;
  overflow: auto;
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  position: relative;
  
  &::-webkit-scrollbar {
    width: 20px;
    height: 20px;
  }
  
  &::-webkit-scrollbar-track {
    background: #ffffff;
    border: 1px solid #cdd1d5;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #e6e8ea;
    border: 1px solid #b1b8be;
    
    &:hover {
      background: #d6e0eb;
    }
  }
  
  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: block;
    height: 20px;
    background: #eef2f7;
    border: 1px solid #d6e0eb;
  }
  
  &::-webkit-scrollbar-button:vertical:start:decrement:hover,
  &::-webkit-scrollbar-button:vertical:end:increment:hover {
    background: #d6e0eb;
  }
`;

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
  background: #eef2f7;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ striped?: boolean }>`
  &:nth-of-type(even) {
    ${({ striped }) => striped && 'background-color: #f9fafb;'}
  }
  
  &:hover {
    background-color: #f5f7fa;
  }
`;

export const TableHeaderCell = styled.th<{ width?: string; sortable?: boolean }>`
  background: #eef2f7;
  border-top: 1px solid #d6e0eb;
  border-right: 1px solid #d6e0eb;
  border-bottom: 1px solid #d6e0eb;
  border-left: 1px solid #d6e0eb;
  padding: 8px 16px;
  text-align: left;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.5;
  color: #131416;
  height: 30px;
  min-width: 80px;
  box-sizing: border-box;
  ${({ width }) => width && `width: ${width};`}
  white-space: nowrap;
  vertical-align: middle;
  position: relative;
  
  ${({ sortable }) =>
    sortable &&
    `
    cursor: pointer;
    user-select: none;
    
    &:hover {
      background: #d6e0eb;
    }
  `}
`;

export const TableDataCell = styled.td<{ editable?: boolean; height?: string; isHeaderColumn?: boolean }>`
  background: ${({ isHeaderColumn }) => isHeaderColumn ? '#eef2f7' : '#ffffff'};
  border-top: 0;
  border-right: 1px solid ${({ isHeaderColumn }) => isHeaderColumn ? '#d6e0eb' : '#cdd1d5'};
  border-bottom: 1px solid ${({ isHeaderColumn }) => isHeaderColumn ? '#d6e0eb' : '#cdd1d5'};
  border-left: 1px solid ${({ isHeaderColumn }) => isHeaderColumn ? '#d6e0eb' : '#cdd1d5'};
  padding: ${({ isHeaderColumn }) => isHeaderColumn ? '8px 16px' : '12px 16px'};
  font-weight: ${({ isHeaderColumn }) => isHeaderColumn ? 700 : 400};
  font-size: ${({ isHeaderColumn }) => isHeaderColumn ? '15px' : '17px'};
  line-height: 1.5;
  color: ${({ isHeaderColumn }) => isHeaderColumn ? '#131416' : '#464c53'};
  height: ${({ height }) => height || '30px'};
  min-width: 80px;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  
  ${({ editable }) =>
    editable &&
    `
    cursor: text;
    &:hover {
      background-color: #f9fafb;
    }
  `}
`;

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
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  padding: 0;
  margin: -12px -16px;
  padding: 12px 16px;
  
  &:focus {
    outline: none;
    background: transparent;
  }
`;

export const ScrollButton = styled.button<{ position: 'top' | 'bottom' }>`
  width: 20px;
  height: 20px;
  background: #eef2f7;
  border: 1px solid #d6e0eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background-color 0.2s;
  
  &:hover {
    background: #d6e0eb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #333639;
  }
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  gap: 0;
`;

export const TableOuterWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
