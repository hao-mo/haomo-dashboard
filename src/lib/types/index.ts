export type Theme = 'light' | 'dark';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export interface INotification {
  id: string;
  title: string;
  description: string;
  date: Date;
  isRead: boolean;
}

export type IRoute = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  routes?: IRoute[];
};

export interface Option {
  value: string;
  name: string;
}

export interface FormState {
  message: string;
}
