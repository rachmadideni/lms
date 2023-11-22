import Image from 'next/image';
import Link from 'next/link';
import { Tag } from '../tag';
import { DateComponent } from '../date';

export interface ICardArticle {
  title: string;
  date: string;
  tag: string;
  thumbnail: string;
  views: number;
  slug: string;
  onBookmarkClick: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface IArticleProps extends Partial<ICardArticle> {}

export const CardArticle = ({
  title,
  date,
  tag,
  thumbnail,
  views,
  slug,
  onBookmarkClick,
}: ICardArticle) => {
  // const getRandomColor = async (): Promise<string> =>
  //   (await 'bg-[#') + Math.floor(Math.random() * 16777215).toString(16) + ']';

  return (
    <div className="flex flex-col space-y-4  md:w-[300px] bg-white p-4 border border-gray-200 rounded-lg">
      <Image
        src={thumbnail}
        width={276}
        height={10}
        alt="article-post-thumbnail"
        sizes="100vw, 160px"
        className="rounded-md max-h-[160px]"
        priority
      />
      <div className="flex w-full h-8 justify-between items-center">
        <Tag text={tag} />
        <DateComponent date={date} />
      </div>
      <div className="h-20">
        <Link
          className="text-[18px] font-bold leading-tight"
          href={`/article/${slug}`}
        >
          {title}
        </Link>
      </div>
      <div className="flex w-full justify-between pt-4 md:pt-1">
        <p className="capitalize text-[12px]">{views} Views</p>
        <button
          onClick={onBookmarkClick}
          className="text-[12px] font-bold bg-slate-100 hover:bg-slate-200/70 p-2 rounded-md hover:fill-[#106FA4]"
        >
          <Image
            src="/images/bookmark.svg"
            width={14}
            height={18}
            alt="bookmark"
            className="cursor-pointer hover:fill-[#106FA4]"
          />
        </button>
      </div>
    </div>
  );
};
