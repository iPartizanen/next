// Core
import Link from 'next/link';

export const Article = ({ id, content, dateOfReceiving, link = false }) => {

  const d = new Date(dateOfReceiving);

  const linkJSX = (id) => (
    link  
    ? <Link href={`/news/${encodeURIComponent(id)}`}><a>{id}</a></Link>
    : <a>{id}</a>
  );

  return (
    <span>
      <strong>{linkJSX(id)}</strong> {d.toLocaleDateString()}<br/>
      {content}
    </span>
  )
}
