import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import TodaysItems from "./TodaysItems";
import Item from "./Item";

const AddItem = ({
  onDate,
  onAdd,
  onCloseClick,
  items,
  onDelete,
  onCheck,
  clickedDate,
  date,
}) => {
  const [item, setitem] = useState("");
  const [createDate, setCreateDate] = useState("");
  // const [checked, setChecked] = useState(false);

  // onClickedDate();
  console.log(clickedDate);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!item) {
      alert("add item");
      return;
    }

    onAdd({ item });
    onDate({ createDate });
    onCloseClick();
    setitem("");
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <TodaysItems
          key={item.itemId}
          items={items}
          item={item}
          onDelete={onDelete}
          onCheck={onCheck}
          onDate={createDate}
          date={date}
          clickedDate={clickedDate}
        />
        {/* <Item key={item.itemId} item={item} onDelete={onDelete} onCheck={onCheck} /> */}
        <FaTimes className="close-btn" onClick={onCloseClick} />
        <form className="add-item" onSubmit={onSubmit}>
          <h4>
            Lägg till ny uppgift
            <br />{" "}
          </h4>
          <div className="input-add-item">
            <input
              type="text"
              placeholder="Uppgiftsbeskrivning"
              value={item}
              onChange={(e) => setitem(e.target.value)}
            />
            <br />
          </div>
          <input type="submit" value="SPARA" className="add-btn" />
        </form>
      </div>
    </div>
  );
};

export default AddItem;
