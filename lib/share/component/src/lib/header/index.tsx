'use client';
import Image from 'next/image';
import { Navbar } from '../navbar';

export const Header = () => {
  return (
    <div className="flex w-full items-center justify-between h-[70px] bg-white">
      <div className="flex">
        <a href="/">
          <Image src="/images/logo.svg" width={84} height={36} alt="logo" />
        </a>
      </div>
      <Navbar />
    </div>
  );
};
