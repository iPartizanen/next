// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from "../helpers/identifyUser";
import { readDiscounts } from '../helpers/readDiscounts';

// Components
import { Menu } from '../components/Menu';
import { Discounts as DiscountsComponent } from '../components/Discounts';

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readDiscounts(store);
  
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    }
  }
};

const Discounts = () => {
  return (
    <>
      <Menu />
      <DiscountsComponent />
    </>
  );
}

export default Discounts;
