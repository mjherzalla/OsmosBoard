import React from "react";
import logo from "./logo.png";
import icons from "./icons.json";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/sidebar.css";

interface Props {}

const Borad = (props: Props) => {
  return (
    <div className="sidebar">
      <img src={logo} width="50" />
      <span>
        Boards <FontAwesomeIcon icon={faPlus} />
      </span>

      <hr />
      <ul className="projectList">
        <li className="ActivePorject">
          <img src={icons[0].url} />
          Osmos
        </li>
        <li>
          <img src={icons[1].url} />
          Other Board
        </li>
        <li>
          <img src={icons[2].url} />
          Exmple
        </li>
        <li>
          <img src={icons[3].url} />
          Next
        </li>
        <li>
          <img src={icons[4].url} />
          Hr project
        </li>
        <li>
          <img src={icons[5].url} />
          something
        </li>
      </ul>
    </div>
  );
};

export default Borad;
