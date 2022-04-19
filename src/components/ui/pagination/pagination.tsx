import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
// ___________________________________________________________________________
//
type PageLinkProps = {
  currentPage: number;
};
// ___________________________________________________________________________
//
const NextPageLink: React.VFC<PageLinkProps> = ({ currentPage }) => {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: { ...router.query, page: currentPage + 1 },
      }}
      passHref
    >
      <Button className='m-2' color='secondary' variant='outlined'>
        次のページ
        <BiRightArrowAlt className='text-lg' />
      </Button>
    </Link>
  );
};
// ___________________________________________________________________________
//
const PrevPageLink: React.VFC<PageLinkProps> = ({ currentPage }) => {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: { ...router.query, page: currentPage - 1 },
      }}
      passHref
    >
      <Button className='m-2' color='secondary' variant='ghost'>
        <BiLeftArrowAlt className='text-lg' />
        {currentPage - 1}ページへ
      </Button>
    </Link>
  );
};
// ___________________________________________________________________________
//
type PaginationWrapperProps = {
  children: React.ReactNode;
};
// ___________________________________________________________________________
//
const PaginationWrapper: React.VFC<PaginationWrapperProps> = ({ children }) => {
  return <nav className='flex flex-wrap justify-center'>{children}</nav>;
};
// ___________________________________________________________________________
//
export type PaginationProps = {
  nextPage: NextPage;
};
// ___________________________________________________________________________
//
export const Pagination: React.VFC<PaginationProps> = ({ nextPage }) => {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  // ___________________________________________________________________________
  //
  if (currentPage === 1 && nextPage === null) {
    // 1ページだけ
    return <></>;
  }
  // ___________________________________________________________________________
  //
  if (currentPage === 1) {
    // 1ページ
    return (
      <PaginationWrapper>
        <NextPageLink currentPage={currentPage} />
      </PaginationWrapper>
    );
  }
  // ___________________________________________________________________________
  //
  if (currentPage > 1 && nextPage === null) {
    // 最終ページ
    return (
      <PaginationWrapper>
        <PrevPageLink currentPage={currentPage} />
      </PaginationWrapper>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <PaginationWrapper>
      <PrevPageLink currentPage={currentPage} />
      <NextPageLink currentPage={currentPage} />
    </PaginationWrapper>
  );
};
