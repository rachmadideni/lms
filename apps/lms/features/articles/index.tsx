'use client';

import { useState } from 'react';
import { Tabs, CardArticle } from '@final/component';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { api } from '../../config/api';

const Articles = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const fetchArticles = async (page: number) => {
    const response = await api.get(
      `/article/filter?page=${page}&limit=8&sort_by=TITLE&search=${searchKeyword}`
    );
    return response.data.data;
  };

  const articles = useQuery({
    queryKey: ['articles', currentPage, searchKeyword],
    queryFn: () => fetchArticles(currentPage),
    placeholderData: keepPreviousData,
  });

  const handleTabChange = (id: number) => {
    setActiveTab(id);
  };

  if (articles.isLoading) return <div>Loading...</div>;

  if (articles.isError) return <div>{articles.error.message}</div>;
  return (
    <>
      <Tabs
        activeTab={activeTab}
        items={['Sekilas Ilmu', 'Disimpan']}
        onChange={handleTabChange}
      />

      <div className="grid md:grid-cols-4 grid-cols-1 gap-8 md:auto-cols-max md:w-full md:p-8">
        {activeTab === 0 && (
          <>
            {articles?.data.data.map((article: ICardArticle, idx: number) => (
              <CardArticle
                key={idx}
                title={article.title}
                date={article.created_at}
                tag={article.tags ? article.tags[0] : ''}
                thumbnail={article.thumbnail}
                views={article.views}
                slug={article.slug}
              />
            ))}
          </>
        )}
        {activeTab === 1 && <div>Tab 2</div>}
      </div>
    </>
  );
};

export default Articles;
