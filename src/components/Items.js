import Item from './Item';
import moment, { format } from 'moment';

const Items = ({ items, onDelete, onCheck }) => {
  return (
    <>
    <h3>Näst på tur</h3>
      {items.sort((a, b) => moment(a.createDate) - moment(b.createDate)).map((item, itemId ) => (
        <Item key={itemId} item={item} onDelete={onDelete} onCheck={onCheck}/>
      ))}
    </>
  )
}

export default Items;