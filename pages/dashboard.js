// Core
import { useSelector } from 'react-redux';
import Link from 'next/link';

// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { readNews } from '../helpers/readNews';
import { readDiscounts } from '../helpers/readDiscounts';
import { readCars } from '../helpers/readCars';
import { initialReduxStateProps } from '../helpers/initialReduxStateProps';

// Components
import { Menu } from '../components/Menu';

// Selectors
import { selectNews } from '../bus/news/selectors';
import { selectDiscounts } from '../bus/discounts/selectors';
import { selectCars } from '../bus/cars/selectors';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readNews(store);
  await readDiscounts(store);
  await readCars(store);

  return initialReduxStateProps (store, stateUpdates);
};

const Dashboard = () => {

  const generateLinks = (items, path) => {
    let links = '';
    
    if (!(items[0] === null)) {  // foribidden flag

      links = items.map(({ id }) => {
        const link = path + `/${encodeURIComponent(id)}`;

        return (
          <dt key={link}>
            <Link href={link}><a>{link}</a></Link><br/>
          </dt>
        )
      });

      links = <dl>{links}</dl>;
    };
    return links;
  };

  const news = useSelector(selectNews);
  const newsLinks = generateLinks(news, '/news');

  const discounts = useSelector(selectDiscounts);
  const discountsLinks = generateLinks(discounts, '/discounts');

  const cars = useSelector(selectCars);
  const carsLinks = generateLinks(cars, '/cars');

  return (
    <>
      <Menu />  
      {newsLinks}
      {discountsLinks}
      {carsLinks}
    </>
  );
};

export default Dashboard;
