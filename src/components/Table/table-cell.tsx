import React, { useState, useCallback, type KeyboardEvent, type MouseEvent } from 'react';
import type { TableCellProps, DataType } from '../../types/table';
import { TableDataCell, EditableInput } from './style';

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

export default function TableCell({
  value,
  editable = false,
  height,
  rowHeight,
  dataType = 'text',
  isHeaderColumn = false,
  isSelected = false,
  rowSelected = false,
  selectionEdge,
  rowSpan,
  colSpan,
  onEdit,
  render,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: TableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const startEditing = useCallback(() => {
    if (!editable) return;
    setEditValue(formatValue(value, dataType));
    setIsEditing(true);
  }, [editable, value, dataType]);

  const save = useCallback(() => {
    onEdit?.(parseValue(editValue, dataType));
    setIsEditing(false);
  }, [editValue, dataType, onEdit]);

  const cancel = useCallback(() => {
    setEditValue('');
    setIsEditing(false);
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

  const displayValue = render ? render(value) : formatValue(value, dataType);

  return (
    <TableDataCell
      editable={editable}
      height={height || rowHeight}
      isHeaderColumn={isHeaderColumn}
      isSelected={isSelected}
      $rowSelected={rowSelected}
      $edgeTop={selectionEdge?.top}
      $edgeBottom={selectionEdge?.bottom}
      $edgeLeft={selectionEdge?.left}
      $edgeRight={selectionEdge?.right}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onDoubleClick={startEditing}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={onMouseUp}
    >
      {isEditing ? (
        <EditableInput
          type={getInputType(dataType)}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        displayValue
      )}
    </TableDataCell>
  );
}
