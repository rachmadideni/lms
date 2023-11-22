'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  Tag,
  Banner,
  CardThumbnail,
  Modal,
  ReportDialog,
  ReportConfirmDialog,
} from '@final/component';
import { api } from '../../../config/api';
import shimmer, { toBase64 } from '../../../utils/shimmer';
import { reports } from './constants';

const ArticlePage = ({ params }: { params: { slug: string } }) => {
  const [reportDialogVisible, toggleReportDialogVisible] = useState(false);
  const [reportConfirm, setReportConfirm] = useState(false);

  const reportHandler = async () => {
    toggleReportDialogVisible(false);
    setReportConfirm(true);
  };

  const fetchArticle = async (slug: string) => {
    const response = await api.get(`/article/${slug}`);
    return response.data.data;
  };

  const article = useQuery({
    queryKey: ['article', params.slug],
    queryFn: () => fetchArticle(params.slug),
  });

  // other articles
  const fetchOtherArticles = async (page: number) => {
    const response = await api.get(
      `/article/filter?page=${page}&limit=7&sort_by=TITLE&search=`
    );
    return response.data.data;
  };

  const filterOtherArticles = (data: any) => {
    return data.data.filter((article: any) => article.slug !== params.slug);
  };

  const otherArticles = useQuery({
    queryKey: ['other-articles', 1],
    queryFn: () => fetchOtherArticles(1),
    placeholderData: keepPreviousData,
    select: filterOtherArticles,
  });

  if (article.isLoading) return <div>Loading...</div>;

  if (otherArticles.isLoading) return <div>Loading...</div>;
  if (article.isError) return <div>{article.error.message}</div>;
  return (
    <div className="flex flex-col w-full h-full py-8 justify-center">
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4">
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
                  onClick={() => toggleReportDialogVisible(true)}
                >
                  <Image
                    src="/images/report.svg"
                    width={24}
                    height={24}
                    alt="share"
                  />
                  laporkan
                </a>

                {reportDialogVisible && (
                  <Modal>
                    <ReportDialog
                      title="laporkan"
                      subtitle="Mengapa Anda melaporkan Artikel ini?"
                      reportList={reports}
                      onCloseHandler={() => toggleReportDialogVisible(false)}
                      onReportHandler={reportHandler}
                    />
                  </Modal>
                )}

                {reportConfirm && (
                  <Modal>
                    <ReportConfirmDialog
                      textBody="Masukan dari Anda sangat penting untuk membantu kami menjaga komunitas Kampus Gratis agar tetap aman."
                      textButton="tutup"
                      onCloseHandler={() => setReportConfirm(false)}
                    />
                  </Modal>
                )}
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
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full space-y-8 items-center justify-center">
          <Banner
            text="Fakta Unik Negara Jepang yang Mungkin Belum Kamu Ketahui!"
            imgUrl="https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <div className="flex flex-col w-full h-full">
            <div>
              <h1 className="text-2xl font-bold capitalize leading-[2rem]">
                lainnya dari sekilas ilmu
              </h1>
              <hr className="border-[#0B568D] border-2 w-24" />
            </div>

            {otherArticles.data.map((article: any, idx: number) => (
              <CardThumbnail
                key={idx}
                date={article.created_at}
                slug={article.slug}
                title={article.title}
                tag={article.tags[0]}
                image={article.thumbnail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
