import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { SearchTabs } from './search-tabs';
import { UserItem } from './user-item';
import { notesApi } from '@/api/notes';
import { Layout } from '@/components/common/layout';
import { NoteItem } from '@/components/me/notes/note-item'; // TODO: 共通化 => 名前 / ディレクトリ変更
import { TalkLatestItem } from '@/components/pages/talks-latest/talks-latest-item'; // TODO: 共通化 => 名前 / ディレクトリ変更
import { CircleButton } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { Note } from '@/types/note';
import { Talk } from '@/types/talk';
import { OmitUser } from '@/types/user';
// ___________________________________________________________________________
//
export type SearchNotes = {
  notes: Note[];
  next_page: NextPage;
};

export type SearchTalks = {
  talks: Talk[];
  next_page: NextPage;
};

export type SearchUsers = {
  users: OmitUser[];
  next_page: NextPage;
};

export type SearchResult = SearchNotes | SearchTalks | SearchUsers;
export type SearchCount = { notes_count?: number; talks_count: number; users_count: number };
// ___________________________________________________________________________
//
const sources = ['notes', 'talks', 'users'] as const;
export type Source = typeof sources[number];

const isSource = (source: string): source is Source => {
  return sources.includes(source as Source);
};
// ___________________________________________________________________________
//

// TODO: 表示するときzennみたいにfadeupさせたいな
export const Search: React.VFC = () => {
  const router = useRouter();
  const {
    page = '1', // TODO: 他のとこもこれでいい？
    q = '',
    source = '',
  } = router.query as { page: string; q: string; source: string };
  const currentPage = Number(page);
  const [keyword, setKeyword] = useState('');

  const { data: searchCount } = useSWR<SearchCount, HttpError>(
    q ? `${endpoints.searchCount}?q=${encodeURIComponent(q)}` : null,
    fetchApi,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const searchResultFound = useMemo(() => {
    if (!searchCount) {
      return false;
    }

    if (Object.values(searchCount).find((c) => c > 0)) {
      return true;
    }

    return false;
  }, [searchCount]);

  const sourceQuery = useMemo<Source | undefined>(() => {
    if (!searchResultFound || !searchCount) {
      return;
    }

    if (isSource(source)) {
      return source;
    }

    if (searchCount.notes_count && searchCount.notes_count > 0) {
      return 'notes';
    }

    if (searchCount.talks_count > 0) {
      return 'talks';
    }

    if (searchCount.users_count > 0) {
      return 'users';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCount, searchResultFound, source]);

  const {
    data: searchResult,
    mutate,
    error,
  } = useSWR<SearchResult, HttpError>(
    searchResultFound && sourceQuery
      ? `${endpoints.search}?q=${encodeURIComponent(q)}&source=${sourceQuery}&page=${currentPage}`
      : null,
    fetchApi,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword) {
      router.push(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  const handleDeleteNote = useCallback(
    async (slug: string) => {
      try {
        await notesApi.deleteNote(slug);
        mutate();
        toast.success('削除しました');
      } catch (err) {
        if (err instanceof HttpError) {
          toast.error(err.message);
        } else {
          throw err;
        }
      }
    },
    [mutate],
  );

  useEffect(() => {
    setKeyword(q);
  }, [q]);
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title='検索' />
      <Layout>
        <div className='min-h-screen py-10 bg-white'>
          <Container className='max-w-5xl'>
            <form
              onSubmit={handleSubmit}
              className='relative flex items-center w-full px-5 py-1.5 mt-10 border rounded-full border-secondary-300 focus-within:border-blue-500'
            >
              <input
                autoFocus
                value={keyword}
                className='w-full bg-transparent outline-none pr-7 text-secondary-800'
                enterKeyHint='search'
                type='text'
                placeholder='キーワードを入力...'
                onChange={(e) => setKeyword(e.target.value)}
              />

              <CircleButton aria-label='検索' color='secondary' type='submit'>
                <BiSearch className='text-2xl' />
              </CircleButton>
            </form>

            <div className='mt-6'>
              <SearchTabs keyword={q} searchCount={searchCount} sourceQuery={sourceQuery} />
            </div>

            {(!searchCount || sourceQuery) && !error && !searchResult && q && (
              <div className='mt-6'>
                <Spinner color='primary' size='md' />
              </div>
            )}

            {error && (
              <div className='flex justify-center mt-6'>
                <Typography color='textSecondary' fontSize='lg'>
                  {error.message}
                </Typography>
              </div>
            )}

            {searchCount && searchResult && (
              <>
                {sourceQuery === 'notes' && (
                  <div className='flex flex-wrap justify-between mt-6'>
                    {(searchResult as SearchNotes).notes.map((note) => (
                      <div key={note.id} className='sm:w-[48%] w-full'>
                        {/* // TODO: talkと同じようにdivideにしたいな */}
                        <NoteItem note={note} onDeleteNote={handleDeleteNote} />
                      </div>
                    ))}
                  </div>
                )}

                {sourceQuery === 'talks' && (
                  <div className='mt-6 border border-gray-200 divide-y divide-gray-200 rounded-lg'>
                    {(searchResult as SearchTalks).talks.map((talk) => (
                      <TalkLatestItem key={talk.id} talk={talk} />
                    ))}
                  </div>
                )}

                {sourceQuery === 'users' && (
                  <div className='flex flex-wrap justify-between mt-6'>
                    {(searchResult as SearchUsers).users.map((user) => (
                      <UserItem key={user.id} user={user} />
                    ))}
                  </div>
                )}

                <div className='mt-6'>
                  <Pagination nextPage={searchResult.next_page} />
                </div>
              </>
            )}

            {searchCount && !searchResult && q && !sourceQuery && (
              <div className='flex justify-center mt-6'>
                <Typography color='textSecondary' fontSize='lg'>
                  {q} の検索結果が見つかりませんでした
                </Typography>
              </div>
            )}
          </Container>
        </div>
      </Layout>
    </>
  );
};
