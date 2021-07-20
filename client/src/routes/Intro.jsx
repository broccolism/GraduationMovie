import react from "react";

import "../styles/Intro.scss";

function Intro() {
  return (
    <div className="intro">
      <div className="intro__text">
        <span>Input Your Nickname!</span>
      </div>
      <div className="intro__form-nickname">
        <input className="main-input"></input>
        <button className="main-button">NEXT</button>
      </div>
    </div>
  );
}

export default Intro;
