import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getAllNews } from './actions';

export const revalidate = 0;

export default async function Page({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams: {
    isDeleted: string;
  };
}) {
  const data = await getAllNews();

  return (
    <>
      <h2 className='text-lg font-semibold'>活動消息</h2>
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
}
