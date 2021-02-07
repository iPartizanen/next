// Instruments
import { readFeedData } from '../helpers/readFeedData';

// Actions
import { newsActions } from '../bus/news/actions';

export const readNews = async (store) => {
  const news = await readFeedData('./data/news.json');

  store.dispatch(newsActions.fillNews(news));

  return news;
}