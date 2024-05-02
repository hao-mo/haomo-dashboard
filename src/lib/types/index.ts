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

export type LocaleString = {
  default: string;
  'zh-TW': string;
  'en-US'?: string;
  'ja-JP'?: string;
};

export enum CONTENT_TYPE {
  PARAGRAPH = 'PARAGRAPH',
  IMAGE = 'IMAGE',
  HEADING = 'SUBHEADLINE',
  LIST = 'LIST',
}

type TextStyle = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: Link;
};

// Define a link type
type Link = {
  href: string;
  text: LocaleString;
  formattedText: string;
};

// Define text with style properties
type Text = {
  content: LocaleString;
  formattedContent: string;
  style?: TextStyle;
};

// Define a paragraph which contains multiple texts
type Paragraph = {
  type: CONTENT_TYPE.PARAGRAPH;
  text: LocaleString;
  formattedText: string;
};

// Define an image type
type Image = {
  type: CONTENT_TYPE.IMAGE;
  alt: LocaleString;
  formattedAlt: string;
  imageUrl: string;
  file?: File;
};

// Define a list item which might contain more lists or styled text
type ListItem = {
  text: Text;
  subList?: List;
};

// Define a list with items that could have nested lists
type List = {
  type: CONTENT_TYPE.LIST;
  listType: 'ordered' | 'unordered';
  items: ListItem[];
};

// Define heading types with levels
type Heading = {
  type: CONTENT_TYPE.HEADING;
  text: LocaleString;
  formattedText: string;
  // level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type Content = Paragraph | Image | Heading;

export type ContentWithId = Content & { id: string };

export type ContentType = Content['type'];
