import React from 'react';
import type { TableBodyProps } from '../../types/table';
import { TableBody as StyledTableBody, TableRow } from './style';
import TableCell from './table-cell';

/** 테이블 바디 */
export default function TableBody<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  onCellEdit,
}: TableBodyProps<T>) {
  return (
    <StyledTableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((col) => (
            <TableCell
              key={`${rowIndex}-${col.key}`}
              value={row[col.key]}
              editable={col.editable !== false}
              height={col.height}
              dataType={col.dataType}
              isHeaderColumn={col.isHeaderColumn}
              rowSpan={col.rowSpan}
              colSpan={col.colSpan}
              onEdit={(value) => onCellEdit?.(rowIndex, col.key, value)}
              render={col.render ? (value) => col.render!(value, row, rowIndex) : undefined}
            />
          ))}
        </TableRow>
      ))}
    </StyledTableBody>
  );
}
