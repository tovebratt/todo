import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddItem = ({ date, onAdd, onPopup, onCloseClick }) => {
  const [item, setitem] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [checked, setChecked] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault()
    if(!item) {
      alert('add item')
      return
    }

    onAdd({item});

    setitem('');
  }

  return (
    <div className='popup'>
      <div className='popup-inner'>
      <FaTimes className='close-btn' onClick={onCloseClick} />
    <form className='add-item' onSubmit={onSubmit}>
      <h4>Lägg till ny uppgift<br /> </h4>
      <div className='input-add-item'><input type='text' placeholder='Uppgiftsbeskrivning' value={item} onChange={(e) => setitem(e.target.value)} /><br />
      </div>
      <input type='submit' value='SPARA' className='add-btn'/>
    </form>
    </div>
    </div>
  )
}

export default AddItem;