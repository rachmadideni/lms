export const Tag = ({ text }: { text: string }) => {
  return (
    <p
      className={`text-[12px] font-bold break-words ${
        text ? 'bg-green-100' : ' w-36 max-w-36 '
      } rounded-md p-2 `}
    >
      {text ? `#${text}` : ``}
    </p>
  );
};
