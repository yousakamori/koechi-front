import { Menu } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiMessageRounded, BiChevronDown, BiPencil } from 'react-icons/bi';
import { Badge } from '@/components/ui/badge';
import { Button, CircleButton } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Time } from '@/components/ui/time';
import { Typography } from '@/components/ui/typography';
import { updateTalkSchema } from '@/config/yup-schema';
import { TalkDetails } from '@/types/talk';
// ___________________________________________________________________________
//
export type TalkDetailsHeaderProps = {
  talk: TalkDetails;
  isMine: boolean;
  validating: boolean;
  onUpdateTalk: (values: TalkDetails) => Promise<void>;
  onDeleteTalk: (slug: string) => Promise<void>;
};
// ___________________________________________________________________________
//
export const TalkDetailsHeader: React.VFC<TalkDetailsHeaderProps> = React.memo(
  ({ talk, isMine, validating, onUpdateTalk, onDeleteTalk }) => {
    const [openTitleForm, setOpenTitleForm] = useState(false);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isDirty, isValid },
    } = useForm<{ title: string }>({
      mode: 'onChange',
      resolver: yupResolver(updateTalkSchema),
      defaultValues: {
        title: talk.title,
      },
    });

    const handleActiveTalk = async () => {
      await onUpdateTalk({ ...talk, archived: false });
    };

    const handleArchiveTalk = async () => {
      await onUpdateTalk({ ...talk, archived: true });
    };

    const handleUpdateTitle = async ({ title }: { title: string }) => {
      await onUpdateTalk({ ...talk, title });
      setOpenTitleForm(false);
      reset({ title });
    };

    const handleDeleteTalk = async () => {
      await onDeleteTalk(talk.slug);
    };
    // ___________________________________________________________________________
    //
    return (
      <header>
        {talk.archived && (
          <div className='px-4 py-3 mb-6 bg-red-100 border border-gray-200 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between'>
              <Typography variant='h3' color='error' fontSize='base'>
                このスクラップはアーカイブされており、作成者以外は閲覧できません
              </Typography>
              <Button className='mt-4 sm:mt-0' color='secondary' onClick={handleActiveTalk}>
                アーカイブを解除
              </Button>
            </div>
          </div>
        )}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            {talk.closed_at ? (
              <>
                <Badge className='font-bold' color='secondary' size='sm'>
                  クローズ
                </Badge>
                <Time
                  size='sm'
                  className='ml-2 font-semibold text-gray-800'
                  date={new Date(talk.closed_at)}
                  suffix='にクローズ'
                />
              </>
            ) : (
              <>
                <Badge className='font-bold' color='primary' size='sm'>
                  オープン
                </Badge>
                <Time
                  size='sm'
                  className='ml-2 font-semibold text-gray-800'
                  date={new Date(talk.last_comment_created_at || talk.created_at)}
                  suffix={talk.last_comment_created_at ? 'にコメント追加' : 'に作成'}
                />
              </>
            )}
            {talk.comments_count > 0 && (
              <span className='inline-flex items-center text-sm text-gray-600'>
                <BiMessageRounded />
                <span className='ml-1'>{talk.comments_count}</span>
              </span>
            )}
          </div>
          {isMine && (
            <Dropdown
              position='right'
              className='w-40'
              buttonContent={
                <Menu.Button as={React.Fragment}>
                  <CircleButton variant='none' color='secondary' aria-label='メニューを開く'>
                    <BiChevronDown />
                  </CircleButton>
                </Menu.Button>
              }
            >
              <div>
                {talk.archived && (
                  <Menu.Item>
                    <button
                      onClick={handleDeleteTalk}
                      className='block w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-100'
                    >
                      トークを削除
                    </button>
                  </Menu.Item>
                )}
                {!talk.archived && (
                  <Menu.Item>
                    <button
                      onClick={handleArchiveTalk}
                      className='block w-full px-4 py-3 text-sm text-left text-red-500 hover:bg-red-100'
                    >
                      トークをアーカイブ
                    </button>
                  </Menu.Item>
                )}
              </div>
            </Dropdown>
          )}
        </div>

        <div className='flex items-center mt-6'>
          {openTitleForm ? (
            <>
              <Input
                {...register('title')}
                autoFocus
                className='flex-1'
                color='secondary'
                fullWidth
              />
              <Button
                onClick={handleSubmit(handleUpdateTitle)}
                disabled={!isDirty || !isValid}
                loading={validating}
                variant='outlined'
                color='secondary'
                className='ml-3'
              >
                保存
              </Button>
              <Button
                variant='link'
                color='secondary'
                onClick={() => {
                  setOpenTitleForm(false);
                  reset({ title: talk.title });
                }}
              >
                キャンセル
              </Button>
            </>
          ) : (
            <>
              <div className='break-all'>
                <Typography variant='h1' align='left'>
                  {talk.title}
                </Typography>
              </div>
              {isMine && (
                <CircleButton
                  onClick={() => setOpenTitleForm(true)}
                  aria-label='タイトルを編集'
                  tooltip
                  variant='none'
                  color='secondary'
                  size='md'
                >
                  <BiPencil />
                </CircleButton>
              )}
            </>
          )}
        </div>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </header>
    );
  },
);
// ___________________________________________________________________________
//
TalkDetailsHeader.displayName = 'TalkDetailsHeader';
