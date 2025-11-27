import React, { useState, useCallback, type KeyboardEvent } from 'react';
import type { TableCellProps, DataType } from '../../types/table';
import { TableDataCell, EditableInput } from './style';

/** 값을 문자열로 포맷 */
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

/** 문자열을 타입에 맞게 파싱 */
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

/** input 타입 결정 */
const getInputType = (dataType: DataType): string => {
  if (dataType === 'number') return 'number';
  if (dataType === 'date') return 'date';
  return 'text';
};

/**
 * 테이블 셀
 * - 더블클릭: 편집 모드
 * - Enter: 저장 / ESC: 취소
 */
export default function TableCell({
  value,
  editable = false,
  height,
  dataType = 'text',
  isHeaderColumn = false,
  rowSpan,
  colSpan,
  onEdit,
  render,
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

  const displayValue = render ? render(value) : formatValue(value, dataType);

  return (
    <TableDataCell
      editable={editable}
      height={height}
      isHeaderColumn={isHeaderColumn}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onDoubleClick={startEditing}
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
