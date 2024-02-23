import { PieChart, StickyNote } from 'lucide-react';

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

export const allRoutes = [...siteRoutes];
