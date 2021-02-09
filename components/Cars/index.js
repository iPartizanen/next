// Core
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Components
import { Car } from '../Car';

// Selectors
import { selectCars } from '../../bus/cars/selectors';

export const Cars = () => {
  const cars = useSelector(selectCars);

  if (cars[0] === null) {
    const router = useRouter();
    useEffect(()=>{ router.replace('/'); });
    return null;
  };

  const listItems = cars.map((item) => {
    return (
      <li key={item.id}>
        <Car link='true' {...item}/>
        <p></p>
      </li>
    )
  });
 
  return (
    <div>
        <h1>Cars</h1>
        <ul>
            {listItems}
        </ul>
    </div>
  );
}
