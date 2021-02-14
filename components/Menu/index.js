// Core
import Link from 'next/link';
import { useRouter } from 'next/router';

// Instruments
import { userTypes } from '../../bus/user/types';

// Selectors
import { selectUserType } from '../../bus/user/selectors';
import { useSelector } from 'react-redux';

export const Menu = () => {
  const userType = useSelector(selectUserType);

  let menuItems = [
    {link: '/', title: 'Home'},
    {link: '/user', title: 'User'},
    {link: '/dashboard', title: 'Dashboard'},
    {link: '/news', title: 'News'},
  ];

  if (userType !== userTypes.USER_IS_GUEST) {
    menuItems.push({link: '/discounts', title: 'Discounts'});
  };

  if (userType === userTypes.USER_IS_FAMILY_MEMBER) {
    menuItems.push( {link: '/cars', title: 'Cars'});
  };

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
