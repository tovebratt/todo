import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import TodaysItems from "./TodaysItems";

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
  const [itemText, setItemText] = useState("");
  const [createDate, setCreateDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!itemText) {
      alert("add item");
      return;
    }

    onAdd( itemText );
    onDate({ createDate });
    onCloseClick();
    setItemText("");
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <TodaysItems
          items={items}
          onDelete={onDelete}
          onCheck={onCheck}
          onDate={createDate}
          date={date}
          clickedDate={clickedDate}
        />
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
              value={itemText}
              onChange={(e) => setItemText(e.target.value)}
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