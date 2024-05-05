import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getAllNews } from './actions';

export default async function Page({
  searchParams: { page, pageSize, isDeleted },
}: {
  searchParams: {
    page: string;
    pageSize: string;
    isDeleted: string;
  };
}) {
  const { data, pageCount } = await getAllNews({ page, pageSize, isDeleted });

  return (
    <>
      <h2 className='text-lg font-semibold'>活動消息</h2>
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
      />
    </>
  );
}
