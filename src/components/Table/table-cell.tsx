import React, { useEffect, useRef, useState, useCallback, memo, type KeyboardEvent, type MouseEvent } from 'react';
import type { TableCellProps, DataType } from '../../types/table';
import { TableDataCell, EditableInput, CellContent } from './style';

const formatValue = (val: unknown, dataType: DataType): string => {
  if (val == null) return '';

  switch (dataType) {
    case 'number':
      return typeof val === 'number' ? val.toLocaleString() : String(val);
    case 'date':
      return val instanceof Date ? val.toLocaleDateString('ko-KR') : String(val);
    case 'boolean':
      return val ? '예' : '아니오';
    default:
      return String(val);
  }
};

const parseValue = (val: string, dataType: DataType): unknown => {
  switch (dataType) {
    case 'number': {
      const num = parseFloat(val.replace(/,/g, ''));
      return isNaN(num) ? 0 : num;
    }
    case 'date':
      return new Date(val);
    case 'boolean':
      return val === '예' || val === 'true' || val === '1';
    default:
      return val;
  }
};

const getInputType = (dataType: DataType): string => {
  if (dataType === 'number') return 'number';
  if (dataType === 'date') return 'date';
  return 'text';
};

function TableCell({
  value,
  editable = false,
  width,
  height,
  rowHeight,
  dataType = 'text',
  isHeaderColumn = false,
  isSelected = false,
  rowSelected = false,
  isEditingRequested,
  startEditingToken,
  startEditingValue,
  selectionEdge,
  rowSpan,
  colSpan,
  onEdit,
  render,
  backgroundColor,
  hoverBackgroundColor,
  selectedBackgroundColor,
  align,
  styleConfig,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: TableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const lastStartTokenRef = useRef<number | undefined>(undefined);

  const startEditing = useCallback(() => {
    if (!editable) return;
    setEditValue(formatValue(value, dataType));
    setIsEditing(true);
  }, [editable, value, dataType]);

  // 부모에서 "편집 시작" 요청이 오면 (예: 선택 셀에서 타이핑) 편집 모드로 진입
  useEffect(() => {
    if (!isEditingRequested) return;
    if (startEditingToken == null) return;
    if (lastStartTokenRef.current === startEditingToken) return;

    lastStartTokenRef.current = startEditingToken;
    if (!editable) return;

    const nextValue = startEditingValue ?? formatValue(value, dataType);
    setEditValue(nextValue);
    setIsEditing(true);
  }, [isEditingRequested, startEditingToken, startEditingValue, editable, value, dataType]);

  const save = useCallback(() => {
    onEdit?.(parseValue(editValue, dataType));
    setIsEditing(false);
  }, [editValue, dataType, onEdit]);

  const cancel = useCallback(() => {
    setEditValue('');
    setIsEditing(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  }, [save, cancel]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (isEditing) return;
    e.preventDefault();
    onMouseDown?.();
  }, [isEditing, onMouseDown]);

  const handleMouseEnter = useCallback(() => {
    if (isEditing) return;
    onMouseEnter?.();
  }, [isEditing, onMouseEnter]);

  const handleDoubleClick = useCallback(() => {
    if (!editable) return;
    startEditing();
  }, [editable, startEditing]);

  const displayValue = render ? render(value) : formatValue(value, dataType);

  return (
    <TableDataCell
      $editable={editable}
      width={width}
      height={height || rowHeight}
      isHeaderColumn={isHeaderColumn}
      isSelected={isSelected}
      $rowSelected={rowSelected}
      $backgroundColor={backgroundColor}
      $hoverBackgroundColor={hoverBackgroundColor}
      $selectedBackgroundColor={selectedBackgroundColor}
      $selectedBorderColor={styleConfig?.selectedBorderColor}
      $align={align}
      $fontSize={styleConfig?.bodyFontSize}
      $textColor={styleConfig?.bodyTextColor}
      $borderColor={styleConfig?.borderColor}
      $edgeTop={selectionEdge?.top}
      $edgeBottom={selectionEdge?.bottom}
      $edgeLeft={selectionEdge?.left}
      $edgeRight={selectionEdge?.right}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onDoubleClick={editable ? handleDoubleClick : undefined}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={onMouseUp}
    >
      {isEditing ? (
        <EditableInput
          type={getInputType(dataType)}
          value={editValue}
          onChange={handleInputChange}
          onBlur={save}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <CellContent title={typeof displayValue === 'string' ? displayValue : undefined}>
          {displayValue}
        </CellContent>
      )}
    </TableDataCell>
  );
}

// React.memo를 적용하여 불필요한 리렌더링 방지
// props가 변경되지 않으면 리렌더링하지 않음
export default memo(TableCell, (prevProps, nextProps) => {
  // 자주 변경되는 props만 비교하여 성능 최적화
  // 참조 비교 먼저 수행 (빠름)
  if (prevProps.value !== nextProps.value) return false;
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.rowSelected !== nextProps.rowSelected) return false;
  if (prevProps.isEditingRequested !== nextProps.isEditingRequested) return false;
  if (prevProps.startEditingToken !== nextProps.startEditingToken) return false;
  if (prevProps.startEditingValue !== nextProps.startEditingValue) return false;
  
  // selectionEdge 객체 비교 (자주 변경됨)
  const prevEdge = prevProps.selectionEdge;
  const nextEdge = nextProps.selectionEdge;
  if (prevEdge !== nextEdge) {
    if (!prevEdge || !nextEdge) return false;
    if (prevEdge.top !== nextEdge.top) return false;
    if (prevEdge.bottom !== nextEdge.bottom) return false;
    if (prevEdge.left !== nextEdge.left) return false;
    if (prevEdge.right !== nextEdge.right) return false;
  }
  
  // 정적 props는 변경이 드물어 비교 생략 가능
  // editable, width, height, dataType 등은 보통 초기화 후 변경되지 않음
  if (prevProps.editable !== nextProps.editable) return false;
  if (prevProps.width !== nextProps.width) return false;
  if (prevProps.height !== nextProps.height) return false;
  if (prevProps.backgroundColor !== nextProps.backgroundColor) return false;
  
  return true; // props가 같으면 리렌더링 스킵
});
