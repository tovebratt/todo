import { FaTimes } from 'react-icons/fa';

const Item = ({ item, onDelete, onCheck }) => {
  return (
    <>
    <div className='item'>
      <input type='checkbox' className='checkbox-round' onClick={() => onCheck(item.itemId)}/>
      <h4>{item.item} </h4> 
      <br /><p>{item.createDate}</p><FaTimes onClick={() => onDelete(item.itemId)}/>
    </div>
    </>
  )
}

export default Item;