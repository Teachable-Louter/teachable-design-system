import React from 'react';
import type { TableBodyProps } from '../../types/table';
import { TableBody as StyledTableBody, TableRow } from './style';
import TableCell from './table-cell';

/**
 * 테이블 바디 컴포넌트
 * @template T - 행 데이터의 타입
 */
export default function TableBodyComponent<
  T extends Record<string, unknown> = Record<string, unknown>
>({
  columns,
  data,
  onCellEdit,
}: TableBodyProps<T>) {
  const handleCellEdit = (
    rowIndex: number,
    columnKey: string,
    value: unknown
  ) => {
    if (onCellEdit) {
      onCellEdit(rowIndex, columnKey, value);
    }
  };

  return (
    <StyledTableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column) => (
            <TableCell
              key={`${rowIndex}-${column.key}`}
              value={row[column.key] as unknown}
              editable={column.editable !== false}
              height={column.height}
              dataType={column.dataType}
              isHeaderColumn={column.isHeaderColumn}
              rowSpan={column.rowSpan}
              colSpan={column.colSpan}
              onEdit={(value: unknown) => handleCellEdit(rowIndex, column.key, value)}
              render={
                column.render
                  ? (value: unknown) => column.render!(value, row, rowIndex)
                  : undefined
              }
            />
          ))}
        </TableRow>
      ))}
    </StyledTableBody>
  );
}
