import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { TableHeaderProps } from '../../types/table';
import { TableHead, TableRow, TableHeaderCell, SortIcon } from './style';

/**
 * 테이블 헤더 컴포넌트
 * @template T - 행 데이터의 타입
 */
export default function TableHeader<T = Record<string, unknown>>({
  columns,
  sortColumn,
  sortDirection,
  onSort,
}: TableHeaderProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableHeaderCell
            key={column.key}
            width={column.width}
            sortable={column.sortable}
            rowSpan={column.rowSpan}
            colSpan={column.colSpan}
            onClick={() => {
              if (column.sortable && onSort) {
                onSort(column.key);
              }
            }}
          >
            {column.header}
            {column.sortable && (
              <SortIcon
                active={sortColumn === column.key}
                direction={sortColumn === column.key ? sortDirection : null}
              >
                {sortColumn === column.key && sortDirection === 'asc' ? (
                  <ChevronUp />
                ) : sortColumn === column.key && sortDirection === 'desc' ? (
                  <ChevronDown />
                ) : (
                  <ChevronUp style={{ opacity: 0.3 }} />
                )}
              </SortIcon>
            )}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
