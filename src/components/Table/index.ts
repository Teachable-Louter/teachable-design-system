/**
 * Table 컴포넌트 및 관련 타입 export
 * 
 * @example
 * ```tsx
 * import Table from '@/components/Table';
 * import type { TableColumn, TableRow } from '@/type/table';
 * 
 * const columns: TableColumn[] = [
 *   { key: 'name', header: '이름', editable: true },
 *   { key: 'age', header: '나이', width: '100px' },
 * ];
 * 
 * const data = [
 *   { name: '홍길동', age: 30 },
 *   { name: '김철수', age: 25 },
 * ];
 * 
 * <Table columns={columns} data={data} onCellEdit={handleEdit} />
 * ```
 */

export { default } from './Table';
export { default as Table } from './Table';

// 타입은 src/type/table.d.ts에서 import하세요
// import type { TableProps, TableColumn, TableRow } from '@/type/table';
