import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { TableHeaderProps, SortDirection } from '../../types/table';
import { TableHead, TableRow, TableHeaderCell, SortIcon } from './style';

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
}: TableHeaderProps<T>) {
  const handleClick = (key: string, sortable?: boolean) => {
    if (sortable) onSort?.(key);
  };

  return (
    <TableHead>
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
