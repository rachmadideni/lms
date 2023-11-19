'use client';

import Image from 'next/image';

interface AvatarProps {
  url: string;
}

export const Avatar = ({ url }: AvatarProps) => {
  return (
    <div className="flex -space-x-1 overflow-hidden">
      <Image src={url} width={36} height={36} alt="avatar" />
    </div>
  );
};
