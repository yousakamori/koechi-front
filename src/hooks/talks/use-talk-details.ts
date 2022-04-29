import { useCallback, useState, useEffect } from 'react';
import { talksApi, CreateTalkRequest } from '@/api/talks';
import { HttpError } from '@/error/http-error';
import { TalkDetails } from '@/types/talk';
// ___________________________________________________________________________
//
type CreateTalk = (values: CreateTalkRequest) => Promise<{ slug?: string; error?: HttpError }>;
type UpdateTalk = (values: TalkDetails) => Promise<{ error?: HttpError }>;
type DeleteTalk = (slug: string) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useTalkDetails = (initialTalk: TalkDetails | null = null) => {
  const [talk, setTalk] = useState<TalkDetails | null>(initialTalk);
  const [validating, setValidating] = useState(false);

  const createTalk = useCallback<CreateTalk>(async (values) => {
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

  const updateTalk = useCallback<UpdateTalk>(async (values) => {
    setValidating(true);
    try {
      await talksApi.updateTalk(values);
      setTalk(values);
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

  const deleteTalk = useCallback<DeleteTalk>(async (slug) => {
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
