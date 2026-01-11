import React from 'react';
import { ChevronUp, ChevronDown, XCircle } from 'lucide-react';
import type { TableHeaderProps, SortDirection } from '../../types/table';
import { TableHead, TableRow, TableHeaderCell, SortIcon, TableTitleRow, TableTitleCell, TableTitleInput, TableTitleActions } from './style';

/** 정렬 아이콘 컴포넌트 */
function SortIndicator({ isActive, direction }: { isActive: boolean; direction?: SortDirection }) {
  if (!isActive || !direction) {
    return <ChevronUp style={{ opacity: 0.3 }} />;
  }
  return direction === 'asc' ? <ChevronUp /> : <ChevronDown />;
}

/** 테이블 헤더 */
export default function TableHeader<T = Record<string, unknown>>({
  columns,
  sortColumn,
  sortDirection,
  onSort,
  styleConfig,
  title,
  onTitleChange,
  onTitleDelete,
  isEditingTitle,
  setIsEditingTitle,
  titleValue,
  setTitleValue,
  onTitleSave,
  onTitleKeyDown,
  firstColumnWidth,
}: TableHeaderProps<T>) {
  const handleClick = (key: string, sortable?: boolean) => {
    if (sortable) onSort?.(key);
  };

  const showTitleRow = title !== undefined || onTitleChange;

  return (
    <TableHead $backgroundColor={styleConfig?.headerBackgroundColor}>
      {/* 타이틀 행 */}
      {showTitleRow && (
        <TableTitleRow>
          {/* 첫 번째 빈 셀 (좌측 헤더 열과 같은 너비) */}
          <TableTitleCell
            $isEmpty
            $fontFamily={styleConfig?.fontFamily}
            $fontSize={styleConfig?.headerFontSize}
            $textColor={styleConfig?.headerTextColor}
            $borderColor={styleConfig?.borderColor}
            $backgroundColor={styleConfig?.headerBackgroundColor}
            style={{ width: firstColumnWidth || columns[0]?.width || '80px' }}
          >
            &nbsp;
          </TableTitleCell>
          {/* 나머지 컬럼 병합하여 타이틀 표시 */}
          <TableTitleCell
            colSpan={columns.length - 1}
            $fontFamily={styleConfig?.fontFamily}
            $fontSize={styleConfig?.headerFontSize}
            $textColor={styleConfig?.headerTextColor}
            $borderColor={styleConfig?.borderColor}
            $backgroundColor={styleConfig?.headerBackgroundColor}
          >
            {isEditingTitle && setTitleValue && onTitleSave ? (
              <TableTitleInput
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onBlur={onTitleSave}
                onKeyDown={onTitleKeyDown}
                $fontSize={styleConfig?.headerFontSize}
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => onTitleChange && setIsEditingTitle?.(true)}
                style={{ cursor: onTitleChange ? 'pointer' : 'default' }}
              >
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
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <XCircle size={14} />
                </button>
              </TableTitleActions>
            )}
          </TableTitleCell>
        </TableTitleRow>
      )}
      {/* 컬럼 헤더 행 */}
      <TableRow>
        {columns.map(({ key, header, width, sortable, rowSpan, colSpan }) => {
          const isActive = sortColumn === key;

          return (
            <TableHeaderCell
              key={key}
              width={width}
              sortable={sortable}
              rowSpan={rowSpan}
              colSpan={colSpan}
              $height={styleConfig?.headerHeight}
              $fontSize={styleConfig?.headerFontSize}
              $textColor={styleConfig?.headerTextColor}
              $borderColor={styleConfig?.borderColor}
              onClick={() => handleClick(key, sortable)}
            >
              {header}
              {sortable && (
                <SortIcon active={isActive} direction={isActive ? sortDirection : null}>
                  <SortIndicator isActive={isActive} direction={sortDirection} />
                </SortIcon>
              )}
            </TableHeaderCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
