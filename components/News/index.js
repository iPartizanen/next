// Core
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Components
import { Article } from '../Article';

// Selectors
import { selectNews } from '../../bus/news/selectors';

export const News = () => {
  const news = useSelector(selectNews);

  if (!news) {
    const router = useRouter();
    useEffect(()=>{ router.replace('/'); });
    return null;
  };

  const listItems = news.map((item) => {
    return (
      <li key={item.id}>
        <Article link='true' {...item}/>
        <p></p>
      </li>
    )
  });
 
  return (
    <div>
        <h1>News</h1>
        <ul>
            {listItems}
        </ul>
    </div>
  );
}
