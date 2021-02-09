// Core
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Instruments
import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';
import { identifyUser } from "../../helpers/identifyUser";
import { readDiscounts } from '../../helpers/readDiscounts';

// Components
import { Menu } from '../../components/Menu';
import { Discount as DiscountComponent } from '../../components/Discount';
import { BackButton } from '../../components/BackButton';

// Selectors
import { selectDiscounts } from '../../bus/discounts/selectors';

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

const Discount = () => {

  const router = useRouter();
  const { discount } = router.query;

  const discounts = useSelector(selectDiscounts);

  if (!discounts) { 
    useEffect(()=>{ router.replace('/'); });
    return null;
  };
  
  const data = discounts.find(item => item.id === discount);
 
  if (!data) { 
    useEffect(()=>{ router.replace('/404'); });
    return null;
  };

  return (
    <>
      <Menu />
      <DiscountComponent {...data} />
      <p/>
      <BackButton />
    </>
  );
}

export default Discount;
