const News = ({news}) => {

  if (!news) { return null; };

  const listItems = news.map((item) => {

      const d = new Date(item.dateOfReceiving);

      return (
        <li key={item.id}>
        <strong>{item.id}</strong> {d.toLocaleDateString()}<br/>
        {item.content}
        </li>
      )
    }
  );
 
  return (
    <div>
        <h1>News</h1>
        <ul>
            {listItems}
        </ul>
    </div>
  );
};
  
export default News;
