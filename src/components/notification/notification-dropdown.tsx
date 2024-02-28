import { Bell } from 'lucide-react';
import React from 'react';

import type { INotification } from '@/lib/types';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

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
        align='end'
        sideOffset={8}
        side='bottom'
      >
        <DropdownMenuLabel className='text-foreground/70'>Notification</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='max-h-100 overflow-y-auto overflow-x-hidden'>
          {notifications.map((notification, index) => (
            <React.Fragment key={`notification-item-${notification.id}`}>
              {index !== 0 && <DropdownMenuSeparator />}
              <NotificationDropdownItem notification={notification} />
            </React.Fragment>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
