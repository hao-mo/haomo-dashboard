import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { FormattedNews } from '../type';

export const CellLink = ({ data }: { data: FormattedNews }) => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/${data.slug}`}
      className='underline-offset-2 hover:underline'
    >
      {data.formattedHeadline}
    </Link>
  );
};
