import React, { useRef, useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { TableProps, SortDirection, DataType } from '../../types/table';
import {
  TableWrapper,
  TableContainer,
  StyledTable,
  TableOuterWrapper,
  ScrollContainer,
  ScrollButton,
} from './style';
import TableHeader from './table-header';
import TableBody from './table-body';

/** 값 비교 함수 */
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

/** 다음 정렬 방향 계산 */
const getNextSortDirection = (current: SortDirection): SortDirection => {
  if (current === 'asc') return 'desc';
  if (current === 'desc') return null;
  return 'asc';
};

/**
 * 테이블 컴포넌트
 * @template T - 행 데이터 타입
 */
export default function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  onCellEdit,
  onSort,
  maxHeight,
  className,
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // 정렬된 데이터 (메모이제이션)
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

  // 정렬 핸들러
  const handleSort = useCallback((columnKey: string) => {
    const isSameColumn = sortColumn === columnKey;
    const nextDirection = isSameColumn
      ? getNextSortDirection(sortDirection)
      : 'asc';

    setSortColumn(nextDirection ? columnKey : null);
    setSortDirection(nextDirection);
    onSort?.(columnKey, nextDirection);
  }, [sortColumn, sortDirection, onSort]);

  // 스크롤 핸들러
  const scroll = useCallback((delta: number) => {
    containerRef.current?.scrollBy({ top: delta, behavior: 'smooth' });
  }, []);

  return (
    <TableOuterWrapper className={className}>
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
              onCellEdit={onCellEdit}
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
    </TableOuterWrapper>
  );
}
