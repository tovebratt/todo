import Item from './Item';

const Items = ({ items, onDelete, onCheck }) => {
  return (
    <>
    <h3>Näst på tur</h3>
      {items.map((item, itemId ) => (
        <Item key={itemId} item={item} onDelete={onDelete} onCheck={onCheck}/>
      ))}
    </>
  )
}

export default Items;