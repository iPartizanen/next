// Core
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Components
import { Discount } from '../Discount';

// Selectors
import { selectDiscounts } from '../../bus/discounts/selectors';

export const Discounts = () => {
  const discounts = useSelector(selectDiscounts);

  if (discounts[0] === null) {
    const router = useRouter();
    useEffect(()=>{ router.replace('/'); });
    return null;
  };

  const listItems = discounts.map((item) => {
    return (
      <li key={item.id}>
        <Discount link='true' {...item}/>
        <p></p>
      </li>
    )
  });
 
  return (
    <div>
        <h1>Discounts</h1>
        <ul>
            {listItems}
        </ul>
    </div>
  );
}
