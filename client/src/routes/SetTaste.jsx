import react from "react";

import "../styles/App.scss";
import "../styles/SetTaste.scss";

import VerticalListView from "../components/list-view/VerticalListView";

function SetTaste() {
  return (
    <div className="set-taste">
      <div className="set-taste__text">
        <span className="set-taste__title">Let me know your taste</span>
        <span className="set-taste__description">
          Just pick as many as you can!
        </span>
      </div>
      <div className="set-taste__movie-list">
        <VerticalListView />
      </div>
      <div className="set-taste__done">
        <button className="border-button">DONE</button>
      </div>
    </div>
  );
}

export default SetTaste;
