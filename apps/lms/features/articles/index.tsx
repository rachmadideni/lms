'use client';

import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import articleAtom from '../../atoms/article';
import {
  Tabs,
  CardArticle,
  ICardArticle,
  Search,
  Pagination,
} from '@final/component';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { api } from '../../config/api';

const Articles = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const [articleState, setArticleState] = useRecoilState(articleAtom);
  const setBookmarks = useSetRecoilState(articleAtom);

  const fetchArticles = async (page: number) => {
    const response = await api.get(
      `/article/filter?page=${page}&limit=${postsPerPage}&sort_by=TITLE&search=${articleState.keyword}`
    );
    return response.data.data;
  };

  const articles = useQuery({
    queryKey: ['articles', currentPage, articleState.keyword],
    queryFn: () => fetchArticles(currentPage),
    placeholderData: keepPreviousData,
  });

  const handleTabChange = (id: number) => {
    setActiveTab(id);
  };

  const handleBookmarkClick = (evt: React.MouseEvent, val: any) => {
    evt.preventDefault();
    const checks = articleState.bookmarks?.some((item) => item.id === val.id);
    if (!checks) {
      setBookmarks((prev) => ({
        ...prev,
        bookmarks: [...(prev.bookmarks || []), val],
      }));
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log(articles);

  if (articles.isLoading)
    return (
      <div className="flex flex-col w-full min-h-[100%] h-screen items-center">
        Loading...
      </div>
    );

  if (articles.isError) return <div>{articles.error.message}</div>;
  return (
    <>
      <Search
        headerText="sekilas ilmu"
        headerCaption="Temukan artikel menarik yang bakal menambah wawasanmu disini!"
        onChange={(evt) => {
          setArticleState({ keyword: evt.target.value });
        }}
      />
      <Tabs
        activeTab={activeTab}
        items={['Sekilas Ilmu', 'Disimpan']}
        onChange={handleTabChange}
      />

      <div className="grid md:grid-cols-4 grid-cols-1 gap-8 md:auto-cols-max md:w-full md:p-8">
        {activeTab === 0 && (
          <>
            {articles?.data.data
              ? articles?.data.data.map((article: any, idx: number) => (
                  <>
                    <CardArticle
                      key={idx}
                      title={article.title}
                      date={article.created_at}
                      tag={article.tags ? article.tags[0] : ''}
                      thumbnail={article.thumbnail}
                      views={article.views}
                      slug={article.slug}
                      onBookmarkClick={(evt) =>
                        handleBookmarkClick(evt, article)
                      }
                    />
                  </>
                ))
              : []}
          </>
        )}
        {activeTab === 1 && (
          <>
            {articleState.bookmarks?.map((article: any, idx: number) => (
              <CardArticle
                key={idx}
                title={article.title}
                date={article.created_at}
                tag={article.tags ? article.tags[0] : ''}
                thumbnail={article.thumbnail}
                views={article.views}
                slug={article.slug}
                onBookmarkClick={(evt) => handleBookmarkClick(evt, article)}
              />
            ))}
          </>
        )}
      </div>

      {activeTab === 0 && (
        <Pagination
          currentPage={currentPage}
          paginate={paginate}
          postsPerPage={postsPerPage}
          totalPosts={articles.data.total_data}
        />
      )}
    </>
  );
};

export default Articles;
