import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

interface Porps {
  cardID: string;
  cards: any;
  lists: any;
  setCards: (lists: any) => void;
  currentListID: string;
}
interface List {
  _id: number;
  listID: string;
  listTitle: string;
  listStatus: string;
  __v: string;
}

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
export default function BasicPopover(props: Porps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const moveCard = (listID: string, cardID: string) => {
    if (typeof listID === "undefined" || typeof cardID === "undefined") {
      return;
    }
    fetch(
      "http://localhost:3001/updateCardListID?listID=" +
        listID +
        "&cardID=" +
        cardID,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => setAnchorEl(null));

    const newlist = props.cards.slice();

    var index = newlist.findIndex(function (o: any) {
      return o.cardID === cardID;
    });
    const oldcardTitle = newlist[index].title;
    const oldcardpriority = newlist[index].priority;
    const oldcardassignedTo = newlist[index].assignedTo;
    const oldcarddate = newlist[index].date;
    if (index !== -1) newlist.splice(index, 1);

    newlist.push({
      title: oldcardTitle,
      listID: listID,
      priority: oldcardpriority,
      assignedTo: oldcardassignedTo,
      date: oldcarddate,
    });
    props.setCards(newlist);
  };

  return (
    <div>
      <button aria-describedby={id} onClick={handleClick}>
        <FontAwesomeIcon
          style={{ color: "#ff3377", cursor: "pointer" }}
          icon={faEllipsisV}
        />
      </button>
      <Popover
        style={{ padding: 5 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }} style={{ fontSize: 14 }}>
          Move to:
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {props.lists.map((x: List) => {
              return (
                <>
                  {props.currentListID != x.listID && (
                    <li
                      style={{
                        listStyleType: "none",
                        margin: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => moveCard(x.listID, props.cardID)}
                    >
                      {x.listTitle}
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </Typography>
      </Popover>
    </div>
  );
}
