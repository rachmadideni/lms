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
    // /article/filter?page=1&limit=5&sort_by=TITLE&search=Ayo

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

      <div className="grid md:grid-cols-4 gap-8 auto-cols-max w-full p-8">
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

// "https://res.cloudinary.com/dz5pv99lp/image/upload/v1699008675/articles/e7b30195-a59c-4d53-9eaf-fa95efdb9539/articles_921baba1-2a0e-483f-9edb-f679a9ae7519.png

export default Articles;
