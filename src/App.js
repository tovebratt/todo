import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './index.css';
import { format, compareAsc } from 'date-fns';
// import { format, moment, calendarFormat } from 'moment';


import Header from './components/Header';
import Items from './components/Items';
import AddItem from './components/AddItem';

const App = () => {

  const [date, onChange] = useState(new Date());
  const [popupAddItem, setpopupAddItem] = useState(false);

  const [items, setItems] = useState([])
  const [createDate, setCreateDate] = useState('');

  useEffect(() => {
    const getItems = async () => {
      const itemsFromServer = await fetchItems()
      // itemsFromServer.sort((a, b) => a.item.createDate - b.item.createDate ? 1 : -1);
      setItems(itemsFromServer)
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


  const onClickDay = (e) => {
    console.log(e);
    setpopupAddItem(true);
    <AddItem date={date}/>
  }


      // // delete item
      // const deleteItem = async (item) => {
      //   const itemId = item.itemId;
      //   setItems(items.filter((i) => i.itemId !== itemId))
      //   await fetch('http://localhost:5000/lists/deleteitem/'+ itemId, {
      //     method: 'DELETE',
      //   })
      // }


    // delete item
    const deleteItem = (item) => {
      const itemId = item.itemId;
      setItems(items.filter((i) => i.itemId !== itemId))

      fetch('http://localhost:5000/lists/deleteitem/'+ itemId, {
        method: 'DELETE',
      })
    }

  //check item
  const checkItem = (item) => {
    // console.log(itemId)
    // const itemToCheck = await fetchItem(itemId);
    const updateItem = { ...item, done: !item.done }
    console.log(updateItem);
    const itemId = item.itemId;
    console.log(itemId);
    console.log('1');

    const updatedItems = items.map((i) => {
      console.log(i.itemId, itemId);
      return i.itemId === itemId ? updateItem : i});
  
    console.log(updatedItems);
    setItems(updatedItems)

    fetch(`http://localhost:5000/lists/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateItem)
    })
   

    // //check item
    // const checkItem = async (item) => {
    //   // console.log(itemId)
    //   // const itemToCheck = await fetchItem(itemId);
    //   const updateItem = { ...item, done: !item.done }
    //   console.log(updateItem);
    //   const itemId = item.itemId;
    //   console.log(itemId);
    //   console.log('1');
  
    //   const updatedItems = items.map((i) => {
    //     console.log(i.itemId, itemId);
    //     return i.itemId === itemId ? updateItem : i});
    
    //   console.log(updatedItems);
    //   setItems(updatedItems)
  
    //   const res = await fetch(`http://localhost:5000/lists/items/${itemId}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(updateItem)
    //   })
    //   // const data = await res.json();
    //   console.log('2');


    

  }

  //Add item
  const addItem = async (item) => {
    console.log(item);
    console.log(item.item);
    console.log(date);
    const newItem = {item: item.item, createDate: format(date, "yyyy-MM-dd")};
    console.log(newItem);
    const res = await fetch('http://localhost:5000/lists/additem', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })

    const data = await res.json();
    setItems([...items, data])
  }

  //count objects in calendar
  function countItemsOnDate({date}) {
    // console.log(date);
    // console.log(items);
    let formattedDate = format(date, "yyyy-MM-dd");
    // console.log(formattedDate);
    let formattedDate2 = date.toISOString();
    // console.log(formattedDate2);
    // console.log(moment(item.createDate).toString)

    // let calendarDate = moment({date}, ['DDMMMMY', 'MMMMDDY']).format();
    // let itemDate = moment(item.createDate, ['DDMMMMY', 'MMMMDDY']).format()

    // return items.filter((item) => item.createDate === date.getTime()).length;
    return items.filter((item) => item.createDate === formattedDate2).length;
    // return items.filter((item) => itemDate === calendarDate).length;
    // return items.filter((item) => item.createDate === formattedDate).length;
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
          tileContent={({ date, view }) => view === 'month' ? <p>{countItemsOnDate({date})}</p> : null}
          // onClickDay={(date) => alert("day" + date + "clicked")}
        />
      </div>
      <Items items={items} onDelete={deleteItem} onCheck={checkItem}/>
    </>
  )
}


export default App;