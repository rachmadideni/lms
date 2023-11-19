'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Tag, Popup } from '@final/component';
import { api } from '../../../config/api';
import shimmer, { toBase64 } from '../../../utils/shimmer';

const ArticlePage = ({ params }: { params: { slug: string } }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const fetchArticle = async (slug: string) => {
    const response = await api.get(`/article/${slug}`);
    return response.data.data;
  };

  const article = useQuery({
    queryKey: ['article', params.slug],
    queryFn: () => fetchArticle(params.slug),
  });

  if (article.isLoading) return <div>Loading...</div>;
  if (article.isError) return <div>{article.error.message}</div>;
  return (
    <div className="flex flex-col w-full h-full py-8 ">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-start-1 col-end-3 ">
          <div className="flex flex-col space-y-5">
            <h1 className="font-bold text-[36px] max-w-2xl break-words leading-[46px] ">
              {article.data.title}
            </h1>

            <div className="flex w-full justify-between">
              <Tag text={article.data.tags[0]} />
            </div>
            <div className="flex w-full justify-between">
              <p className="flex w-full">{article.data.author.full_name}</p>
              <div className="flex w-full items-center justify-end relative">
                <a href="#" className="flex p-2 text-[#106FA4] font-bold">
                  <Image
                    src="/images/share.svg"
                    width={24}
                    height={24}
                    alt="share"
                  />
                  share
                </a>
                <a
                  href="#"
                  className="flex p-2 text-[#EE2D24] font-bold "
                  onClick={() => setPopupVisible((prev) => !prev)}
                >
                  <Image
                    src="/images/report.svg"
                    width={24}
                    height={24}
                    alt="share"
                  />
                  laporkan
                </a>
                <Popup visible={popupVisible}>
                  <div className="flex flex-col w-full p-4 items-center">
                    <p className="font-bold">Laporkan</p>
                    <hr className="border-gray-200 dark:border-gray-700 "></hr>
                    <div>Mengapa Anda melaporkan Artikel ini?</div>
                    <hr className="border-gray-200 dark:border-gray-700 "></hr>
                  </div>
                </Popup>
              </div>
            </div>
            <div className="flex flex-col w-full gap-8 px-8">
              <Image
                src={article.data.thumbnail}
                width={763}
                height={370}
                alt="article-post-thumbnail"
                className="rounded-md w-full"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                placeholder="blur"
              />
              <p className="leading-loose">{article.data.content}</p>
              {/* <br />
              <p className="leading-loose">
                {article.data.content.replace(/(\.(\s+))/g, `$1 ${(<br />)}`)}
                {article.data.content.replace(/(?:\r\n|\r|\n)/g, '<br>')}
              </p> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-5 bg-orange-300">
          <img src="/images/home.svg" />
          <h1>lainnya dari sekilas ilmu</h1>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
