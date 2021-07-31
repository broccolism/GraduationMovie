import react from "react";
import { Link } from "react-router-dom";

import "../styles/SetNickname.scss";

function SetNickname() {
  return (
    <div className="set-nickname">
      <div className="set-nickname__text">
        <span>Input Your Nickname!</span>
      </div>
      <div className="set-nickname__form-nickname">
        <input className="main-input"></input>
        <Link to="/set-taste">
          <button className="main-button">NEXT</button>
        </Link>
      </div>
    </div>
  );
}

export default SetNickname;
