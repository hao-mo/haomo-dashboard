import type { Payment } from './columns';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '728ed52g',
      amount: 200,
      status: 'processing',
      email: '123@gmail.com',
    },
    {
      id: '728ed52h',
      amount: 300,
      status: 'success',
      email: '123@gmail.com',
    },
    {
      id: '728ed52i',
      amount: 400,
      status: 'failed',
      email: '123@gmail.com',
    },
    {
      id: '728ed52j',
      amount: 500,
      status: 'pending',
      email: '123@gmail.com',
    },
    {
      id: '728ed52k',
      amount: 600,
      status: 'processing',
      email: '123@gmail.com',
    },
    {
      id: '728ed52l',
      amount: 700,
      status: 'success',
      email: '123@gmail.com',
    },
    {
      id: '728ed52m',
      amount: 800,
      status: 'failed',
      email: '123@gmail.com',
    },
    {
      id: '728ed52n',
      amount: 900,
      status: 'pending',
      email: '123@gmail.com',
    },
    {
      id: '728ed52o',
      amount: 1000,
      status: 'processing',
      email: '123@gmail.com',
    },
    {
      id: '728ed52p',
      amount: 1100,
      status: 'success',
      email: '123@gmail.com',
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
