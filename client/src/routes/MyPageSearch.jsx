import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/App.scss";
import "../styles/MyPageSearch.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import BottomMenu from "../components/util/BottomMenu";

function MyPageSearch() {
  const [movieList, setMovieList] = useState([]);

  return (
    <>
      <div class="header-back">
        <Link to="/my-page">
          <i class="fas fa-chevron-left"></i>
        </Link>
        <div class="header-back__title">Movie watched</div>
      </div>
      <div class="mypage-search">
        <input class="main-input"></input>
        <div class="search__movie-list">
          <VerticalListView movieList={movieList} isRating={false} />
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default MyPageSearch;
