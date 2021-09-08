import { FaTimes } from 'react-icons/fa';
// import { format, compareAsc } from 'date-fns';
import moment, { format } from 'moment';


const Item = ({ item, onDelete, onCheck }) => {

  function readableDate(utcDateString) {
    return moment(utcDateString).format('YYYY-MM-DD');
  }

  return (
    <>
    <div className='item'>
      <input type='checkbox' className='checkbox-round' checked={item.done} onChange={() => onCheck(item)}/>
      <div className='item-h5'><h5>{item.item} </h5> </div>
      <FaTimes onClick={() => onDelete(item)}/>
    </div>
    <div className='item-p'><p>{readableDate(item.createDate)}</p></div>
    </>
  )
}

export default Item;