import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronUp, ChevronDown, Copy, ClipboardPaste, Trash2, XCircle } from 'lucide-react';
import type { TableProps, SortDirection, DataType, CellPosition } from '../../types/table';
import {
  TableWrapper,
  TableContainer,
  StyledTable,
  TableOuterWrapper,
  ScrollContainer,
  ScrollButton,
  ContextMenu,
  ContextMenuItem,
  ContextMenuDivider,
  ContextMenuOverlay,
} from './style';
import TableHeader from './table-header';
import TableBody from './table-body';

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

const compareValues = (a: unknown, b: unknown, dataType?: DataType): number => {
  if (a == null) return 1;
  if (b == null) return -1;

  switch (dataType) {
    case 'number':
      return Number(a) - Number(b);
    case 'date':
      return new Date(a as string).getTime() - new Date(b as string).getTime();
    case 'boolean':
      return (a ? 1 : 0) - (b ? 1 : 0);
    default:
      return String(a).localeCompare(String(b), 'ko-KR');
  }
};

const getNextSortDirection = (current: SortDirection): SortDirection => {
  if (current === 'asc') return 'desc';
  if (current === 'desc') return null;
  return 'asc';
};

const formatCellValue = (value: unknown): string => {
  if (value == null) return '';
  if (value instanceof Date) return value.toLocaleDateString('ko-KR');
  if (typeof value === 'boolean') return value ? '예' : '아니오';
  if (typeof value === 'number') return value.toString();
  return String(value);
};

export default function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  onCellEdit,
  onSort,
  onSelectionChange,
  onPaste,
  maxHeight,
  rowHeight,
  className,
  enableRowSelection,
  selectedRowIndex,
  onRowClick,
  enableKeyboardNavigation,
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<CellPosition | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<CellPosition | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const column = columns.find((col) => col.key === sortColumn);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn as keyof T];
      const bVal = b[sortColumn as keyof T];

      const result = column.sortFn
        ? column.sortFn(aVal, bVal)
        : compareValues(aVal, bVal, column.dataType);

      return sortDirection === 'asc' ? result : -result;
    });
  }, [data, sortColumn, sortDirection, columns]);

  const handleSort = useCallback((columnKey: string) => {
    const isSameColumn = sortColumn === columnKey;
    const nextDirection = isSameColumn
      ? getNextSortDirection(sortDirection)
      : 'asc';

    setSortColumn(nextDirection ? columnKey : null);
    setSortDirection(nextDirection);
    onSort?.(columnKey, nextDirection);
  }, [sortColumn, sortDirection, onSort]);

  const scroll = useCallback((delta: number) => {
    containerRef.current?.scrollBy({ top: delta, behavior: 'smooth' });
  }, []);

  const handleCellMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    setIsSelecting(true);
    setSelectionStart({ row: rowIndex, col: colIndex });
    setSelectionEnd({ row: rowIndex, col: colIndex });
  }, []);

  const handleCellMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (isSelecting) {
      setSelectionEnd({ row: rowIndex, col: colIndex });
    }
  }, [isSelecting]);

  const handleCellMouseUp = useCallback(() => {
    if (isSelecting && selectionStart && selectionEnd) {
      const cells: CellPosition[] = [];
      const minRow = Math.min(selectionStart.row, selectionEnd.row);
      const maxRow = Math.max(selectionStart.row, selectionEnd.row);
      const minCol = Math.min(selectionStart.col, selectionEnd.col);
      const maxCol = Math.max(selectionStart.col, selectionEnd.col);

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          cells.push({ row: r, col: c });
        }
      }
      onSelectionChange?.(cells);
    }
    setIsSelecting(false);
  }, [isSelecting, selectionStart, selectionEnd, onSelectionChange]);

  const getSelectedData = useCallback((): string => {
    if (!selectionStart || !selectionEnd) return '';

    const minRow = Math.min(selectionStart.row, selectionEnd.row);
    const maxRow = Math.max(selectionStart.row, selectionEnd.row);
    const minCol = Math.min(selectionStart.col, selectionEnd.col);
    const maxCol = Math.max(selectionStart.col, selectionEnd.col);

    const rows: string[] = [];
    for (let r = minRow; r <= maxRow; r++) {
      const cols: string[] = [];
      for (let c = minCol; c <= maxCol; c++) {
        const colKey = columns[c]?.key;
        const value = sortedData[r]?.[colKey as keyof T];
        cols.push(formatCellValue(value));
      }
      rows.push(cols.join('\t'));
    }
    return rows.join('\n');
  }, [selectionStart, selectionEnd, columns, sortedData]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // 행 선택 모드에서 키보드 네비게이션
    if (enableRowSelection && enableKeyboardNavigation && onRowClick) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = selectedRowIndex ?? 0;
        const newIndex = Math.max(0, currentIndex - 1);
        onRowClick(newIndex, sortedData[newIndex]);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = selectedRowIndex ?? -1;
        const newIndex = Math.min(sortedData.length - 1, currentIndex + 1);
        onRowClick(newIndex, sortedData[newIndex]);
        return;
      }
    }

    if (!selectionStart || !selectionEnd) return;

    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault();
      const text = getSelectedData();
      navigator.clipboard.writeText(text).catch(console.error);
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        if (!text || !selectionStart) return;

        const rows = text
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .split('\n')
          .filter((row, idx, arr) => !(idx === arr.length - 1 && row === ''))
          .map(row => row.split('\t'));
        
        const startRow = Math.min(selectionStart.row, selectionEnd?.row ?? selectionStart.row);
        const startCol = Math.min(selectionStart.col, selectionEnd?.col ?? selectionStart.col);

        if (onPaste) {
          onPaste(startRow, startCol, rows);
        } else if (onCellEdit) {
          rows.forEach((row, rIdx) => {
            row.forEach((cellValue, cIdx) => {
              const targetRow = startRow + rIdx;
              const targetCol = startCol + cIdx;
              if (targetRow < data.length && targetCol < columns.length) {
                const col = columns[targetCol];
                if (col.editable !== false) {
                  let parsedValue: unknown = cellValue;
                  if (col.dataType === 'number') {
                    const num = parseFloat(cellValue.replace(/,/g, ''));
                    parsedValue = isNaN(num) ? 0 : num;
                  }
                  onCellEdit(targetRow, col.key, parsedValue);
                }
              }
            });
          });
        }
      }).catch(console.error);
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (!onCellEdit) return;
      e.preventDefault();
      const minRow = Math.min(selectionStart.row, selectionEnd.row);
      const maxRow = Math.max(selectionStart.row, selectionEnd.row);
      const minCol = Math.min(selectionStart.col, selectionEnd.col);
      const maxCol = Math.max(selectionStart.col, selectionEnd.col);

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const col = columns[c];
          if (col.editable !== false) {
            onCellEdit(r, col.key, '');
          }
        }
      }
    }

    if (e.key === 'Escape') {
      setSelectionStart(null);
      setSelectionEnd(null);
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  }, [enableRowSelection, enableKeyboardNavigation, selectedRowIndex, sortedData, onRowClick, selectionStart, selectionEnd, getSelectedData, onPaste, onCellEdit, data, columns]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (selectionStart && selectionEnd) {
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }
  }, [selectionStart, selectionEnd]);

  const closeContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }, []);

  const handleCopy = useCallback(() => {
    const text = getSelectedData();
    navigator.clipboard.writeText(text).catch(console.error);
    closeContextMenu();
  }, [getSelectedData, closeContextMenu]);

  const handlePaste = useCallback(() => {
    if (!selectionStart || !selectionEnd) return;
    
    navigator.clipboard.readText().then((text) => {
      if (!text) return;

      const rows = text
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .split('\n')
        .filter((row, idx, arr) => !(idx === arr.length - 1 && row === ''))
        .map(row => row.split('\t'));
      
      const startRow = Math.min(selectionStart.row, selectionEnd.row);
      const startCol = Math.min(selectionStart.col, selectionEnd.col);

      if (onPaste) {
        onPaste(startRow, startCol, rows);
      } else if (onCellEdit) {
        rows.forEach((row, rIdx) => {
          row.forEach((cellValue, cIdx) => {
            const targetRow = startRow + rIdx;
            const targetCol = startCol + cIdx;
            if (targetRow < data.length && targetCol < columns.length) {
              const col = columns[targetCol];
              if (col.editable !== false) {
                let parsedValue: unknown = cellValue;
                if (col.dataType === 'number') {
                  const num = parseFloat(cellValue.replace(/,/g, ''));
                  parsedValue = isNaN(num) ? 0 : num;
                }
                onCellEdit(targetRow, col.key, parsedValue);
              }
            }
          });
        });
      }
    }).catch(console.error);
    closeContextMenu();
  }, [selectionStart, selectionEnd, onPaste, onCellEdit, data, columns, closeContextMenu]);

  const handleDelete = useCallback(() => {
    if (!selectionStart || !selectionEnd || !onCellEdit) return;
    
    const minRow = Math.min(selectionStart.row, selectionEnd.row);
    const maxRow = Math.max(selectionStart.row, selectionEnd.row);
    const minCol = Math.min(selectionStart.col, selectionEnd.col);
    const maxCol = Math.max(selectionStart.col, selectionEnd.col);

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const col = columns[c];
        if (col.editable !== false) {
          onCellEdit(r, col.key, '');
        }
      }
    }
    closeContextMenu();
  }, [selectionStart, selectionEnd, onCellEdit, columns, closeContextMenu]);

  const handleClearSelection = useCallback(() => {
    setSelectionStart(null);
    setSelectionEnd(null);
    closeContextMenu();
  }, [closeContextMenu]);

  const hasSelection = selectionStart !== null && selectionEnd !== null;
  const selectionCellCount = useMemo(() => {
    if (!selectionStart || !selectionEnd) return 0;
    const rows = Math.abs(selectionEnd.row - selectionStart.row) + 1;
    const cols = Math.abs(selectionEnd.col - selectionStart.col) + 1;
    return rows * cols;
  }, [selectionStart, selectionEnd]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseUp = () => {
      if (isSelecting) {
        handleCellMouseUp();
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown as unknown as EventListener);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
    };
  }, [isSelecting, handleCellMouseUp, handleKeyDown]);

  return (
    <TableOuterWrapper className={className} tabIndex={0} onContextMenu={handleContextMenu}>
      <TableWrapper>
        <TableContainer ref={containerRef} maxHeight={maxHeight}>
          <StyledTable>
            <TableHeader<T>
              columns={columns}
              sortColumn={sortColumn ?? undefined}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <TableBody<T>
              columns={columns}
              data={sortedData}
              rowHeight={rowHeight}
              onCellEdit={onCellEdit}
              selectionStart={enableRowSelection ? null : selectionStart}
              selectionEnd={enableRowSelection ? null : selectionEnd}
              onCellMouseDown={enableRowSelection ? undefined : handleCellMouseDown}
              onCellMouseEnter={enableRowSelection ? undefined : handleCellMouseEnter}
              onCellMouseUp={enableRowSelection ? undefined : handleCellMouseUp}
              enableRowSelection={enableRowSelection}
              selectedRowIndex={selectedRowIndex}
              hoveredRowIndex={hoveredRowIndex ?? undefined}
              onRowClick={(rowIndex) => onRowClick?.(rowIndex, sortedData[rowIndex])}
              onRowHover={setHoveredRowIndex}
            />
          </StyledTable>
        </TableContainer>
      </TableWrapper>

      {maxHeight && (
        <ScrollContainer>
          <ScrollButton position="top" onClick={() => scroll(-100)}>
            <ChevronUp />
          </ScrollButton>
          <ScrollButton position="bottom" onClick={() => scroll(100)}>
            <ChevronDown />
          </ScrollButton>
        </ScrollContainer>
      )}

      {contextMenu.visible && (
        <>
          <ContextMenuOverlay onClick={closeContextMenu} />
          <ContextMenu x={contextMenu.x} y={contextMenu.y}>
            <ContextMenuItem onClick={handleCopy} disabled={!hasSelection}>
              <Copy size={14} />
              복사
              <span className="shortcut">⌘C</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={handlePaste} disabled={!hasSelection}>
              <ClipboardPaste size={14} />
              붙여넣기
              <span className="shortcut">⌘V</span>
            </ContextMenuItem>
            <ContextMenuDivider />
            <ContextMenuItem onClick={handleDelete} disabled={!hasSelection || !onCellEdit}>
              <Trash2 size={14} />
              삭제
              <span className="shortcut">Del</span>
            </ContextMenuItem>
            <ContextMenuDivider />
            <ContextMenuItem onClick={handleClearSelection} disabled={!hasSelection}>
              <XCircle size={14} />
              선택 해제
              <span className="shortcut">Esc</span>
            </ContextMenuItem>
            {hasSelection && (
              <>
                <ContextMenuDivider />
                <ContextMenuItem disabled style={{ fontSize: '11px', color: '#9ca3af' }}>
                  {selectionCellCount}개 셀 선택됨
                </ContextMenuItem>
              </>
            )}
          </ContextMenu>
        </>
      )}
    </TableOuterWrapper>
  );
}
