/**
 * Table 컴포넌트
 *
 * @example
 * import Table from '@/components/Table';
 * import type { TableColumn } from '@/types/table';
 *
 * const columns: TableColumn[] = [
 *   { key: 'name', header: '이름', editable: true },
 *   { key: 'age', header: '나이', dataType: 'number' },
 * ];
 *
 * <Table columns={columns} data={data} onCellEdit={handleEdit} />
 */
export { default } from './Table';
export { default as Table } from './Table';
