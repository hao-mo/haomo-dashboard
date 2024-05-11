'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';

import type { Tag } from '../type';

export const NewsTagList = ({ tags }: { tags: Tag[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tagIds = searchParams.get('tagIds');

  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(
    new Set(tagIds ? tagIds.split(',') : [])
  );

  const handleTagClick = useCallback(
    (tagId: string) => {
      const newSelectedIds = new Set(selectedTagIds);
      if (newSelectedIds.has(tagId)) {
        newSelectedIds.delete(tagId);
      } else {
        newSelectedIds.add(tagId);
      }
      setSelectedTagIds(newSelectedIds);
    },
    [selectedTagIds]
  );

  useEffect(() => {
    setSelectedTagIds(new Set(tagIds ? tagIds.split(',') : []));
  }, [tagIds]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (selectedTagIds.size === 0) {
      newSearchParams.delete('tagIds');
      router.push(`${pathname}?${newSearchParams.toString()}`);
    } else {
      newSearchParams.set('tagIds', Array.from(selectedTagIds).join(','));
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [selectedTagIds]);

  return (
    <div className='w-full rounded-md border p-4'>
      <div className='flex items-start'>
        <div className='mr-4'>
          <span className='text-xs font-normal text-muted-foreground'>標籤列表</span>
        </div>
        <div className='flex flex-1 flex-wrap items-center gap-2'>
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={selectedTagIds.has(tag.id) ? 'default' : 'secondary'}
              className='shrink-0 cursor-pointer underline-offset-2 hover:underline'
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.formattedValue}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
