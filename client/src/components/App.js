import React from "react";
import { Route } from "react-router-dom";

import "../styles/App.scss";
import "../styles/Util.scss";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import SetNickname from "../routes/SetNickname";
import SetTaste from "../routes/SetTaste";
import Main from "../routes/Main";
import MovieDetail from "../routes/MovieDetail";

function App() {
  // route intro
  // route main
  // route movie detail
  // route search
  // route my page
  // <MenuTab/>

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#a662ea",
      },
      secondary: {
        main: "#eab462",
      },
    },
  });

  return (
    <div className="App">
      <Route path="/" exact component={SetNickname} />
      <Route path="/set-taste" exact component={SetTaste} />
      <Route path="/main" exact component={Main} />
      <Route path="/movie-detail" exact component={MovieDetail} />
    </div>
  );
}

export default App;
