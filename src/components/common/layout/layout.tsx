import { NextSeo, NextSeoProps } from 'next-seo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { FooterProps } from '../footer/footer';
import { Header } from '@/components/common/header';
import { Nav } from '@/components/common/nav';
import { SITE_URL } from '@/lib/constants';
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
  const router = useRouter();
  const seoProps: NextSeoProps = {
    title: customMeta?.title,
    titleTemplate: customMeta?.titleTemplate,
    description: customMeta?.description,
    openGraph: {
      title: customMeta?.title,
      url: `${SITE_URL}${router.asPath}`,
      images: [
        {
          url: customMeta?.ogpImage || `${SITE_URL}/images/ogp-image-light.png`,
          width: customMeta?.ogpImageWidth,
          height: customMeta?.ogpImageHeight,
        },
      ],
    },
    twitter: {
      cardType: customMeta?.twitterCardType,
    },
  };
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo {...seoProps} />
      <Header />
      {navbar && <Nav />}
      {children}
      <Footer show={footer} />
    </>
  );
};
