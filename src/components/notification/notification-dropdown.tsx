import { Bell } from 'lucide-react';
import React from 'react';

import type { INotification } from '@/lib/types';

import { Button } from '../button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../dropdown-menu';

import { NotificationDropdownItem } from './notification-dropdown-item';

const notifications: INotification[] = [
  {
    id: '1',
    title: 'New notification',
    description: 'You have a new notification from John Doe 123456',
    date: new Date(),
    isRead: false,
  },
  {
    id: '2',
    title: 'New notification',
    description: 'You have a new notification from John Doe 123456',
    date: new Date(),
    isRead: true,
  },
];

export const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='group'
      >
        <Button
          variant='outline'
          size='circle'
        >
          <Bell size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='center'
        sideOffset={5}
        className='px-2'
      >
        <h4 className='border-b border-border px-4 py-2 text-foreground/70'>Notification</h4>
        <div className='my-2 max-h-100 overflow-y-auto'>
          {notifications.map((notification, index) => (
            <React.Fragment key={`notification-item-${notification.id}`}>
              {index !== 0 && <div className='my-2 h-px w-full border-t border-border' />}
              <NotificationDropdownItem notification={notification} />
            </React.Fragment>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
