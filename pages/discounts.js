// Instruments
import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import { identifyUser } from '../helpers/identifyUser';
import { readDiscounts } from '../helpers/readDiscounts';
import { initialReduxStateProps } from '../helpers/initialReduxStateProps';

// Components
import { Menu } from '../components/Menu';
import { Discounts as DiscountsComponent } from '../components/Discounts';

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

  await identifyUser(context, store);
  await readDiscounts(store);
  
  return initialReduxStateProps (store, stateUpdates);
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
