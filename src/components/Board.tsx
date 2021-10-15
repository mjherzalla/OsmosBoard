import React, { useState, useEffect } from "react";
import "./styles/board.css";
import { faCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/card.css";
import AddNewCard from "./AddNewCard";
import AddNewList from "./AddNewList";
import AddNewUser from "./AddNewUser";
import MoveCardMenu from "./MoveCardMenu";
import CardModal from "./CardModal";
import { Avatar } from "@mui/material";
interface CardProps {
  _id: number;
  cardID: string;
  listID: string;
  title: string;
  description: string;
  status: string;
  assignedTo: { userName: string; avatarColor: string };
  date: string;
  priority: string;
  __v: 0;
}
interface List {
  _id: number;
  listID: string;
  listTitle: string;
  listStatus: string;
  __v: string;
}

interface User {
  _id: number;
  userName: string;
  avatarColor: string;
  __v: string;
}

const Borad = () => {
  let [lists, setLists] = useState([]);
  let [cards, setCards] = useState([]);
  let [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/getLists")
      .then((response) => response.json())
      .then((data) => setLists(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/getCards")
      .then((response) => response.json())
      .then((data) => setCards(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/getUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const updateListTitle = (id: string, newTitle: string, Index: number) => {
    fetch(
      "http://localhost:3001/updateListTitle?listID=" +
        id +
        "&listTitle=" +
        newTitle +
        "",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    let newArr: any = lists.slice();
    newArr[Index].listTitle = newTitle;

    setLists(newArr);
  };

  return (
    <div className="board">
      <div className="header">
        <h2>
          <span>Board: </span>Osmos Board
        </h2>
      </div>
      <div className="filter">
        <span>Users:</span>
        {users.map((user: User) => {
          return (
            <Avatar key={user.userName} sx={{ bgcolor: user.avatarColor }}>
              {user.userName.charAt(0)}
            </Avatar>
          );
        })}

        <AddNewUser users={users} setUsers={setUsers} />
      </div>
      <div>
        <div className="rows">
          {lists.map((list: List, Index: number) => {
            return (
              <div className="list" key={list.listTitle}>
                <div className="listCards">
                  <div className="listHeader">
                    <h4
                      suppressContentEditableWarning={true}
                      contentEditable={true}
                      onBlur={(e) =>
                        updateListTitle(list.listID, e.target.innerText, Index)
                      }
                    >
                      {list.listTitle}
                    </h4>
                  </div>
                  {cards
                    .filter((card: CardProps) => {
                      if (card.listID == list.listID) {
                        return card;
                      }
                    })
                    .map((card: CardProps) => {
                      var cardColor = "";

                      switch (card.priority) {
                        case "low":
                          cardColor = "#329da8";
                          break;
                        case "medium":
                          cardColor = "#69a832";
                          break;
                        default:
                          cardColor = "#a83232";
                      }
                      return (
                        <div className="card" key={card.cardID}>
                          <div className="cardHeader">
                            <FontAwesomeIcon
                              icon={faCircle}
                              style={{ color: cardColor }}
                            />
                            <MoveCardMenu
                              cardID={card.cardID}
                              lists={lists}
                              cards={cards}
                              setCards={setCards}
                              currentListID={card.listID}
                            />
                          </div>
                          <div className="cardBody">
                            <CardModal
                              card={card}
                              users={users}
                              cards={cards}
                              setCards={setCards}
                            />
                          </div>
                          <hr />
                          <div className="cardFooter">
                            <span className="time">
                              <FontAwesomeIcon icon={faClock} /> {card.date}
                            </span>
                            {card.assignedTo.userName != "none" && (
                              <Avatar
                                sx={{ bgcolor: card.assignedTo.avatarColor }}
                              >
                                {card.assignedTo.userName.charAt(0)}
                              </Avatar>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  <AddNewCard
                    listID={list.listID}
                    cards={cards}
                    setCards={setCards}
                  />
                </div>
              </div>
            );
          })}
          <AddNewList setLists={setLists} lists={lists} />
        </div>
      </div>
    </div>
  );
};

export default Borad;
