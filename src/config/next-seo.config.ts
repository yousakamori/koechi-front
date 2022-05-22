import { APP_NAME, SEO_TITLE, SEO_DESCRIPTION, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';
// ___________________________________________________________________________
//
export const SEO = {
  title: undefined,
  titleTemplate: `%s | ${APP_NAME}`,
  defaultTitle: SEO_TITLE,
  description: SEO_DESCRIPTION,
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    type: 'article',
    locale: 'ja_JP',
    url: SITE_URL,
    site_name: APP_NAME,
    images: [
      {
        url: `${SITE_URL}/images/ogp-image-light.png`,
        width: 800,
        height: 600,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    handle: `@${TWITTER_HANDLE}`,
    site: `@${APP_NAME}`,
    cardType: 'summary',
  },
};
