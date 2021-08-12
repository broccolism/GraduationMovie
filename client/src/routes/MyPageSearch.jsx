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
      <div className="header-back">
        <Link to="/my-page">
          <i class="fas fa-chevron-left"></i>
        </Link>
        <div className="header-back__title">Movie watched</div>
      </div>
      <div className="mypage-search">
        <input className="main-input"></input>
        <div className="search__movie-list">
          <VerticalListView movieList={movieList} isRating={false} />
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default MyPageSearch;
