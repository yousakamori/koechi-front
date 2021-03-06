import clsx from 'clsx';
import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { APP_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
const FOOTER_LINKS = [
  {
    name: 'コンテンツ',
    links: [
      { name: 'トーク', route: '/talks' },
      { name: '検索', route: '/search' },
    ],
  },
  {
    name: 'メニュー',
    links: [
      { name: `${APP_NAME}について`, route: '/about' },
      { name: 'お問い合わせ', route: 'https://forms.gle/csLMHRHZTP9d6rPh9' },
    ],
  },
  {
    name: 'リンク',
    links: [
      { name: 'Twitter', route: 'https://twitter.com/koechicom' },
      { name: 'プロフィール', route: 'https://younakamura.vercel.app/' },
    ],
  },
];
// ___________________________________________________________________________
//
type FooterLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
};
// ___________________________________________________________________________
//
const FooterLink: React.VFC<FooterLinkProps> = (props) => {
  const { children, href, ...rest } = props;
  const isExternalLink = /^(https|http):\/\//.test(href);
  const classes = clsx('text-sm', 'text-secondary-500', 'hover:underline');
  // ___________________________________________________________________________
  //
  if (isExternalLink) {
    return (
      <a
        href={href}
        className={classes}
        target='_blank'
        rel='nofollow noopener noreferrer'
        {...rest}
      >
        {children}
      </a>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <Link href={href}>
      <a className={classes} {...rest}>
        {children}
      </a>
    </Link>
  );
};
// ___________________________________________________________________________
//
export type FooterProps = {
  show?: boolean;
};
// ___________________________________________________________________________
//
export const Footer: React.VFC<FooterProps> = ({ show = true }) => {
  // ___________________________________________________________________________
  //
  if (!show) {
    return null;
  }
  // ___________________________________________________________________________
  //
  return (
    <footer className='pt-10'>
      <Container>
        <div className='grid grid-cols-1 gap-4 sm:gap-16 sm:grid-cols-3 md:grid-cols-4'>
          <div className='flex col-span-1 mb-3 sm:col-span-4 md:col-span-1 md:mb-0'>
            <div>
              <Link href='/'>
                <a className='flex items-center pb-2 mb-1 space-x-1'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src='/images/logo.svg' width='120' height='28' alt={APP_NAME} />
                </a>
              </Link>
              <Typography
                align='left'
                variant='p'
                color='textSecondary'
                fontSize='sm'
                className='whitespace-nowrap'
              >
                介護のための
                <br className='hidden md:inline' />
                情報共有コミュニティ
              </Typography>
            </div>
          </div>
          {FOOTER_LINKS.map((column) => (
            <nav className='block' key={column.name}>
              <Typography
                align='left'
                variant='h4'
                color='textPrimary'
                fontSize='sm'
                fontWeight='semibold'
                className='pb-2 mb-1 border-b border-secondary-200 sm:border-none'
              >
                {column.name}
              </Typography>
              <ul>
                {column.links.map((link) => (
                  <li className='mt-2' key={link.name}>
                    <FooterLink href={link.route}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <Typography align='left' variant='p' color='textPrimary' className='py-4 mt-8 text-center'>
          © {APP_NAME}
        </Typography>
      </Container>
    </footer>
  );
};
