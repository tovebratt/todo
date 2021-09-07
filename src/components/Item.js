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

  // console.log(item.createDate);
  // format({item.createDate}, "yyyy-MM-dd")

  return (
    <>
    <div className='item'>
      <input type='checkbox' className='checkbox-round' checked={item.done} onChange={() => onCheck(item)}/>
      <div className='item-h5'><h5>{item.item} </h5> </div>
      <FaTimes onClick={() => onDelete(item)}/>
    </div>
    <div className='item-p'><p>{item.createDate}</p></div>
    </>
  )
}

export default Item;