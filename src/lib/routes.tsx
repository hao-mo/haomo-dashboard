import {
  FileSpreadsheet,
  HeadsetIcon,
  PieChart,
  SettingsIcon,
  Sheet,
  StickyNote,
  UserRoundIcon,
} from 'lucide-react';

import type { IRoute } from './types';

export const siteRoutes: IRoute[] = [
  {
    name: 'Blogs',
    href: '/blogs',
    icon: <StickyNote size={20} />,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: <PieChart size={20} />,
  },
  {
    name: 'Tables',
    href: '/tables',
    icon: <Sheet size={20} />,
  },
  {
    name: 'Forms',
    href: '/forms',
    icon: <FileSpreadsheet size={20} />,
  },
];

export const userRoutes: IRoute[] = [
  {
    name: 'Account preferences',
    href: '/user/profile',
    icon: <UserRoundIcon size={14} />,
  },
  {
    name: 'Settings',
    href: '/user/settings',
    icon: <SettingsIcon size={14} />,
  },
  {
    name: 'Support',
    href: '/support',
    icon: <HeadsetIcon size={14} />,
  },
];

export const allRoutes = [...siteRoutes, ...userRoutes];
