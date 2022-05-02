import React from 'react';
import {
  SearchCount,
  SearchResult as SearchResultType,
  Source,
  SearchNotes,
  SearchTalks,
  SearchUsers,
} from './search';
import { NoteItem } from '@/components/models/note/';
import { TalkItem } from '@/components/models/talk';
import { UserItem } from '@/components/models/user';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
export type SearchResultProps = {
  searchCount?: SearchCount;
  searchResult?: SearchResultType;
  sourceQuery?: Source;
  error?: HttpError;
  searchQuery: string;
  handleDeleteNote: (slug: string) => Promise<void>;
};
// ___________________________________________________________________________
//
// TODO: 表示するときzennみたいにfadeupさせたいな
export const SearchResult: React.VFC<SearchResultProps> = ({
  sourceQuery,
  searchCount,
  error,
  searchResult,
  searchQuery,
  handleDeleteNote,
}) => {
  // ___________________________________________________________________________
  //
  return (
    <>
      {(!searchCount || sourceQuery) && !error && !searchResult && searchQuery && (
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
                  <NoteItem
                    note={note}
                    onDeleteNote={handleDeleteNote}
                    className='border-b border-gray-200'
                  />
                </div>
              ))}
            </div>
          )}

          {sourceQuery === 'talks' && (
            <div className='mt-6 border border-gray-200 divide-y divide-gray-200 rounded-lg'>
              {(searchResult as SearchTalks).talks.map((talk) => (
                <TalkItem key={talk.id} talk={talk} className='p-4' />
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

      {searchCount && !searchResult && searchQuery && !sourceQuery && (
        <div className='flex justify-center mt-6'>
          <Typography color='textSecondary' fontSize='lg'>
            {searchQuery} の検索結果が見つかりませんでした
          </Typography>
        </div>
      )}
    </>
  );
};
