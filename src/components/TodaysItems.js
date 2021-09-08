// const TodaysItems = () => {
import { useState } from "react";
import Item from "./Item";
// import Items from './components/Items';

const TodaysItems = ({
  items,
  onDelete,
  onCheck,
  onDate,
  clickedDate,
  date,
}) => {
  const [item, setitem] = useState("");

  // console.log(clickedDate);
  const formattedClickedDate = clickedDate.toISOString();
  console.log(clickedDate);
  console.log(formattedClickedDate);
  console.log(items);

  return (
    <>
      <h3>Dagens todo's</h3>

      {items
        .filter((item) => item.createDate === formattedClickedDate)
        .map((item, itemId, date) => {
          return (
            <Item
              key={itemId}
              item={item}
              onDelete={onDelete}
              onCheck={onCheck}
              date={date}
            />
          );
        })}
    </>
  );
};

export default TodaysItems;

// tasks.map((task) =>
// task.id === id ? { ...task, reminder: data.reminder } : task
// )

// const updatedItems = items.map((i) => {
//   console.log(i.itemId, itemId);
//   return i.itemId === itemId ? updateItem : i});
