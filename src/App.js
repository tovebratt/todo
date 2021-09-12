import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./index.css";
import moment, { format } from "moment";

import Header from "./components/Header";
import Items from "./components/Items";
import AddItem from "./components/AddItem";

const App = () => {
  const [date, onChange] = useState(new Date());
  const [popupAddItem, setPopupAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [clickedDate, setClickedDate] = useState();

  // useEffect(() => {
  //   const getItems = async () => {
  //     // const itemsFromServer = 
  //     await fetchItems();
  //     // setItems(itemsFromServer);
  //   };

  //   getItems();
  // }, []);


  //fetch data
  const fetchItems = async () => {
    // const res = await fetch("https://tove-bratt-todo-backend.herokuapp.com/lists/items");
    const res = await fetch("http://localhost:5000/lists/items");

    const data = await res.json();
    setItems(data);
  };
  
  useEffect(fetchItems, [])

  // //fetch item
  // const fetchItem = async (itemId) => {
  //   const res = await fetch(`http://localhost:5000/lists/items/${itemId}`)
  //   const data = await res.json()
  //   return data
  // }

  // show pop up on click
  const onClickDay = (e) => {
    const clickedDate = e;

    //showPopup
    setPopupAddItem(true);
    setClickedDate(clickedDate);
  };

  // delete item
  const deleteItem = (item) => {
    const itemId = item.itemId;
    setItems(items.filter((i) => i.itemId !== itemId));

    // fetch("https://tove-bratt-todo-backend.herokuapp.com/lists/deleteitem/" + itemId, {
      fetch("http://localhost:5000/lists/deleteitem/" + itemId, {
      method: "DELETE",
    });
  };

  //check item
  const checkItem = (item) => {
    const updateItem = { ...item, done: !item.done };
    const itemId = item.itemId;

    const updatedItems = items.map((i) => {
      return i.itemId === itemId ? updateItem : i;
    });

    setItems(updatedItems);

    // fetch(`https://tove-bratt-todo-backend.herokuapp.com/lists/items/${itemId}`, {
      fetch(`http://localhost:5000/lists/items/${itemId}`, {

      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateItem),
    });
  };

  //add item
  const addItem = async (itemText) => {
    moment(date).format("YYYY-MM-DD HH:MM:SS");

    const newItem = {
      item: itemText,
      createDate: moment(date).utc(true).format("YYYY-MM-DD HH:mm:ss"),
    };

    // fetch("https://tove-bratt-todo-backend.herokuapp.com/lists/additem", {
      await fetch("http://localhost:5000/lists/additem", {

      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    fetchItems();
  };

  // //count objects in calendar
  // function countItemsOnDate({ date }) {
  //   let formattedDate = date.toISOString();
  //   return items.filter((item) => item.createDate === formattedDate).length;
  // }

  //count objects in calendar
  function countItemsOnDate({ date }) {
    
    let formattedDate = date.toISOString();
    let countedItems = items.filter((item) => item.createDate === formattedDate)
      .length;

    if (countedItems >= 1) {
      return countedItems;
    } else {
      return "-";
    }
  }

  return (
    <>
      <Header />
      {popupAddItem && (
        <AddItem
          items={items}
          onDate={onClickDay}
          onAdd={addItem}
          onPopup={setPopupAddItem}
          date={date}
          clickedDate={clickedDate}
          onDelete={deleteItem}
          onCheck={checkItem}
          onCloseClick={() => setPopupAddItem(!popupAddItem)}
        />
      )}
      <div className="container">
        <Calendar
          onChange={onChange}
          value={date}
          onClickDay={onClickDay}
          onAdd={() => setPopupAddItem(!popupAddItem)}
          tileContent={({ date, view }) =>
            view === "month" ? <p>{countItemsOnDate({ date })}</p> : null
          }
          // onClickDay={(date) => alert("day" + date + "clicked")}
        />
      </div>
      <div className="container">
        <Items items={items} onDelete={deleteItem} onCheck={checkItem} />
      </div>
    </>
  );
};

export default App;
