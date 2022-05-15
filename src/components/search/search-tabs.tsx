import React, { useMemo } from 'react';
import { SearchCount, Source } from './search';
import { FadeInUp } from '@/components/ui/fade-in-up';
import { Tabs, Tab } from '@/components/ui/tabs';
// ___________________________________________________________________________
//
export type SearchTabsProps = {
  keyword: string;
  searchCount: SearchCount | undefined;
  sourceQuery: Source | undefined;
};
// ___________________________________________________________________________
//
export const SearchTabs: React.VFC<SearchTabsProps> = ({ keyword, searchCount, sourceQuery }) => {
  const tabs = useMemo<Tab[]>(() => {
    if (!searchCount) {
      return [];
    }

    const tabs = [];

    if (searchCount.notes_count && searchCount.notes_count > 0) {
      tabs.push({
        name: `ノート ${searchCount.notes_count}`,
        route: `/search?q=${keyword}&source=notes`,
        active: sourceQuery === 'notes',
      });
    }

    if (searchCount.talks_count > 0) {
      tabs.push({
        name: `トーク ${searchCount.talks_count}`,
        route: `/search?q=${keyword}&source=talks`,
        active: sourceQuery === 'talks',
      });
    }

    if (searchCount.users_count > 0) {
      tabs.push({
        name: `ユーザー ${searchCount.users_count}`,
        route: `/search?q=${keyword}&source=users`,
        active: sourceQuery === 'users',
      });
    }

    return tabs;
  }, [searchCount, keyword, sourceQuery]);
  // ___________________________________________________________________________
  //
  if (!searchCount || !tabs.length) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return (
    <FadeInUp>
      <Tabs tabs={tabs} />
    </FadeInUp>
  );
};
