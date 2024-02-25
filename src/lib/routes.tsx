import { LogOut, PieChart, StickyNote, UserRoundCog, UsersRound } from 'lucide-react';

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
];

export const userRoutes: IRoute[] = [
  {
    name: 'Account',
    href: '/account-setting',
    icon: <UserRoundCog size={16} />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <UsersRound size={16} />,
  },
  {
    name: 'Logout',
    href: '/logout',
    icon: <LogOut size={16} />,
  },
];

export const allRoutes = [...siteRoutes, ...userRoutes];
