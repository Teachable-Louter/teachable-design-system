import React from 'react';
import type { TableBodyProps, CellPosition } from '../../types/table';
import { TableBody as StyledTableBody, TableRow } from './style';
import TableCell from './table-cell';

const getSelectionInfo = (
  rowIndex: number,
  colIndex: number,
  start: CellPosition | null | undefined,
  end: CellPosition | null | undefined
): { isSelected: boolean; edge: { top: boolean; bottom: boolean; left: boolean; right: boolean } } => {
  if (!start || !end) {
    return { isSelected: false, edge: { top: false, bottom: false, left: false, right: false } };
  }
  
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);
  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);
  
  const isSelected = rowIndex >= minRow && rowIndex <= maxRow && colIndex >= minCol && colIndex <= maxCol;
  
  if (!isSelected) {
    return { isSelected: false, edge: { top: false, bottom: false, left: false, right: false } };
  }
  
  return {
    isSelected: true,
    edge: {
      top: rowIndex === minRow,
      bottom: rowIndex === maxRow,
      left: colIndex === minCol,
      right: colIndex === maxCol,
    }
  };
};

export default function TableBody<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  rowHeight,
  onCellEdit,
  selectionStart,
  selectionEnd,
  editingCell,
  editStartValue,
  editToken,
  onCellMouseDown,
  onCellMouseEnter,
  onCellMouseUp,
  enableRowSelection,
  selectedRowIndex,
  hoveredRowIndex,
  onRowClick,
  onRowHover,
  styleConfig,
}: TableBodyProps<T>) {
  const getRowBackground = (rowIndex: number): string | undefined => {
    if (!enableRowSelection) return undefined;
    if (selectedRowIndex === rowIndex) return styleConfig?.selectedBackgroundColor || '#e7f4fe';
    if (hoveredRowIndex === rowIndex) return styleConfig?.hoverBackgroundColor || '#f4f5f6';
    return undefined;
  };

  return (
    <StyledTableBody>
      {data.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          onClick={enableRowSelection ? () => onRowClick?.(rowIndex) : undefined}
          onMouseEnter={enableRowSelection ? () => onRowHover?.(rowIndex) : undefined}
          onMouseLeave={enableRowSelection ? () => onRowHover?.(null) : undefined}
          $hoverColor={styleConfig?.hoverBackgroundColor}
          style={{
            cursor: enableRowSelection ? 'pointer' : undefined,
            backgroundColor: getRowBackground(rowIndex),
            transition: enableRowSelection ? 'background-color 0.15s ease' : undefined,
          }}
        >
          {columns.map((col, colIndex) => {
            const { isSelected, edge } = getSelectionInfo(rowIndex, colIndex, selectionStart, selectionEnd);
            const isEditingRequested =
              !!editingCell && editingCell.row === rowIndex && editingCell.col === colIndex;
            // editable: true인 셀만 수정 가능, 선택/호버는 모든 셀에서 가능
            const cellEditable = col.editable === true;
            
            return (
              <TableCell
                key={`${rowIndex}-${col.key}`}
                value={row[col.key]}
                editable={cellEditable}
                width={col.width}
                height={col.height}
                rowHeight={rowHeight}
                dataType={col.dataType}
                isHeaderColumn={col.isHeaderColumn}
                isSelected={isSelected}
                rowSelected={enableRowSelection && (selectedRowIndex === rowIndex || hoveredRowIndex === rowIndex)}
                isEditingRequested={cellEditable ? isEditingRequested : false}
                startEditingToken={editToken}
                startEditingValue={isEditingRequested ? editStartValue : null}
                selectionEdge={isSelected ? edge : undefined}
                rowSpan={col.rowSpan}
                colSpan={col.colSpan}
                backgroundColor={col.backgroundColor}
                hoverBackgroundColor={col.hoverBackgroundColor || styleConfig?.hoverBackgroundColor}
                selectedBackgroundColor={col.selectedBackgroundColor || styleConfig?.selectedBackgroundColor}
                align={col.align}
                styleConfig={styleConfig}
                onEdit={cellEditable ? (value) => onCellEdit?.(rowIndex, col.key, value) : undefined}
                render={col.render ? (value) => col.render!(value, row, rowIndex) : undefined}
                onMouseDown={enableRowSelection ? undefined : () => onCellMouseDown?.(rowIndex, colIndex)}
                onMouseEnter={enableRowSelection ? undefined : () => onCellMouseEnter?.(rowIndex, colIndex)}
                onMouseUp={enableRowSelection ? undefined : onCellMouseUp}
              />
            );
          })}
        </TableRow>
      ))}
    </StyledTableBody>
  );
}
