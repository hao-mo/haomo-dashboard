import Link from 'next/link';
import { useParams } from 'next/navigation';

import type { FormattedNews } from '../type';

export const CellLink = ({ data }: { data: FormattedNews }) => {
  const params = useParams();

  return (
    <Link
      href={`/dashboard/project/${params.projectId}/news/${data.slug}`}
      className='underline-offset-2 hover:underline'
    >
      {data.formattedHeadline}
    </Link>
  );
};
