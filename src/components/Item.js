import { FaTimes } from 'react-icons/fa';
// import { format, compareAsc } from 'date-fns';
import { format, moment } from 'moment';

const Item = ({ item, onDelete, onCheck }) => {

  // const formattedDate = format(item.createDate, "yyyy-MM-dd");
  // const formattedDate = moment(item.createDate).format('MMMM Do YYYY, h:mm:ss a');
  // console.log(formattedDate);
  // let formattedDate = item.createDate;

  // let a = moment(formattedDate);
  // console.log(a);

  console.log(item.createDate);

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