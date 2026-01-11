import React, { memo, useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { TableBodyProps, CellPosition, TableColumn, TableStyleConfig } from '../../types/table';
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

// 행 높이 파싱 (px 단위 문자열을 숫자로 변환)
const parseRowHeight = (height: string | undefined): number => {
  if (!height) return 30;
  const parsed = parseInt(height, 10);
  return isNaN(parsed) ? 30 : parsed;
};

// 개별 행 컴포넌트 - memo로 최적화
interface VirtualRowProps<T extends Record<string, unknown>> {
  rowIndex: number;
  row: T;
  columns: TableColumn<T>[];
  rowHeight: string | undefined;
  selectionStart: CellPosition | null | undefined;
  selectionEnd: CellPosition | null | undefined;
  editingCell: CellPosition | null | undefined;
  editStartValue: string | null | undefined;
  editToken: number | undefined;
  enableRowSelection: boolean | undefined;
  selectedRowIndex: number | undefined;
  hoveredRowIndex: number | null | undefined;
  styleConfig: TableStyleConfig | undefined;
  enableCellSelectList?: boolean;
  cellSelectList?: string[];
  cellSelectListRowHeight?: string;
  onCellSelectListItemClick?: (rowIndex: number, columnKey: string, value: string) => void;
  onCellEdit?: (rowIndex: number, columnKey: string, value: unknown) => void;
  onCellMouseDown?: (rowIndex: number, colIndex: number) => void;
  onCellMouseEnter?: (rowIndex: number, colIndex: number) => void;
  onCellMouseUp?: () => void;
  onRowClick?: (rowIndex: number) => void;
  onRowHover?: (rowIndex: number | null) => void;
  style?: React.CSSProperties;
}

const VirtualRow = memo(<T extends Record<string, unknown>>({
  rowIndex,
  row,
  columns,
  rowHeight,
  selectionStart,
  selectionEnd,
  editingCell,
  editStartValue,
  editToken,
  enableRowSelection,
  selectedRowIndex,
  hoveredRowIndex,
  styleConfig,
  enableCellSelectList,
  cellSelectList,
  cellSelectListRowHeight,
  onCellSelectListItemClick,
  onCellEdit,
  onCellMouseDown,
  onCellMouseEnter,
  onCellMouseUp,
  onRowClick,
  onRowHover,
  style,
}: VirtualRowProps<T>) => {
  const getRowBackground = (idx: number): string | undefined => {
    if (!enableRowSelection) return undefined;
    if (selectedRowIndex === idx) return styleConfig?.selectedBackgroundColor || '#e7f4fe';
    if (hoveredRowIndex === idx) return styleConfig?.hoverBackgroundColor || '#f4f5f6';
    return undefined;
  };

  const handleRowClick = useCallback(() => {
    onRowClick?.(rowIndex);
  }, [onRowClick, rowIndex]);

  const handleRowMouseEnter = useCallback(() => {
    onRowHover?.(rowIndex);
  }, [onRowHover, rowIndex]);

  const handleRowMouseLeave = useCallback(() => {
    onRowHover?.(null);
  }, [onRowHover]);

  return (
    <TableRow
      onClick={enableRowSelection ? handleRowClick : undefined}
      onMouseEnter={enableRowSelection ? handleRowMouseEnter : undefined}
      onMouseLeave={enableRowSelection ? handleRowMouseLeave : undefined}
      $hoverColor={styleConfig?.hoverBackgroundColor}
      style={{
        ...style,
        cursor: enableRowSelection ? 'pointer' : undefined,
        backgroundColor: getRowBackground(rowIndex),
        transition: enableRowSelection ? 'background-color 0.15s ease' : undefined,
      }}
    >
      {columns.map((col, colIndex) => {
        const { isSelected, edge } = getSelectionInfo(rowIndex, colIndex, selectionStart, selectionEnd);
        const isEditingRequested =
          !!editingCell && editingCell.row === rowIndex && editingCell.col === colIndex;
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
            enableSelectList={enableCellSelectList}
            selectList={cellSelectList}
            selectListRowHeight={cellSelectListRowHeight}
            onSelectListItemClick={onCellSelectListItemClick ? (value) => onCellSelectListItemClick(rowIndex, col.key, value) : undefined}
            onEdit={cellEditable ? (value) => onCellEdit?.(rowIndex, col.key, value) : undefined}
            render={col.render ? (value) => col.render!(value, row, rowIndex) : undefined}
            onMouseDown={enableRowSelection ? undefined : () => onCellMouseDown?.(rowIndex, colIndex)}
            onMouseEnter={enableRowSelection ? undefined : () => onCellMouseEnter?.(rowIndex, colIndex)}
            onMouseUp={enableRowSelection ? undefined : onCellMouseUp}
          />
        );
      })}
    </TableRow>
  );
}) as <T extends Record<string, unknown>>(props: VirtualRowProps<T>) => React.ReactElement;

// 가상화 임계값 - 이 값 이상의 행일 때만 가상화 적용
const VIRTUALIZATION_THRESHOLD = 100;

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
  parentRef, // 부모 스크롤 컨테이너 참조 (가상화용)
  enableCellSelectList,
  cellSelectList,
  cellSelectListRowHeight,
  onCellSelectListItemClick,
}: TableBodyProps<T>) {
  const parsedRowHeight = parseRowHeight(rowHeight);
  const shouldVirtualize = data.length >= VIRTUALIZATION_THRESHOLD && !!parentRef?.current;

  // 가상화 훅
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef?.current ?? null,
    estimateSize: () => parsedRowHeight,
    overscan: 10, // 스크롤 시 부드러운 경험을 위해 10개 행 추가 렌더링
    enabled: shouldVirtualize,
  });

  // 가상화 모드
  if (shouldVirtualize) {
    const virtualRows = virtualizer.getVirtualItems();
    const totalHeight = virtualizer.getTotalSize();

    return (
      <StyledTableBody style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {virtualRows.map((virtualRow) => {
          const row = data[virtualRow.index];
          return (
            <VirtualRow
              key={virtualRow.index}
              rowIndex={virtualRow.index}
              row={row}
              columns={columns}
              rowHeight={rowHeight}
              selectionStart={selectionStart}
              selectionEnd={selectionEnd}
              editingCell={editingCell}
              editStartValue={editStartValue}
              editToken={editToken}
              enableRowSelection={enableRowSelection}
              selectedRowIndex={selectedRowIndex}
              hoveredRowIndex={hoveredRowIndex}
              styleConfig={styleConfig}
              enableCellSelectList={enableCellSelectList}
              cellSelectList={cellSelectList}
              cellSelectListRowHeight={cellSelectListRowHeight}
              onCellSelectListItemClick={onCellSelectListItemClick}
              onCellEdit={onCellEdit}
              onCellMouseDown={onCellMouseDown}
              onCellMouseEnter={onCellMouseEnter}
              onCellMouseUp={onCellMouseUp}
              onRowClick={onRowClick}
              onRowHover={onRowHover}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            />
          );
        })}
      </StyledTableBody>
    );
  }

  // 비가상화 모드 (소량 데이터)
  return (
    <StyledTableBody>
      {data.map((row, rowIndex) => (
        <VirtualRow
          key={rowIndex}
          rowIndex={rowIndex}
          row={row}
          columns={columns}
          rowHeight={rowHeight}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          editingCell={editingCell}
          editStartValue={editStartValue}
          editToken={editToken}
          enableRowSelection={enableRowSelection}
          selectedRowIndex={selectedRowIndex}
          hoveredRowIndex={hoveredRowIndex}
          styleConfig={styleConfig}
          enableCellSelectList={enableCellSelectList}
          cellSelectList={cellSelectList}
          cellSelectListRowHeight={cellSelectListRowHeight}
          onCellSelectListItemClick={onCellSelectListItemClick}
          onCellEdit={onCellEdit}
          onCellMouseDown={onCellMouseDown}
          onCellMouseEnter={onCellMouseEnter}
          onCellMouseUp={onCellMouseUp}
          onRowClick={onRowClick}
          onRowHover={onRowHover}
        />
      ))}
    </StyledTableBody>
  );
}
