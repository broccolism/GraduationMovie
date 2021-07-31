import React from "react";
import { Route } from "react-router-dom";

import "../styles/App.scss";
import "../styles/Util.scss";

import SetNickname from "../routes/SetNickname";
import SetTaste from "../routes/SetTaste";
import Main from "../routes/Main";

function App() {
  // route intro
  // route main
  // route movie detail
  // route search
  // route my page
  // <MenuTab/>

  return (
    <div className="App">
      <Route path="/" exact component={SetNickname} />
      <Route path="/set-taste" exact component={SetTaste} />
      <Route path="/main" exact component={Main} />
    </div>
  );
}

export default App;
