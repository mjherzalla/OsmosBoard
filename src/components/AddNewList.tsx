import React from "react";
import "./styles/addNewList.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles/card.css";

interface CardProps {
  setLists: (lists: any) => void;
  lists: any;
}

const AddNewList = (props: CardProps) => {
  const [isToggled, setIsToggled] = React.useState(false);
  const [listTitle, setListTitle] = React.useState("");
  const newID = Math.random().toString(36).substr(2, 9);
  const createNewList = () => {
    fetch(
      "http://localhost:3001/createNewList?listTitle=" +
        listTitle +
        "&listID=" +
        newID,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => setIsToggled(false));
    const newlist = props.lists.slice();
    newlist.push({ listTitle: listTitle, listID: newID });
    props.setLists(newlist);
  };

  return (
    <>
      {!isToggled && (
        <a
          className="addnewlistBtn"
          onClick={() => setIsToggled(true)}
          id="myBtn"
        >
          <FontAwesomeIcon icon={faPlus} /> New List
        </a>
      )}

      {isToggled && (
        <div className="newlistForm">
          <div className="newlistForm-content">
            <div className="newlistForm-header">
              <span style={{ flexGrow: 1 }}>List Title:</span>
              <button onClick={() => setIsToggled(false)} className="close">
                X
              </button>
            </div>
            <input
              onChange={(e) => {
                setListTitle(e.target.value);
              }}
              className="titleInput"
            ></input>
            <div className="btns">
              <button onClick={() => createNewList()} className="close">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewList;
