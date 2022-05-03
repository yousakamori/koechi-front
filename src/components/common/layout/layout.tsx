import dynamic from 'next/dynamic';
import React from 'react';
import { FooterProps } from '../footer/footer';
import { Header } from '@/components/common/header';
import { Nav } from '@/components/common/nav';
// ___________________________________________________________________________
//
const Footer = dynamic<FooterProps>(() =>
  import('@/components/common/footer').then((mod) => mod.Footer),
);
// ___________________________________________________________________________
//
export type LayoutProps = {
  children: React.ReactNode;
  navbar?: boolean;
  footer?: boolean;
};
// ___________________________________________________________________________
//
export const Layout: React.VFC<LayoutProps> = ({ children, navbar = false, footer = true }) => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <Header />
      {navbar && <Nav />}
      {children}
      <Footer show={footer} />
    </>
  );
};
