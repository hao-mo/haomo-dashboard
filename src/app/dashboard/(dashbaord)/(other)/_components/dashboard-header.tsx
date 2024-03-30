'use client';
import { useSelectedLayoutSegments } from 'next/navigation';

export const DashboardHeader = () => {
  const segments = useSelectedLayoutSegments();
  return (
    <header className='sticky top-0 h-16 border-b border-border '>
      <div className='ml-10 flex h-full items-center justify-between px-4 lg:ml-0 lg:px-6'>
        <h2 className='text-base font-semibold capitalize'>{segments.slice(-1)[0]}</h2>
      </div>
    </header>
  );
};
