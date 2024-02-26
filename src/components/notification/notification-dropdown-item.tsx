import type { INotification } from '@/lib/types';
import { capitalize } from '@/utils';
import { formatDistance } from '@/utils/format';

import { DropdownMenuItem } from '../ui/dropdown-menu';

export const NotificationDropdownItem = ({ notification }: { notification: INotification }) => {
  return (
    <DropdownMenuItem className='block w-full cursor-pointer gap-2 px-4'>
      <h5 className='block text-sm'>{notification.title}</h5>
      <p className='block max-w-80 truncate text-xs text-foreground/80'>
        {notification.description}
      </p>
      <span className='text-xs text-foreground/50'>
        {capitalize(formatDistance(notification.date))}
      </span>
    </DropdownMenuItem>
  );
};
