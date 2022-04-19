import { Menu } from '@headlessui/react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiChevronDown, BiCheck, BiRightArrowAlt } from 'react-icons/bi';
import { TalksExploreItem } from './talks-explore-item';
import { Layout } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Dropdown } from '@/components/ui/dropdown';
import { Typography } from '@/components/ui/typography';
import { Talk } from '@/types/talk';
// ___________________________________________________________________________
//
export type MyLinkProps = React.PropsWithChildren<LinkProps> & { className: string };
// ___________________________________________________________________________
//
const MyLink: React.VFC<MyLinkProps> = (props) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href} passHref>
      <a {...rest}>{children}</a>
    </Link>
  );
};
// ___________________________________________________________________________
//
export type TalksExploreListProps = {
  talksExplore: { talks: Talk[]; next_page: NextPage };
};
// ___________________________________________________________________________
//
export const TalksExploreList: React.VFC<TalksExploreListProps> = ({
  talksExplore: { talks, next_page },
}) => {
  const router = useRouter();
  // ___________________________________________________________________________
  //
  return (
    <Layout navbar>
      <div className='min-h-screen py-10'>
        <Container className='max-w-5xl'>
          {/* <div className='text-center text-7xl'>💬</div> */}
          <Typography variant='h1' align='center' className='mt-6'>
            トーク
          </Typography>
          <div className='mt-10 -mx-3 border border-gray-200 sm:mx-0 sm:rounded-lg'>
            <div className='px-4 py-4 sm:rounded-t-lg bg-slate-100'>
              <Dropdown
                position='right'
                className='w-36'
                buttonContent={
                  <Menu.Button as={React.Fragment}>
                    <button
                      className='flex items-center font-semibold text-gray-700'
                      aria-label='メニューを開く'
                    >
                      {router.asPath === '/talks/explore' ? '注目のトーク' : '全期間で人気'}
                      <BiChevronDown className='text-lg text-gray-400 hover:text-gray-700' />
                    </button>
                  </Menu.Button>
                }
              >
                <Menu.Item>
                  <MyLink
                    href='/talks/explore'
                    className='flex items-center px-2 py-3 text-sm text-left text-gray-500 border-t border-gray-200 first:border-t-0 hover:bg-gray-100'
                    passHref
                  >
                    <span
                      className={`mr-1 ${
                        router.asPath === '/talks/explore' ? 'visible' : 'invisible'
                      }`}
                    >
                      <BiCheck className='text-lg text-blue-400' />
                    </span>
                    注目のトーク
                  </MyLink>
                </Menu.Item>
                <Menu.Item>
                  <MyLink
                    href='/talks/explore?order=alltime'
                    className='flex items-center px-2 py-3 text-sm text-left text-gray-500 border-t border-gray-200 first:border-t-0 hover:bg-gray-100'
                    passHref
                  >
                    <span
                      className={`mr-1 ${
                        router.asPath === '/talks/explore?order=alltime' ? 'visible' : 'invisible'
                      }`}
                    >
                      <BiCheck className='text-lg text-blue-400' />
                    </span>
                    全期間で人気
                  </MyLink>
                </Menu.Item>
              </Dropdown>
            </div>
            {talks.map((talk) => (
              <TalksExploreItem key={talk.id} talk={talk} />
            ))}
          </div>
          {next_page && (
            <div className='flex items-center justify-center mt-10'>
              <Link href='/talks' passHref>
                <Button variant='link' color='secondary' size='lg'>
                  トークの一覧を見る
                  <BiRightArrowAlt className='text-lg text-secondary-500' />
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};
