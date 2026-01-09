import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronUp, ChevronDown, Copy, ClipboardPaste, Trash2, XCircle } from 'lucide-react';
import type { TableProps, SortDirection, DataType, CellPosition, TableStyleConfig } from '../../types/table';
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
  TableTitle,
  TableTitleInput,
  TableTitleActions,
} from './style';
import TableHeader from './table-header';
import TableBody from './table-body';
import AssignIcon from './icons/AssignIcon';

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
  title,
  onTitleChange,
  onTitleDelete,
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
  showAssignButton,
  onAssignClick,
  styleConfig,
}: TableProps<T>) {
  const outerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<CellPosition | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<CellPosition | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null);
  const [editStartValue, setEditStartValue] = useState<string | null>(null);
  const [editToken, setEditToken] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(title || '');

  // 실제 사용할 rowHeight (styleConfig 우선)
  const effectiveRowHeight = styleConfig?.bodyRowHeight || rowHeight || '30px';

  // 테이블 너비 계산 (컬럼 width 합계)
  const tableWidth = useMemo(() => {
    const hasAllWidths = columns.every(col => col.width);
    if (!hasAllWidths) return undefined; // width 미정의 컬럼이 있으면 auto
    
    let totalWidth = 0;
    for (const col of columns) {
      const w = col.width;
      if (typeof w === 'number') {
        totalWidth += w;
      } else if (typeof w === 'string') {
        const num = parseFloat(w);
        if (!isNaN(num)) {
          totalWidth += num;
        } else {
          return undefined; // %, auto 등은 계산 불가
        }
      }
    }
    return `${totalWidth}px`;
  }, [columns]);

  // 선택 영역에 editable: true인 셀이 있는지 확인
  const hasEditableCellInSelection = useCallback(() => {
    if (!selectionStart || !selectionEnd) return false;
    const minCol = Math.min(selectionStart.col, selectionEnd.col);
    const maxCol = Math.max(selectionStart.col, selectionEnd.col);
    for (let c = minCol; c <= maxCol; c++) {
      if (columns[c]?.editable === true) return true;
    }
    return false;
  }, [selectionStart, selectionEnd, columns]);

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
    // 1셀 선택은 모든 셀에서 가능
    setIsSelecting(true);
    setSelectionStart({ row: rowIndex, col: colIndex });
    setSelectionEnd({ row: rowIndex, col: colIndex });
  }, []);

  const handleCellMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (isSelecting) {
      // 드래그 선택 시 editable: true가 아닌 셀은 범위 확장 불가
      const col = columns[colIndex];
      if (col.editable !== true) return;
      setSelectionEnd({ row: rowIndex, col: colIndex });
    }
  }, [isSelecting, columns]);

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
    // 셀 편집(input/textarea) 중에는 전역 키 핸들러가 Backspace/Delete 등을 가로채지 않도록 무시
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }

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

    // 셀 선택 상태에서 문자 입력 시 즉시 편집 모드로 전환 (스프레드시트 UX)
    // - 단일 셀 선택일 때만 동작
    // - onCellEdit가 있어야 의미 있는 편집이 가능
    if (
      onCellEdit &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key.length === 1
    ) {
      const isSingleCell = selectionStart.row === selectionEnd.row && selectionStart.col === selectionEnd.col;
      if (!isSingleCell) {
        setSelectionEnd(selectionStart);
      }
      e.preventDefault();
      setEditingCell({ row: selectionStart.row, col: selectionStart.col });
      setEditStartValue(e.key);
      setEditToken((t) => t + 1);
      setContextMenu({ visible: false, x: 0, y: 0 });
      return;
    }

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
                if (col.editable === true) {
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
          if (col.editable === true) {
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

  // 표 밖을 클릭하면 셀 선택(타겟) 해제
  useEffect(() => {
    const handleMouseDownOutside = (event: MouseEvent) => {
      const root = outerRef.current;
      const target = event.target as Node | null;
      if (!root || !target) return;
      if (root.contains(target)) return;

      setIsSelecting(false);
      setSelectionStart(null);
      setSelectionEnd(null);
      setEditingCell(null);
      setEditStartValue(null);
      setContextMenu({ visible: false, x: 0, y: 0 });
    };

    document.addEventListener('mousedown', handleMouseDownOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside, true);
    };
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // editable한 셀이 선택 영역에 있을 때만 컨텍스트 메뉴 표시
    if (selectionStart && selectionEnd && hasEditableCellInSelection()) {
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }
  }, [selectionStart, selectionEnd, hasEditableCellInSelection]);

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
              if (col.editable === true) {
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
        if (col.editable === true) {
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

  const handleAssign = useCallback(() => {
    if (!selectionStart || !selectionEnd || !onAssignClick) return;
    
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
    onAssignClick(cells);
    closeContextMenu();
  }, [selectionStart, selectionEnd, onAssignClick, closeContextMenu]);

  const handleTitleSave = useCallback(() => {
    setIsEditingTitle(false);
    onTitleChange?.(titleValue);
  }, [titleValue, onTitleChange]);

  const handleTitleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTitleValue(title || '');
      setIsEditingTitle(false);
    }
  }, [handleTitleSave, title]);

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
    <TableOuterWrapper ref={outerRef} className={className} tabIndex={0} onContextMenu={handleContextMenu} $width={tableWidth}>
      <TableWrapper $borderColor={styleConfig?.borderColor}>
        {(title !== undefined || onTitleChange) && (
          <TableTitle $fontFamily={styleConfig?.fontFamily}>
            {isEditingTitle ? (
              <TableTitleInput
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => onTitleChange && setIsEditingTitle(true)}>
                {title || '제목 없음'}
              </span>
            )}
            {onTitleDelete && (
              <TableTitleActions>
                <button
                  onClick={onTitleDelete}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: '#666',
                  }}
                >
                  <XCircle size={16} />
                </button>
              </TableTitleActions>
            )}
          </TableTitle>
        )}
        <TableContainer ref={containerRef} maxHeight={maxHeight}>
          <StyledTable $fontFamily={styleConfig?.fontFamily}>
            <colgroup>
              {columns.map((col) => (
                <col
                  key={String(col.key)}
                  style={col.width ? { width: col.width } : undefined}
                />
              ))}
            </colgroup>
            <TableHeader<T>
              columns={columns}
              sortColumn={sortColumn ?? undefined}
              sortDirection={sortDirection}
              onSort={handleSort}
              styleConfig={styleConfig}
            />
            <TableBody<T>
              columns={columns}
              data={sortedData}
              rowHeight={effectiveRowHeight}
              onCellEdit={onCellEdit}
              selectionStart={enableRowSelection ? null : selectionStart}
              selectionEnd={enableRowSelection ? null : selectionEnd}
              editingCell={enableRowSelection ? null : editingCell}
              editStartValue={editStartValue}
              editToken={editToken}
              onCellMouseDown={enableRowSelection ? undefined : handleCellMouseDown}
              onCellMouseEnter={enableRowSelection ? undefined : handleCellMouseEnter}
              onCellMouseUp={enableRowSelection ? undefined : handleCellMouseUp}
              enableRowSelection={enableRowSelection}
              selectedRowIndex={selectedRowIndex}
              hoveredRowIndex={hoveredRowIndex ?? undefined}
              onRowClick={(rowIndex) => onRowClick?.(rowIndex, sortedData[rowIndex])}
              onRowHover={setHoveredRowIndex}
              styleConfig={styleConfig}
              parentRef={containerRef}
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
            {showAssignButton && (
              <>
                <ContextMenuItem onClick={handleAssign} disabled={!hasSelection || !onAssignClick}>
                  <AssignIcon size={14} />
                  보강배정하기
                </ContextMenuItem>
                <ContextMenuDivider />
              </>
            )}
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
