import { FileSpreadsheet, PieChart, Sheet, StickyNote } from 'lucide-react';

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
    name: 'View profile',
    href: '/user/profile',
  },
  {
    name: 'Settings',
    href: '/user/settings',
  },
  {
    name: 'Support',
    href: '/support',
  },
];

export const allRoutes = [...siteRoutes, ...userRoutes];
