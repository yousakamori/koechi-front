// TODO: OGPとか未設定
import { BRAND_NAME, SEO_TITLE, SEO_DESCRIPTION, SITE_URL } from '@/lib/constants';
// ___________________________________________________________________________
//
export const SEO = {
  title: undefined,
  titleTemplate: `%s | ${BRAND_NAME}`,
  defaultTitle: SEO_TITLE,
  description: SEO_DESCRIPTION,
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    type: 'website',
    locale: 'en_IE',
    url: SITE_URL,
    site_name: BRAND_NAME,
    images: [
      {
        url: '/card.png',
        width: 800,
        height: 600,
        alt: BRAND_NAME,
      },
    ],
  },
  twitter: {
    handle: `@${BRAND_NAME}`,
    site: `@${BRAND_NAME}`,
    cardType: 'summary_large_image',
  },
};
