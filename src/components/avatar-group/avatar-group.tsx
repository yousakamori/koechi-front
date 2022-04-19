import clsx from 'clsx';
import { Participant } from '@/types/participant';
// ___________________________________________________________________________
//
const mapSizeClasses = {
  sm: ['h-6', 'w-6'],
  md: ['h-8', 'w-8'],
  lg: ['h-10', 'w-10'],
};
// ___________________________________________________________________________
//
export type AvatarGroupProps = {
  participants: Participant[];
  size?: keyof typeof mapSizeClasses;
  maximum?: number;
};
// ___________________________________________________________________________
//
export const AvatarGroup: React.VFC<AvatarGroupProps> = ({
  participants,
  size = 'md',
  maximum = 4,
}) => {
  const z = ['z-30', 'z-20', 'z-10', 'z-0'];
  // ___________________________________________________________________________
  //
  return (
    <div
      className={clsx(
        'relative',
        'z-0',
        'flex',
        'items-center',
        'overflow-hidden',
        size === 'sm' ? '-space-x-1' : '-space-x-2',
      )}
    >
      {participants.slice(0, maximum).map((participant, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={participant.id}
          className={clsx(
            'relative',
            'bg-white',
            'object-cover',
            'inline-block',
            'rounded-full',
            'ring-2',
            'ring-white',
            mapSizeClasses[size],
            z[k],
          )}
          src={participant.avatar_small_url}
          alt=''
        />
      ))}
      <div className='pl-2.5 text-xs text-gray-600'>
        {participants.length > maximum && `+${participants.length - maximum}`}
      </div>
    </div>
  );
};
