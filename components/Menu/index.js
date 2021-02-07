// Core
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  {link: '/', title: 'Home'},
  {link: '/user', title: 'User'},
  {link: '/dashboard', title: 'Dashboard'},
  {link: '/news', title: 'News'},
  {link: '/discounts', title: 'Discounts'},
  {link: '/cars', title: 'Cars'},
];

export const Menu = () => {

  const router = useRouter();
  const currentPage = router.pathname;

  const menuJSX = menuItems.map(({ link, title }) => {
    return (
      link === currentPage 
        ? <dt key={link}><a>{title}</a></dt> 
        : <dt key={link}><Link href={link}><a>{title}</a></Link></dt>
    )
  });

  return (
    <dl>
      {menuJSX}    
    </dl>
  );
}
