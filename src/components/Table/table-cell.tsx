import React,{ useState } from 'react';
import type { TableCellProps } from '../../types/table';
import { TableDataCell, EditableInput } from './style';

/**
 * 편집 가능한 테이블 셀 컴포넌트
 * - 더블클릭으로 편집 모드 진입
 * - Enter키로 저장, ESC키로 취소
 * - 다양한 데이터 타입 지원 (text, number, date, boolean)
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
  const [editValue, setEditValue] = useState<string>('');

  const formatValue = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    
    switch (dataType) {
      case 'number':
        return typeof val === 'number' ? val.toLocaleString() : String(val);
      case 'date':
        if (val instanceof Date) {
          return val.toLocaleDateString('ko-KR');
        }
        return String(val);
      case 'boolean':
        return val ? '예' : '아니오';
      default:
        return String(val);
    }
  };

  const parseValue = (val: string): unknown => {
    switch (dataType) {
      case 'number':
        const num = parseFloat(val.replace(/,/g, ''));
        return isNaN(num) ? 0 : num;
      case 'date':
        return new Date(val);
      case 'boolean':
        return val === '예' || val === 'true' || val === '1';
      default:
        return val;
    }
  };

  const handleDoubleClick = () => {
    if (!editable) return;
    setEditValue(formatValue(value));
    setIsEditing(true);
  };

  const handleSave = () => {
    const parsedValue = parseValue(editValue);
    onEdit?.(parsedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue('');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <TableDataCell
      editable={editable}
      height={height}
      isHeaderColumn={isHeaderColumn}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <EditableInput
          type={dataType === 'number' ? 'number' : dataType === 'date' ? 'date' : 'text'}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : render ? (
        <>{render(value)}</>
      ) : (
        <>{formatValue(value)}</>
      )}
    </TableDataCell>
  );
}
