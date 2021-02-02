// Core
import Link from 'next/link';

const menuItems = [
  {link: '/', title: 'Home'},
  {link: '/user', title: 'User'},
  {link: '/dashboard', title: 'Dashboard'}
];

const Menu = ({ currentPage }) => {

  const menuJSX = menuItems.map(({link, title}) => {
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

export default Menu;
