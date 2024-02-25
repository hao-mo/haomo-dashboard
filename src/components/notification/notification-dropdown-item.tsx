import type { INotification } from '@/lib/types';
import { formatDistance } from '@/utils/format';

import { DropdownMenuItem } from '../dropdown-menu';

export const NotificationDropdownItem = ({ notification }: { notification: INotification }) => {
  return (
    <DropdownMenuItem>
      <div className='w-full gap-2 border-b border-border px-2 last:border-none'>
        <h5 className='block text-sm'>{notification.title}</h5>
        <p className='block max-w-80 truncate text-xs text-foreground/80'>
          {notification.description}
        </p>
        <span className='text-xs text-foreground/50'>{formatDistance(notification.date)}</span>
      </div>
    </DropdownMenuItem>
  );
};
