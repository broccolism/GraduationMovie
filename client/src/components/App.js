import React from "react";
import { Route } from "react-router-dom";

import "../styles/App.scss";
import "../styles/Util.scss";

import Intro from "../routes/Intro";

function App() {
  // route intro
  // route main
  // route movie detail
  // route search
  // route my page
  // <MenuTab/>

  return (
    <div className="App">
      <Route path="/" exact component={Intro} />
    </div>
  );
}

export default App;
