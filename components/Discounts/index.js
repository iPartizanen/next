const Discounts = ({discounts}) => {

  if (!discounts) { return null; };

  const listItems = discounts.map((item) => {

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
        <h1>Discounts</h1>
        <ul>
            {listItems}
        </ul>
    </div>
  );
};
  
export default Discounts;
