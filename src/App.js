import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './index.css';
import { format, compareAsc } from 'date-fns';

import Header from './components/Header';
import Items from './components/Items';
import AddItem from './components/AddItem';

const App = () => {

  const [date, onChange] = useState(new Date());
  const [popupAddItem, setpopupAddItem] = useState(false);

  const [items, setitems] = useState([])
  const [createDate, setCreateDate] = useState('');

  useEffect(() => {
    const getItems = async () => {
      const itemsFromServer = await fetchItems()
      setitems(itemsFromServer)
    }

    getItems()
  }, [])

  // useEffect(() => {
  //   setpopupAddItem();
  // }, [popupAddItem])

  //fetch data
  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/lists/items')
    const data = await res.json()
    return data
  }

    //fetch item
    const fetchItem = async (itemId) => {
      const res = await fetch(`http://localhost:5000/lists/items/${itemId}`)
      const data = await res.json()
      return data
    }


//   const [items, setitems] = useState([
//     {
//       itemId: 1,
//       item: "Skörda potatis",
//       done: false,
//       list: "Köksträdgård",
//       deletedItem: false,
//       createDate: "2021-09-05 12:00",
//     },
//     {
//       itemId: 2,
//       item: "Skörda majs",
//       done: false,
//       list: "Köksträdgård",
//       deletedItem: false,
//       createDate: "2021-09-06 12:00",
//     }
// ])

  // function tileContent({ date, view }) {
  //   // Add class to tiles in month view only
  //   if (view === 'month') {
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
  //       return 'My content';
  //     }
  //   }
  // }

  const onClickDay = (e) => {
    console.log(e);
 
    setpopupAddItem(true);
  
    <AddItem date={date}/>
  }
  

  // delete item
  const deleteItem = async (itemId) => {
    await fetch('http://localhost:5000/lists/deleteitem/'+ itemId, {
      method: 'DELETE',
    })

    setitems(items.filter((item) => item.itemId !== itemId))
  }

  //check item
  const checkItem = async (itemId) => {
    // console.log(itemId)
    const itemToCheck = await fetchItem(itemId);
    const updateItem = { ...itemToCheck, done: !itemToCheck.done }

    const res = await fetch(`http://localhost:5000/lists/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateItem)
    })

    const data = await res.json();

    setitems(items.map((item) => item.itemId === itemId ? { ...item, done: data.done } : item))
  }

    // //check item
    // const checkItem = (itemId) => {
    //   // console.log(itemId)
    //   setitems(items.map((item) => item.itemId === itemId ? { ...item, done: !item.done } : item))
    // }

  //Add item
  const addItem = async (item) => {
    console.log(item);
    console.log(date);
    const newItem = {item, createDate: format(date, "yyyy-MM-dd")};
    console.log(newItem);
    const res = await fetch('http://localhost:5000/lists/additem', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })

    const data = await res.json();
    setitems([...items, data])
  }

  //count objects in calendar
  function countItemsOnDate(date) {
    console.log(date);
    console.log(items);
    return items.filter((item) => item.createDate === date).length;
    // return items.filter((item) => format(item.createDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")).length;


  }

  return (
    <>
      <Header />
      {popupAddItem && <AddItem onDate={onClickDay} onAdd={addItem} onPopup={setpopupAddItem} onCloseClick={() => setpopupAddItem(!popupAddItem)}/>}
    <div className='container'>
      <Calendar 
        onChange={onChange}
        value={date}
        onClickDay={onClickDay}
        onAdd={() => setpopupAddItem(!popupAddItem)}
        tileContent={({ date, view }) => view === 'month' ? <p>{countItemsOnDate(date)}</p> : null}
        // onClickDay={(date) => alert("day" + date + "clicked")}
      />
    </div>
    <Items items={items} onDelete={deleteItem} onCheck={checkItem}/>
    </>
  )
}


export default App;