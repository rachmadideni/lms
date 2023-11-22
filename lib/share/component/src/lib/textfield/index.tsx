'use client';

import Image from 'next/image';

interface ITextFieldProps {
  startAdornment: React.ReactNode;
  placeholder?: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  startAdornment,
  placeholder = 'your placeholder text',
  onChange,
}: ITextFieldProps) => {
  return (
    <div className="flex w-full h-[56px] items-center bg-gray-100 border border-gray-300 rounded-md gap-4 px-4">
      {startAdornment && (
        <Image
          src="/images/search-glasses.svg"
          width={6}
          height={6}
          alt="icon-search-glasses"
          className="w-8 h-8 bg-contain"
        />
      )}
      <input
        type="text"
        className="w-full outline-none bg-gray-100"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
