import { useCallback, useState, useEffect } from 'react';
import { likesApi } from '@/api/likes';
import { talksApi, CreateTalkRequest } from '@/api/talks';
import { HttpError } from '@/error/http-error';
import { TalkDetails } from '@/types/talk';
// ___________________________________________________________________________
//
type CreateTalk = (values: CreateTalkRequest) => Promise<{ slug?: string; error?: HttpError }>;
type UpdateTalk = (values: TalkDetails) => Promise<{ error?: HttpError }>;
type DeleteTalk = (slug: string) => Promise<{ error?: HttpError }>;
type LikeTalk = (values: TalkDetails) => Promise<{ error?: HttpError }>;
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

  const likeTalk = useCallback<LikeTalk>(
    async ({ id, current_user_liked }) => {
      setValidating(true);
      try {
        if (!talk) {
          return {};
        }

        const { liked } = await likesApi.createLike({
          liked: !current_user_liked,
          likable_id: id,
          likable_type: 'Talk',
        });

        setTalk({
          ...talk,
          current_user_liked: liked,
          liked_count: liked ? ++talk.liked_count : --talk.liked_count,
        });

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
    [talk],
  );

  useEffect(() => {
    setTalk(initialTalk);
  }, [initialTalk]);

  return {
    talk,
    validating,
    createTalk,
    updateTalk,
    deleteTalk,
    likeTalk,
  };
};
