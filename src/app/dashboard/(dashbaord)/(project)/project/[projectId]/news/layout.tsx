import React from 'react';

export default function Layout({
  children,
  modal,
}: PropsWithChildren & { modal: React.ReactNode }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
