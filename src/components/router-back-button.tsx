'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from './ui/button';

interface RouterBackButtonProps extends React.ComponentPropsWithRef<typeof Button> {}

export const RouterBackButton = ({ children, onClick, ...props }: RouterBackButtonProps) => {
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event);
    router.back();
  };
  return (
    <Button
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};
