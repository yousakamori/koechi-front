import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { AnchorHTMLAttributes } from 'react';
import { Container } from '@/components/ui/container';
import { BRAND_NAME } from '@/lib/constants';
// ___________________________________________________________________________
//
type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
};
// ___________________________________________________________________________
//
const NavLink: React.VFC<NavLinkProps> = ({ children, href, className, ...rest }) => {
  const { pathname } = useRouter();
  const classes = clsx(
    pathname === href
      ? ['text-secondary-800', 'border-primary-400', 'border-b-2', 'font-semibold']
      : ['text-secondary-500', 'hover:text-secondary-800', 'border-transparent'],
    'block',
    'py-4',
    'text-xs',
    'sm:text-sm',
    'focus:outline-none',
    'focus:text-secondary-800',
    'whitespace-no-wrap',
    className,
  );
  // ___________________________________________________________________________
  //
  return (
    <Link href={href as string}>
      <a className={classes} {...rest}>
        {children}
      </a>
    </Link>
  );
};
// ___________________________________________________________________________
//
export const navigations = [
  { name: 'ホーム', route: '/' },
  { name: 'トーク', route: '/talks/explore' },
  { name: `${BRAND_NAME}について`, route: '/about' },
];
// ___________________________________________________________________________
//
export const Nav: React.VFC = () => {
  return (
    <nav className='sticky top-0 z-20 bg-white border-b border-secondary-200 '>
      <Container>
        <div className='flex items-center space-x-6 sm:space-x-8'>
          {navigations.map((n) => (
            <NavLink key={n.name} href={n.route}>
              {n.name}
            </NavLink>
          ))}
        </div>
      </Container>
    </nav>
  );
};
