// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from "../helpers/identifyUser";
import { readNews } from '../helpers/readNews';

// Components
import { Menu } from '../components/Menu';
import { News as NewsComponent } from '../components/News';

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

const News = () => {
  return (
    <>
      <Menu />
      <NewsComponent />
    </>
  );
}

export default News;
