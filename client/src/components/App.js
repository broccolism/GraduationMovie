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
import Search from "../routes/Search";
import MyPage from "../routes/MyPage";
import MyPageSearch from "../routes/MyPageSearch";
import BottomMenu from "./util/BottomMenu";
import { ConsoleWriter } from "istanbul-lib-report";

function App() {
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
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Route path="/" exact component={SetNickname} />
        <Route path="/set-taste" exact component={SetTaste} />
        <Route path="/main" exact component={Main} />
        <Route path="/movie-detail/:id" exact component={MovieDetail} />
        <Route path="/search" exact component={Search} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/mypage/search" exact component={MyPageSearch} />
      </div>
      {window.location.pathname !== "/set-taste" &&
        window.location.pathname !== "/" && <BottomMenu />}
    </ThemeProvider>
  );
}

export default App;
