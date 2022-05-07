import { useCallback, useState, useEffect } from 'react';
import { talksApi } from '@/api/talks';
import { HttpError } from '@/error/http-error';
import { TalkDetails } from '@/types/talk';
// ___________________________________________________________________________
//
export const useTalkDetails = (initialTalk?: TalkDetails) => {
  const [talk, setTalk] = useState(initialTalk);
  const [validating, setValidating] = useState(false);

  const createTalk = useCallback(async (values: { title: string }) => {
    setValidating(true);
    try {
      const { talk } = await talksApi.createTalk(values);

      return { slug: talk.slug };
    } catch (err) {
      if (err instanceof HttpError) {
        return { error: err };
      }
      throw err;
    } finally {
      setValidating(false);
    }
  }, []);

  const updateTalk = useCallback(
    async (values: Pick<TalkDetails, 'slug' | 'title' | 'closed' | 'archived' | 'closed_at'>) => {
      setValidating(true);
      try {
        await talksApi.updateTalk({
          slug: values.slug,
          title: values.title,
          closed: values.closed,
          archived: values.archived,
        });
        setTalk((prev) => (prev ? { ...prev, ...values } : prev));
        return {};
      } catch (err) {
        if (err instanceof HttpError) {
          return { error: err };
        }
        throw err;
      } finally {
        setValidating(false);
      }
    },
    [],
  );

  const deleteTalk = useCallback(async (slug: string) => {
    setValidating(true);
    try {
      await talksApi.deleteTalk(slug);
      return {};
    } catch (err) {
      if (err instanceof HttpError) {
        return { error: err };
      }
      throw err;
    } finally {
      setValidating(false);
    }
  }, []);

  useEffect(() => {
    setTalk(initialTalk);
  }, [initialTalk]);

  return {
    talk,
    validating,
    createTalk,
    updateTalk,
    deleteTalk,
  };
};
