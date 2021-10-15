import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  height: 600,
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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

interface User {
  _id: number;
  userName: string;
  avatarColor: string;
  __v: string;
}
interface Props {
  card: CardProps;
  users: any;
  cards: any;
  setCards: (lists: any) => void;
}

export default function CardModal(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [usersMenuToggle, setUsersMenuToggle] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState("");
  const [currentCardID] = React.useState(props.card.cardID);
  let cardColor = "";
  switch (props.card.priority) {
    case "low":
      cardColor = "#329da8";
      break;
    case "medium":
      cardColor = "#69a832";
      break;
    default:
      cardColor = "#a83232";
  }

  const assginCard = (user: User) => {
    if (typeof user.userName === "undefined") {
      return;
    }
    fetch(
      "http://localhost:3001/assginUsertoCard?cardID=" +
        props.card.cardID +
        "&userName=" +
        user.userName +
        "&avatarColor=" +
        user.avatarColor.replace("#", ""),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => setUsersMenuToggle(!usersMenuToggle));

    const newcard = props.cards.slice();

    var index = newcard.findIndex(function (o: any) {
      return o.cardID === props.card.cardID;
    });
    const oldcardTitle = newcard[index].title;
    const oldcardpriority = newcard[index].priority;
    const oldcardListID = newcard[index].listID;
    const oldcarddate = newcard[index].date;
    if (index !== -1) newcard.splice(index, 1);

    newcard.push({
      title: oldcardTitle,
      listID: oldcardListID,
      priority: oldcardpriority,
      assignedTo: { userName: user.userName, avatarColor: user.avatarColor },
      date: oldcarddate,
    });
    props.setCards(newcard);
  };

  const updateCard = (cardID: string) => {
    fetch(
      "http://localhost:3001/updateCard?cardID=" +
        cardID +
        "&description=" +
        newDescription,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => console.log("good"));

    const newcardCopy = props.cards.slice();

    var index = newcardCopy.findIndex(function (o: any) {
      return o.cardID === props.card.cardID;
    });
    const oldcardTitle = newcardCopy[index].title;
    const oldcardpriority = newcardCopy[index].priority;
    const oldcardListID = newcardCopy[index].listID;
    const oldcarddate = newcardCopy[index].date;
    const oldcardassgin = newcardCopy[index].assignedTo;
    if (index !== -1) newcardCopy.splice(index, 1);

    newcardCopy.push({
      title: oldcardTitle,
      listID: oldcardListID,
      priority: oldcardpriority,
      description: newDescription,
      date: oldcarddate,
      assignedTo: oldcardassgin,
    });
    props.setCards(newcardCopy);
  };
  return (
    <div>
      <a onClick={handleOpen} className="cardTitle">
        {props.card.title}
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1>
              <FontAwesomeIcon icon={faCircle} style={{ color: cardColor }} />
              {props.card.title}
            </h1>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ display: "flex" }}
          >
            Assgin To :
            {props.card.assignedTo.userName != "none" && (
              <>
                <Avatar
                  sx={{
                    bgcolor: props.card.assignedTo.avatarColor,
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {props.card.assignedTo.userName.charAt(0)}
                </Avatar>
                <span>{props.card.assignedTo.userName}</span>
              </>
            )}
            {!usersMenuToggle ? (
              <button
                onClick={() => setUsersMenuToggle(!usersMenuToggle)}
                style={{ marginLeft: 10 }}
              >
                V
              </button>
            ) : (
              <button
                onClick={() => setUsersMenuToggle(!usersMenuToggle)}
                style={{ marginLeft: 10 }}
              >
                X
              </button>
            )}
          </Typography>
          {usersMenuToggle && (
            <ul style={{ listStyleType: "none", marginLeft: 30 }}>
              {props.users.map((user: User, index: number) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      assginCard(user);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 5,
                      cursor: "pointer",
                    }}
                  >
                    <Avatar sx={{ bgcolor: user.avatarColor }}>
                      {user.userName.charAt(0)}
                    </Avatar>
                    <span style={{ marginLeft: 10 }}>{user.userName}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <p
            suppressContentEditableWarning={true}
            contentEditable={true}
            style={{
              width: "100%",
              minHeight: 200,
              backgroundColor: "#f8f8f8",
              padding: 5,
            }}
            onBlur={(e) => setNewDescription(e.target.innerText)}
          >
            {props.card.description}
          </p>
          <button onClick={() => updateCard(currentCardID)}>Save</button>
        </Box>
      </Modal>
    </div>
  );
}
