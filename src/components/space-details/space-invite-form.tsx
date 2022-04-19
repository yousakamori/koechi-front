import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BiX } from 'react-icons/bi';
import { components, OptionProps, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import { autocompleteApi } from '@/api/autocomplete';
import { Avatar } from '@/components/ui/avatar';
import { Button, CircleButton } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { inviteSchema } from '@/config/yup-schema';
import { Member } from '@/types/member';
// ___________________________________________________________________________
//
const Option = (props: OptionProps<Member, false>) => {
  return (
    <components.Option {...props}>
      <div className='flex items-center'>
        <Avatar src={props.data.avatar_small_url} size='sm' />
        <div className='ml-2'>
          <div className='text-xs font-semibold text-gray-800'>{props.data.name}</div>
          <div className='text-xs text-gray-500'>@{props.data.username}</div>
        </div>
      </div>
    </components.Option>
  );
};

const LoadingIndicator = () => {
  return (
    <div className='px-2'>
      <Spinner color='primary' size='sm' />
    </div>
  );
};

const colourStyles: StylesConfig<Member, false> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    border: '1px solid #cbd5e1',
    '&:hover': {
      border: '1px solid #cbd5e1',
    },
    '&:focus': {
      border: '1px solid #38bdf8',
    },
  }),
};
// ___________________________________________________________________________
//
export type SpaceInviteFormProps = {
  members: Member[];
  validating: boolean;
  onCreateMember: (username: string) => void;
};
// ___________________________________________________________________________
//
export const SpaceInviteForm: React.VFC<SpaceInviteFormProps> = ({
  members,
  validating,
  onCreateMember,
}) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const {
    control,
    reset,
    formState: { isDirty, isValid },
    handleSubmit,
  } = useForm<{ username: string }>({
    mode: 'onChange',
    resolver: yupResolver(inviteSchema),
  });

  const disabled = !isDirty || !isValid;

  const handleCreateMember = async ({ username }: { username: string }) => {
    await onCreateMember(username);

    setSelectedMember(null);
    reset();
  };

  const loadOptions = async (username: string) => {
    if (!username) {
      return;
    }

    const { users } = await autocompleteApi.users(username);

    return users.filter((u) => !members.some((p) => p.username === u.username));
  };
  // ___________________________________________________________________________
  //
  if (selectedMember) {
    return (
      <div className='flex items-center justify-between p-3 border border-blue-400 rounded-md grow bg-blue-50'>
        <div className='flex items-center'>
          <Avatar src={selectedMember.avatar_small_url} size='sm' />
          <div className='ml-2'>
            <div className='text-xs font-semibold text-gray-800 line-clamp-1'>
              {selectedMember.name}
            </div>
            <div className='text-xs text-gray-500'>@{selectedMember.username}</div>
          </div>
        </div>

        <div className='flex items-center gap-x-4'>
          <Button
            roundedFull
            size='sm'
            loading={validating}
            disabled={disabled}
            variant='outlined'
            type='button'
            color='secondary'
            onClick={handleSubmit(handleCreateMember)}
          >
            <div className='flex'>
              <div className='font-semibold line-clamp-1'>{selectedMember.name}</div>
              <div className='ml-1 shrink-0'>を招待</div>
            </div>
          </Button>

          <CircleButton
            onClick={() => {
              setSelectedMember(null);
              reset();
            }}
            variant='none'
            color='secondary'
          >
            <BiX />
          </CircleButton>
        </div>
      </div>
    );
  }
  // ___________________________________________________________________________
  //
  return (
    <Controller
      name='username'
      control={control}
      render={({ field: { onChange } }) => (
        <AsyncSelect
          cacheOptions
          getOptionLabel={(v) => v.name}
          getOptionValue={(v) => v.username}
          defaultOptions
          hideSelectedOptions={false}
          openMenuOnClick={false}
          placeholder='ユーザーを招待'
          noOptionsMessage={() => '見つかりませんでした'}
          loadingMessage={() => '検索中'}
          onChange={(v) => {
            setSelectedMember(v);
            onChange(v?.username);
          }}
          loadOptions={loadOptions}
          styles={colourStyles}
          components={{
            Option,
            LoadingIndicator,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      )}
    />
  );
};
