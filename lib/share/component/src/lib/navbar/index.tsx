'use client';

import Image from 'next/image';
import { IconButton } from '../icon-button';
import { CiBellOn } from 'react-icons/ci';
import { RiSunFill } from 'react-icons/ri';

export const Navbar = () => {
  return (
    <div className="flex space-x-2">
      <IconButton
        icon={
          <Image
            src="/images/home.svg"
            width={5}
            height={5}
            className="w-5 h-5"
            color="orange"
            alt="home"
          />
        }
        className="flex group relative w-9 h-9 rounded-lg bg-slate-100 items-center justify-center hover:bg-slate-200 hover:fill-slate-300"
      />
      <IconButton
        icon={<RiSunFill className="w-5 h-5" color="orange" />}
        className="flex group relative w-9 h-9 rounded-lg bg-slate-100 items-center justify-center hover:bg-slate-200 hover:fill-slate-300"
      />
      <IconButton
        icon={<CiBellOn className="w-5 h-5" color="black" />}
        hasNotification
        className="flex group relative w-9 h-9 rounded-lg bg-slate-100 items-center justify-center hover:bg-slate-200 hover:fill-slate-300"
      />
      <IconButton
        icon={
          <Image
            src="/images/user.svg"
            className="w-5 h-5 bg-contain group-hover:opacity-90"
            fill
            sizes="100vw"
            alt="user"
          />
        }
        className="flex group relative w-9 h-9 rounded-lg bg-slate-100 items-center justify-center hover:bg-slate-200 hover:fill-slate-300"
      />
    </div>
  );
};
