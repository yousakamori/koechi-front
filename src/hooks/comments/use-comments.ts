import produce from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { commentsApi, CreateCommentRequest } from '@/api/comments';
import { HttpError } from '@/error/http-error';
import { assertIsDefined } from '@/lib/assertion';
import { Comment } from '@/types/comment';
// TODO: useSWRにしたい => https://sergiodxa.com/articles/swr/mutate-immer
// ___________________________________________________________________________
//
type CreateComment = (values: CreateCommentRequest) => Promise<{ error?: HttpError }>;
type UpdateComment = (values: Comment) => Promise<{ error?: HttpError }>;
type DeleteComment = (values: Comment) => Promise<{ error?: HttpError }>;
// ___________________________________________________________________________
//
export const useComments = (initialComments: Comment[] = []) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [validating, setValidating] = useState(false);

  const createComment = useCallback<CreateComment>(async (values) => {
    setValidating(true);
    try {
      const { comment: createdComment } = await commentsApi.createComment(values);

      setComments((comments) =>
        produce(comments, (draftComment) => {
          if (createdComment.parent_id) {
            // child
            const comment = draftComment.find((comment) => comment.id === createdComment.parent_id);

            assertIsDefined(comment);
            assertIsDefined(comment.children);

            comment.children.push(createdComment);
          } else {
            // parent
            draftComment.push(createdComment);
          }
        }),
      );

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

  const updateComment = useCallback<UpdateComment>(
    async ({ parent_id, slug, body_json, body_text }) => {
      setValidating(true);
      try {
        await commentsApi.updateComment({ slug, body_json, body_text });

        setComments((comments) =>
          produce(comments, (draftComment) => {
            if (parent_id) {
              // child
              const comment = draftComment.find((comment) => comment.id === parent_id);

              assertIsDefined(comment);
              assertIsDefined(comment.children);

              const child = comment.children.find((child) => child.slug === slug);

              assertIsDefined(child);

              child.body_json = body_json;
              child.body_text = body_text;
            } else {
              // parent
              const comment = draftComment.find((comment) => comment.slug === slug);

              assertIsDefined(comment);

              comment.body_json = body_json;
              comment.body_text = body_text;
            }
          }),
        );

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

  const deleteComment = useCallback<DeleteComment>(async ({ slug, parent_id }) => {
    setValidating(true);
    try {
      await commentsApi.deleteComment(slug);

      setComments((comments) =>
        produce(comments, (draftComment) => {
          if (parent_id) {
            // child
            const comment = draftComment.find((comment) => comment.id === parent_id);

            assertIsDefined(comment);
            assertIsDefined(comment.children);

            const childIndex = comment.children.findIndex((child) => child.slug === slug);

            comment.children.splice(childIndex, 1);
          } else {
            // parent
            const index = draftComment.findIndex((comment) => comment.slug === slug);
            draftComment.splice(index, 1);
          }
        }),
      );

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
    setComments(initialComments);
  }, [initialComments]);

  return {
    comments,
    validating,
    createComment,
    updateComment,
    deleteComment,
  };
};
