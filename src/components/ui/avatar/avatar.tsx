import clsx from 'clsx';
// ___________________________________________________________________________
//
const mapSizeClasses = {
  xs: ['h-6', 'w-6'],
  sm: ['h-8', 'w-8'],
  md: ['h-10', 'w-10'],
  lg: ['h-14', 'w-14'],
  xl: ['h-24', 'w-24'],
};
// ___________________________________________________________________________
//
export type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size?: keyof typeof mapSizeClasses;
};
// ___________________________________________________________________________
//
export const Avatar: React.VFC<AvatarProps> = ({ size = 'md', src, className, alt, ...rest }) => {
  const classes = clsx(
    'object-cover',
    'rounded-full',
    'border',
    'border-gray-200',
    'bg-white',
    mapSizeClasses[size],
    className,
  );
  // ___________________________________________________________________________
  //
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src || '/images/empty_avatar.png'} alt={alt || ''} className={classes} {...rest} />
  );
};
