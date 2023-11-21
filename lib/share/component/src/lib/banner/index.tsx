import Image from 'next/image';
interface IBannerProps {
  imgUrl: string;
  text: string;
}

export const Banner = ({ imgUrl, text }: IBannerProps) => {
  return (
    <div className="flex flex-col w-full h-[156px] relative rounded-lg ">
      <Image
        src={imgUrl}
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: 'auto', height: '156px', objectFit: 'cover' }}
        className="rounded-lg"
      />
      <div className="w-full h-20 bg-[#106FA4] bg-opacity-70 backdrop-blur absolute bottom-0 left-0 rounded-b-lg flex items-center">
        <h4 className="font-bold text-white px-4">{text}</h4>
      </div>
    </div>
  );
};
