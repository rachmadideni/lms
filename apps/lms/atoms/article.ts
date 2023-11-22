import { atom } from 'recoil';

interface ArticleState {
  keyword?: string;
  bookmarks?: any[]; // Update the type to allow any[]
}

const articleState = atom<ArticleState>({
  key: 'article',
  default: {
    keyword: '',
    bookmarks: [],
  },
});

export default articleState;
