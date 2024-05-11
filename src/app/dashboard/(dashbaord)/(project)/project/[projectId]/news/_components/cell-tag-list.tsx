import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';

import { createQueryString } from '@/utils';

import type { Tag } from '../type';

export const CellTagList = ({ tags }: { tags: Tag[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showTags, setShowTags] = useState(tags.slice(0, 3));

  const handleMoreClick = () => {
    setShowTags(tags);
  };

  const handleTagClick = (tagId: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('page');
    router.push(`${pathname}?${createQueryString({ tagIds: tagId }, newSearchParams)}`);
  };

  useEffect(() => {
    setShowTags(tags.slice(0, 3));
  }, [tags]);

  return (
    <div className='flex max-w-60 flex-wrap gap-2'>
      {showTags.map((tag) => (
        <Badge
          key={tag.id}
          variant='secondary'
          className='shrink-0 cursor-pointer underline-offset-2 hover:underline'
          onClick={() => handleTagClick(tag.id)}
        >
          {tag.formattedValue}
        </Badge>
      ))}
      {tags.length > showTags.length && (
        <Badge
          variant='default'
          onClick={handleMoreClick}
        >
          更多
        </Badge>
      )}
    </div>
  );
};
