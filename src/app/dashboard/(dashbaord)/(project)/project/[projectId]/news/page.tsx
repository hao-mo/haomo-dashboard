import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getTotalNews } from './actions';

export const revalidate = 0;

export default async function Page() {
  const data = await getTotalNews();
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}
