import { FileSpreadsheet, LogOut, PieChart, Sheet, StickyNote, UserRoundCog } from 'lucide-react';

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
    name: 'Edit account',
    href: '/user/account-setting',
    icon: <UserRoundCog size={16} />,
  },
  {
    name: 'Sign out',
    href: '/logout',
    icon: <LogOut size={16} />,
  },
];

export const allRoutes = [...siteRoutes, ...userRoutes];
