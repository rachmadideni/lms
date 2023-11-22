'use client';

interface ITabs {
  items: string[];
  activeTab?: number;
  children?: React.ReactNode;
  onChange: (id: number) => void;
}

export const Tabs = ({ items, children, activeTab, onChange }: ITabs) => {
  return (
    <ul className="flex justify-start items-center my-4 w-full border-b border-gray-300">
      {items.map((tab, idx) => (
        <li
          key={idx}
          className={`cursor-pointer px-4 py-3 font-bold ${
            activeTab === idx
              ? 'font-bold border-b text-[#106FA4] border-[#106FA4]'
              : 'text-[#A3A3A3]'
          }`}
          onClick={() => onChange(idx)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};
