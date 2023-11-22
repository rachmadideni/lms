interface IDateProps {
  date: string;
}

export const DateComponent = ({ date }: IDateProps) => {
  const parsedDate = new Date(Date.parse(date));
  const dateText = parsedDate.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return <p className="text-xs">{dateText}</p>;
};
