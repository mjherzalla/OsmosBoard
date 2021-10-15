import React from "react";
import "./styles/addNewList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles/card.css";

interface CardProps {
  setUsers: (lists: any) => void;
  users: any;
}

const AddNewUser = (props: CardProps) => {
  const [isToggled, setIsToggled] = React.useState(false);
  const [newUserName, setNewUserName] = React.useState("");

  const createNewUser = () => {
    const colors = [
      "#f54272",
      "#1d1f75",
      "#1d5f75",
      "#75291d",
      "#37751d",
      "#1d2d75",
      "#751d1d",
      "#431d75",
      "#1d7553",
    ];
    var avatarColor = colors[Math.floor(Math.random() * 10)];

    fetch(
      "http://localhost:3001/addUserToBorad?userName=" +
        newUserName +
        "&avatarColor=" +
        avatarColor.replace("#", ""),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => setIsToggled(false));
    const newlist = props.users.slice();
    newlist.push({ userName: newUserName, avatarColor: avatarColor });
    props.setUsers(newlist);
  };

  return (
    <>
      {!isToggled && (
        <button
          className="addnewuserBtn"
          onClick={() => setIsToggled(true)}
          id="myBtn"
        >
          <FontAwesomeIcon icon={faPlus} /> <span>New User</span>
        </button>
      )}

      {isToggled && (
        <div className="">
          <div className="newUserForm-content">
            <button onClick={() => setIsToggled(false)} className="close">
              X
            </button>

            <input
              onChange={(e) => {
                setNewUserName(e.target.value);
              }}
              className="titleInput"
              placeholder="user name"
            ></input>
            <div className="btns">
              <button onClick={() => createNewUser()} className="close">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewUser;
