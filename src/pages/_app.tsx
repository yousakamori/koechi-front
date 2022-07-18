import '@/styles/main.css';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { ToastContainerProps } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { Progress } from '@/components/common/progress';
import { GoogleAnalytics } from '@/components/google-analytics';
import { InitializeApp } from '@/components/initialize-app';
import { SEO } from '@/config/next-seo.config';
import { usePageView } from '@/hooks/use-pageview';
// ___________________________________________________________________________
//
const ToastContainer = dynamic<ToastContainerProps>(() =>
  import('react-toastify').then((mod) => mod.ToastContainer),
);
// ___________________________________________________________________________
//
export default function CustomApp({ Component, pageProps }: AppProps) {
  usePageView();
  // ___________________________________________________________________________
  //
  return (
    <>
      <GoogleAnalytics />
      <DefaultSeo {...SEO} />
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/images/icon.svg' type='image/svg+xml' />
      </Head>
      <RecoilRoot>
        <InitializeApp />
        <Component {...pageProps} />
        <Progress />
        <ToastContainer
          toastClassName={() =>
            'relative flex bg-gray-800 p-2 min-h-[48px] text-sm bg-gray-800 rounded-lg justify-between overflow-hidden cursor-pointer'
          }
          hideProgressBar
          closeButton={false}
          position='bottom-right'
        />
      </RecoilRoot>
    </>
  );
}
