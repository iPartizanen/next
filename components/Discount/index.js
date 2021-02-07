// Core
import Link from 'next/link';

export const Discount = ({ id, content, dateOfReceiving, link = false }) => {

  const d = new Date(dateOfReceiving);

  const linkJSX = (id) => (
    link  
    ? <Link href={`/discounts/${encodeURIComponent(id)}`}><a>{id}</a></Link>
    : <a>{id}</a>
  );

  return (
    <span>
      <strong>{linkJSX(id)}</strong> {d.toLocaleDateString()}<br/>
      {content}
    </span>
  )
}
