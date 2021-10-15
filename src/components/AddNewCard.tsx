import React from "react";
import "./styles/addNewCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles/card.css";

interface Props {
  listID: string;
  setCards: (lists: any) => void;
  cards: any;
}

const AddNewCard = (props: Props) => {
  const [isToggled, setIsToggled] = React.useState(false);
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardPriority, setCardPriority] = React.useState("low");

  const createNewCard = () => {
    fetch(
      "http://localhost:3001/createNewCard?title=" +
        cardTitle +
        "&listID=" +
        props.listID +
        "&priority=" +
        cardPriority,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => setIsToggled(false));
    const newlist = props.cards.slice();
    newlist.push({
      title: cardTitle,
      listID: props.listID,
      priority: cardPriority,
      assignedTo: { userName: "none", avatarColor: "" },
      date: "now",
      description: "enter here description",
    });
    props.setCards(newlist);
  };

  return (
    <>
      {!isToggled && (
        <button
          className="addnewCardBtn"
          onClick={() => setIsToggled(true)}
          id="myBtn"
        >
          <FontAwesomeIcon icon={faPlus} /> New card
        </button>
      )}

      {isToggled && (
        <div className="newCardForm">
          <div className="newlistForm-content">
            <div className="newlistForm-header">
              <span style={{ flexGrow: 1 }}>Card Title:</span>
              <button onClick={() => setIsToggled(false)} className="close">
                X
              </button>
            </div>
            <input
              className="titleInput"
              onChange={(e) => setCardTitle(e.target.value)}
            ></input>
            <label>Priority :</label>
            <select
              onChange={(e) => setCardPriority(e.target.value)}
              name="urgency "
              id="urgency "
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="critical">Critical</option>
            </select>
            <div className="btns">
              <button onClick={() => createNewCard()} className="close">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewCard;
