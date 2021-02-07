// Core
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Instruments
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';
import { identifyUser } from "../../helpers/identifyUser";
import { readNews } from '../../helpers/readNews';

// Components
import { Menu } from '../../components/Menu';
import { Article as ArticleComponent } from '../../components/Article';
import { BackButton } from '../../components/BackButton';

// Selectors
import { selectNews } from '../../bus/news/selectors';

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readNews(store);
  
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    }
  }
};

const Article = () => {

  const router = useRouter();
  const { article } = router.query;

  const news = useSelector(selectNews);

  if (!news) { 
    useEffect(()=>{ router.replace('/'); });
    return null;
  };
  
  const data = news.find(item => item.id === article);
 
  if (!data) { 
    useEffect(()=>{ router.replace('/404'); });
    return null;
  };

  return (
    <>
      <Menu />
      <ArticleComponent {...data} />
      <p/>
      <BackButton />
    </>
  );
}

export default Article;
