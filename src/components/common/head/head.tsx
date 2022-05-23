import { NextSeo, NextSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { SITE_URL } from '@/lib/constants';
import { Meta } from '@/types/meta';
// ___________________________________________________________________________
//
export type HeadProps = {
  customMeta?: Meta;
};
// ___________________________________________________________________________
//
export const Head: React.VFC<HeadProps> = ({ customMeta }) => {
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
  return <NextSeo {...seoProps} />;
};
