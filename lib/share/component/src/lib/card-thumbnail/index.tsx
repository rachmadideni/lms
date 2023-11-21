import Image from 'next/image';
import Link from 'next/link';
import { DateComponent } from '../date';
import { Tag } from '../tag';

export interface ICardThumbnailProps {
  image: string;
  title: string;
  tag: string;
  date: string;
  slug: string;
}
export const CardThumbnail = ({
  image,
  title,
  date,
  tag,
  slug,
}: ICardThumbnailProps) => {
  return (
    <div className="flex w-full py-4 gap-4 items-start justify-between border-b border-b-slate-200">
      <Image
        alt="image"
        src={image}
        width={100}
        height={240}
        className="w-auto bg-cover rounded-lg"
        style={{
          // width: 'auto',
          objectFit: 'cover',
        }}
      />
      <div className="flex flex-col max-w-8 w-full gap-4">
        <Link
          className="text-md font-bold leading-tight"
          href={`/article/${slug}`}
        >
          {title}
        </Link>
        <div className="w-full flex md:flex-row flex-col md:items-center justify-start gap-2">
          <Tag text={tag} />
          <DateComponent date={date} />
        </div>
      </div>
    </div>
  );
};
