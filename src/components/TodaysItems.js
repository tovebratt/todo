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
  // const [item, setitem] = useState("");
  const formattedClickedDate = clickedDate.toISOString();

  // const countTodaysItems = items.filter(
  //   (item) => item.createDate === formattedClickedDate
  // ).length;

//   if (countTodaysItems == 0) {
//     return (
//       <>
//         <h3>Dagens todo's</h3>
//         <p>Det finns inga aktiviteter idag.</p>
//       </>
//     );
//   } else {
//     return (
//       <>
//     <h3>Dagens todo's</h3>;
//     {items
//         .filter((item) => item.createDate === formattedClickedDate)
//         .map((item, itemId, date) => {
          
//             <Item
//               key={itemId}
//               item={item}
//               onDelete={onDelete}
//               onCheck={onCheck}
//               date={date}
//             />
//         });}
//   </>
//   );
// }

  return (
    <div className='todaysItems'>
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
    </div>
  );
};

export default TodaysItems;