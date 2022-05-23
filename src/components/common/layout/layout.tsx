import dynamic from 'next/dynamic';
import React from 'react';
import { FooterProps } from '../footer/footer';
import { Head } from '../head';
import { Header } from '@/components/common/header';
import { Nav } from '@/components/common/nav';
import { Meta } from '@/types/meta';
// ___________________________________________________________________________
//
const Footer = dynamic<FooterProps>(() =>
  import('@/components/common/footer').then((mod) => mod.Footer),
);
// ___________________________________________________________________________
//
export type LayoutProps = {
  children: React.ReactNode;
  customMeta?: Meta;
  navbar?: boolean;
  footer?: boolean;
};
// ___________________________________________________________________________
//
export const Layout: React.VFC<LayoutProps> = ({
  children,
  customMeta,
  navbar = false,
  footer = true,
}) => {
  // ___________________________________________________________________________
  //
  return (
    <>
      <Head customMeta={customMeta} />
      <Header />
      {navbar && <Nav />}
      {children}
      <Footer show={footer} />
    </>
  );
};
