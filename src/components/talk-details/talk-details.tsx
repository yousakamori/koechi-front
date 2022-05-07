import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { TalkDetailsHeader } from './talk-details-header';
import { TalkDetailsSidebarProps } from './talk-details-sidebar';
import { TalkNav } from './talk-nav';
import { CommentCreateFormProps } from '@/components/comment-create-form';
import { Layout } from '@/components/common/layout';
import { JumpButtonProps } from '@/components/jump-button';
import { CommentItem } from '@/components/models/comment';
import { LoginLinkModalProps } from '@/components/overlays/login-link-modal';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Spinner } from '@/components/ui/spinner';
import { useComments } from '@/hooks/comments';
import { useCurrentUser } from '@/hooks/current-user';
import { useTalkDetails } from '@/hooks/talks';
import { useToggle } from '@/hooks/toggle';
import { Comment } from '@/types/comment';
import { Participant } from '@/types/participant';
import { TalkDetails as TalkDetailsType } from '@/types/talk';
// ___________________________________________________________________________
//
const LoginLinkModal = dynamic<LoginLinkModalProps>(() =>
  import('@/components/overlays/login-link-modal').then((mod) => mod.LoginLinkModal),
);

const JumpButton = dynamic<JumpButtonProps>(() =>
  import('@/components/jump-button').then((mod) => mod.JumpButton),
);

const CommentCreateForm = dynamic<CommentCreateFormProps>(() =>
  import('@/components/comment-create-form').then((mod) => mod.CommentCreateForm),
);

const TalkDetailsSidebar = dynamic<TalkDetailsSidebarProps>(() =>
  import('./talk-details-sidebar').then((mod) => mod.TalkDetailsSidebar),
);
// ___________________________________________________________________________
//
export type TalkDetailsProps = {
  talk: TalkDetailsType;
  comments: Comment[];
  participants: Participant[];
};
// ___________________________________________________________________________
//
export const TalkDetails: React.VFC<TalkDetailsProps> = ({
  talk: initialTalk,
  comments: initialComments,
  participants,
}) => {
  const { authChecking, currentUser } = useCurrentUser();
  const isMine = useMemo(() => {
    if (currentUser && initialTalk) {
      return currentUser.id === initialTalk.user.id;
    }

    return false;
  }, [currentUser, initialTalk]);

  const [parentComment, setParentComment] = useState<Comment | null>(null);
  const [open, toggleModal] = useToggle();
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    comments,
    validating: commentsValidating,
    createComment,
    updateComment,
    deleteComment,
  } = useComments(initialComments);

  const { talk, validating: talkValidating, updateTalk, deleteTalk } = useTalkDetails(initialTalk);

  const handleOpenReplyForm = useCallback(
    (comment: Comment) => {
      currentUser ? setParentComment(comment) : toggleModal();
    },
    [currentUser, toggleModal],
  );

  const handleCreateComment = useCallback(
    async ({ body_text, body_json }: Pick<Comment, 'body_text' | 'body_json'>) => {
      if (!talk) {
        return;
      }

      const { error } = await createComment({
        body_text,
        body_json,
        commentable_id: talk.id,
        commentable_type: 'Talk',
        parent_id: parentComment?.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setParentComment(null);
        toast.success('投稿しました');
      }
    },
    [createComment, parentComment?.id, talk],
  );

  const handleDeleteComment = useCallback(
    async (values: Comment) => {
      if (!confirm('本当に削除しますか?')) {
        return;
      }

      const { error } = await deleteComment(values);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('削除しました');
      }
    },
    [deleteComment],
  );

  const handleUpdateComment = useCallback(
    async (values: Comment) => {
      const { error } = await updateComment(values);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('更新しました');
      }
    },
    [updateComment],
  );

  const handleDeleteTalk = useCallback(
    async (slug: string) => {
      const { error } = await deleteTalk(slug);

      if (error) {
        toast.error(error.message);
      } else {
        router.replace(`/${currentUser?.username}?tab=talk`);
      }
    },
    [currentUser?.username, deleteTalk, router],
  );

  const handleUpdateTalk = useCallback(
    async ({ slug, title, closed, archived, closed_at }: TalkDetailsType) => {
      const { error } = await updateTalk({ slug, title, closed, archived, closed_at });

      if (error) {
        toast.error(error.message);
      }
    },
    [updateTalk],
  );

  const handleScrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    const hash = router.asPath.split('#')[1] ?? '';

    if (!hash) {
      return;
    }

    const element = document.getElementById(hash);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [router.asPath]);
  // ___________________________________________________________________________
  //
  if (!talk) {
    return <></>;
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      <NextSeo title={initialTalk.title} />

      {/* login link modal */}
      <LoginLinkModal open={open} onClose={toggleModal} />

      {/* jump button */}
      <JumpButton height={5000} onScroll={handleScrollBottom} />

      <Layout>
        {/* nav */}
        <TalkNav talk={talk} participants={participants} />
        <div className='min-h-screen py-10 bg-slate-100'>
          <Container className='max-w-7xl'>
            {/* header */}
            <TalkDetailsHeader
              talk={talk}
              isMine={isMine}
              validating={talkValidating}
              onUpdateTalk={handleUpdateTalk}
              onDeleteTalk={handleDeleteTalk}
            />

            <div className='block mt-6 lg:flex lg:justify-between lg:items-start lg:space-x-8'>
              <main className='w-full lg:w-2/3'>
                {/* initial message */}
                {comments.length === 0 && (
                  <div className='py-6 bg-white'>
                    <p className='text-lg font-semibold text-center text-gray-400'>
                      最初のコメントを追加しましょう
                    </p>
                    <div className='w-full'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className='mx-auto'
                        src='/images/write.svg'
                        width='280'
                        height='280'
                        alt=''
                      />
                    </div>
                  </div>
                )}

                {/* comments */}
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='px-5 py-4 mb-5 bg-white border border-gray-200 rounded-lg'
                  >
                    <CommentItem
                      comment={comment}
                      onUpdateComment={handleUpdateComment}
                      onDeleteComment={handleDeleteComment}
                      onOpenReplyForm={handleOpenReplyForm}
                    ></CommentItem>

                    {comment.children && comment.children.length > 0 && (
                      <div className='pt-4 mt-3 border-t border-gray-200'>
                        {comment.children.map((child) => (
                          <CommentItem
                            key={child.id}
                            comment={child}
                            onUpdateComment={handleUpdateComment}
                            onDeleteComment={handleDeleteComment}
                          />
                        ))}
                        <Button
                          onClick={() => handleOpenReplyForm(comment)}
                          roundedFull
                          size='sm'
                          color='secondary'
                          variant='outlined'
                        >
                          返信を追加
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {/* comment create form */}
                {authChecking ? (
                  <div className='mt-5'>
                    <Spinner color='primary' size='md' />
                  </div>
                ) : (
                  <CommentCreateForm
                    isLogin={!!currentUser}
                    validating={commentsValidating}
                    parentComment={parentComment}
                    onCloseForm={() => {
                      setParentComment(null);
                    }}
                    onCreateComment={handleCreateComment}
                  />
                )}

                {/* scroll bottom */}
                <div ref={bottomRef} />
              </main>

              {/* sidebar */}
              <aside className='sticky flex flex-wrap justify-between w-full mt-12 lg:mt-0 top-8 lg:w-1/3'>
                <TalkDetailsSidebar
                  talk={talk}
                  isMine={isMine}
                  participants={participants}
                  onUpdateTalk={handleUpdateTalk}
                />
              </aside>
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
};
