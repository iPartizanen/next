// Instruments
import { identifyUser } from '../helpers/identifyUser';
import { readFeedData } from '../helpers/readFeedData';
import News from '../components/News';
import Discounts from '../components/Discounts';
import Cars from '../components/Cars';

export const getServerSideProps = async (context) => {
  const user = await identifyUser(context);

  const news = await readFeedData('./data/news.json');
  const discounts = (user.isFriend || user.isFamilyMember) && await readFeedData('./data/discounts.json');
  const cars = user.isFamilyMember && await readFeedData('./data/cars.json');

  return {
    props: {
      user,
      news: { news },
      discounts: { discounts },
      cars: { cars },
    }
  }
};

const Dashboard = (props) => {
  const {
    news,
    discounts,
    cars,
  } = props;

  return (
    <>
      <News {...news} />
      <Discounts {...discounts} />
      <Cars {...cars} />
    </>
  );
};

export default Dashboard;
