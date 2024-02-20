export type Theme = 'light' | 'dark';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}
