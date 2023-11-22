'use client';

import Image from 'next/image';
import { TextField } from '../textfield';

interface ISearchProps {
  headerText: string;
  headerCaption: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({
  headerText,
  headerCaption,
  onChange,
}: ISearchProps) => {
  return (
    <div className="flex flex-col w-full space-y-10 items-center justify-center md:px-16 py-4">
      <div className="flex flex-col text-center gap-3">
        <h3 className="font-bold text-3xl capitalize">{headerText}</h3>
        <h5 className="text-[#A3A3A3] capitalize">{headerCaption}</h5>
      </div>

      <TextField
        startAdornment={
          <Image
            src="/images/search-glasses.svg"
            width={6}
            height={6}
            alt="icon-search-glasses"
            className="w-8 h-8 bg-contain"
          />
        }
        placeholder="Cari artikel"
        onChange={onChange}
      />
    </div>
  );
};
