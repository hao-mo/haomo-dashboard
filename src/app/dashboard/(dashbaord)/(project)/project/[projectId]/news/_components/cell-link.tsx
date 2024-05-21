import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { News } from '../type';

import { useLocaleStore } from '@/stores/locale-store';

export const CellLink = ({ data }: { data: News }) => {
  const pathname = usePathname();
  const defaultLocale = useLocaleStore((state) => state.locale);

  return (
    <Link
      href={`${pathname}/${data.slug}`}
      className='underline-offset-2 hover:underline'
    >
      {data.headline[defaultLocale]}
    </Link>
  );
};
