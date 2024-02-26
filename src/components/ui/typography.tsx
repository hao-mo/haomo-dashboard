'use client';

import { m } from 'framer-motion';
import { createElement, forwardRef } from 'react';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

export type TypographyProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
} & (HeadingProps | ParagraphProps | SpanProps);

export const Typography = forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  const { as: Element = 'span', ...rest } = props;

  return createElement(Element, { ref, ...rest }, props.children);
});

Typography.displayName = 'Typography';

export const MotionTypography = m(Typography);
