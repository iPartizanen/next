const Cars = ({cars}) => {

  if (!cars) { return null; };

  const listItems = cars.map((item) => {

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
        <h1>Cars</h1>
        <ul>
            {listItems}
        </ul>
    </div>
  );
};
  
export default Cars;
