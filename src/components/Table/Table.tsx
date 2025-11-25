import React, { useRef, useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { TableProps, SortDirection } from '../../types/table';
import {
  TableWrapper,
  TableContainer,
  StyledTable,
  TableOuterWrapper,
  ScrollContainer,
  ScrollButton,
} from './style';
import TableHeader from './table-header';
import TableBodyComponent from './table-body';

/**
 * 편집 가능한 테이블 컴포넌트
 * @template T - 행 데이터의 타입
 */
export default function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  onCellEdit,
  onSort,
  maxHeight,
  striped = false,
  className,
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const column = columns.find((col) => col.key === sortColumn);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];

      // 커스텀 정렬 함수가 있는 경우
      if (column.sortFn) {
        return sortDirection === 'asc'
          ? column.sortFn(aValue, bValue)
          : column.sortFn(bValue, aValue);
      }

      // 기본 정렬 로직
      const compareValue = (valA: unknown, valB: unknown): number => {
        // null/undefined 처리
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        // 타입별 비교
        switch (column.dataType) {
          case 'number':
            return Number(valA) - Number(valB);
          case 'date':
            return new Date(valA as string).getTime() - new Date(valB as string).getTime();
          case 'boolean':
            return (valA ? 1 : 0) - (valB ? 1 : 0);
          default:
            return String(valA).localeCompare(String(valB), 'ko-KR');
        }
      };

      return sortDirection === 'asc'
        ? compareValue(aValue, bValue)
        : compareValue(bValue, aValue);
    });
  }, [data, sortColumn, sortDirection, columns]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      // 같은 컬럼 클릭: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      // 새로운 컬럼 클릭: asc부터 시작
      setSortColumn(columnKey);
      setSortDirection('asc');
    }

    // 외부 콜백 호출
    if (onSort) {
      const newDirection = sortColumn === columnKey
        ? sortDirection === 'asc'
          ? 'desc'
          : null
        : 'asc';
      onSort(columnKey, newDirection);
    }
  };

  const handleScrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: -100,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <TableOuterWrapper className={className}>
      <TableWrapper>
        <TableContainer ref={containerRef} maxHeight={maxHeight}>
          <StyledTable>
            <TableHeader<T>
              columns={columns}
              sortColumn={sortColumn || undefined}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <TableBodyComponent<T>
              columns={columns}
              data={sortedData}
              onCellEdit={onCellEdit}
            />
          </StyledTable>
        </TableContainer>
      </TableWrapper>
      {maxHeight && (
        <ScrollContainer>
          <ScrollButton position="top" onClick={handleScrollUp}>
            <ChevronUp />
          </ScrollButton>
          <ScrollButton position="bottom" onClick={handleScrollDown}>
            <ChevronDown />
          </ScrollButton>
        </ScrollContainer>
      )}
    </TableOuterWrapper>
  );
}
