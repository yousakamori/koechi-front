import { getUnixTime } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { notesApi } from '@/api/notes';
import { Button } from '@/components/ui/button';
import { Tabs, Tab } from '@/components/ui/tabs';
import { HttpError } from '@/error/http-error';
// ___________________________________________________________________________
//
export type SpaceTabsProps = {
  slug: string;
  tabs: Tab[];
};
// ___________________________________________________________________________
//
export const SpaceTabs: React.VFC<SpaceTabsProps> = React.memo(({ slug, tabs }) => {
  const [validating, setValidating] = useState(false);
  const router = useRouter();

  const handleCreateNote = useCallback(async () => {
    setValidating(true);

    try {
      const { slug: noteSlug } = await notesApi.createNote({
        spaceSlug: slug,
        postedAt: getUnixTime(Date.now()),
      });

      router.push(`/notes/${noteSlug}/edit`);
    } catch (err) {
      if (err instanceof HttpError) {
        toast.error(err.message);
      } else {
        throw err;
      }
    } finally {
      setValidating(false);
    }
  }, [router, slug]);
  // ___________________________________________________________________________
  //
  return (
    <Tabs tabs={tabs}>
      <div className='pb-1 ml-6'>
        <Button onClick={handleCreateNote} loading={validating} variant='outlined' roundedFull>
          ノートを作成
        </Button>
      </div>
    </Tabs>
  );
});
// ___________________________________________________________________________
//
SpaceTabs.displayName = 'SpaceTabs';
