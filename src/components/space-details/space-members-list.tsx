import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { SpaceInviteFormProps } from './space-invite-form';
import { membersApi } from '@/api/members';
import { MemberItemProps } from '@/components/models/member';
import { Spinner } from '@/components/ui/spinner';
import { endpoints } from '@/config/endpoints';
import { HttpError } from '@/error/http-error';
import { fetchApi } from '@/lib/fetch-api';
import { Member } from '@/types/member';
// ___________________________________________________________________________
//
const SpaceInviteForm = dynamic<SpaceInviteFormProps>(() =>
  import('./space-invite-form').then((mod) => mod.SpaceInviteForm),
);

const MemberItem = dynamic<MemberItemProps>(() =>
  import('@/components/models/member').then((mod) => mod.MemberItem),
);
// ___________________________________________________________________________
//
export type SpaceMembersListProps = {
  slug: string;
};
// ___________________________________________________________________________
//
export const SpaceMembersList: React.VFC<SpaceMembersListProps> = React.memo(({ slug }) => {
  const [validating, setValidating] = useState(false);
  const { data, mutate } = useSWR<{ members: Member[]; space: { role: Role } }, HttpError>(
    endpoints.spaceMembers(slug),
    fetchApi,
  );

  const handleUpdateMember = useCallback(
    async (values: { username: string; role: Role }) => {
      if (!data) {
        return;
      }
      setValidating(true);
      try {
        await membersApi.updateMember({ ...values, slug });

        mutate(
          {
            members: data.members.map((member) =>
              member.username === values.username ? { ...member, role: values.role } : member,
            ),
            space: data.space,
          },
          false,
        );

        mutate();
        toast.success(`${values.role === 'admin' ? '管理者' : 'メンバー'}に変更しました`);
      } catch (err) {
        if (err instanceof HttpError) {
          toast.error(err.message);
        } else {
          throw err;
        }
      } finally {
        setValidating(false);
      }
    },
    [data, mutate, slug],
  );

  const handleCreateMember = useCallback(
    async (username: string) => {
      if (!data) {
        return;
      }
      setValidating(true);
      try {
        const { member } = await membersApi.createMember({ slug, username });
        mutate({ members: [...data?.members, member], space: data?.space }, false);

        toast.success('ユーザーを招待しました');
      } catch (err) {
        if (err instanceof HttpError) {
          toast.error(err.message);
        } else {
          throw err;
        }
      } finally {
        setValidating(false);
      }
    },
    [data, mutate, slug],
  );

  const handleDeleteMember = useCallback(
    async (username: string) => {
      if (!data) {
        return;
      }

      setValidating(true);
      try {
        await membersApi.deleteMember({ slug, username });
        mutate(
          {
            members: data.members.filter((member) => member.username !== username),
            space: data?.space,
          },
          false,
        );

        toast.success('ユーザーを退出させました');
      } catch (err) {
        if (err instanceof HttpError) {
          toast.error(err.message);
        } else {
          throw err;
        }
      } finally {
        setValidating(false);
      }
    },
    [data, mutate, slug],
  );
  // ___________________________________________________________________________
  //
  if (!data) {
    return (
      <div className='mt-6'>
        <Spinner color='primary' size='md' />
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <>
      {/* invite form */}
      {data.space.role === 'admin' && (
        <div className='mt-6'>
          <SpaceInviteForm
            members={data.members}
            validating={validating}
            onCreateMember={handleCreateMember}
          />
        </div>
      )}

      {/* member list */}
      <div className='mt-4'>
        {data.members.map((member) => (
          <MemberItem
            key={member.id}
            member={member}
            role={data.space.role}
            onUpdateMember={handleUpdateMember}
            onDeleteMember={handleDeleteMember}
          />
        ))}
      </div>
    </>
  );
});
// ___________________________________________________________________________
//
SpaceMembersList.displayName = 'SpaceMembersList';
