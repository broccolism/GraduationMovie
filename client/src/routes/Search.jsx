import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/App.scss";
import "../styles/Search.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import BottomMenu from "../components/util/BottomMenu";

function Search() {
  const [movieList, setMovieList] = useState([]);
  const tagList = [
    "musical",
    "romance",
    "엠마스톤",
    "musical",
    "romance",
    "엠마스톤",
    "musical",
    "romance",
    "엠마스톤",
  ];

  return (
    <>
      <div className="search">
        <input className="main-input"></input>
        <div className="search__tags">
          {tagList.map((tagName) => (
            <div className="search__tag">{tagName}</div>
          ))}
        </div>
        <div className="search__movie-list">
          <VerticalListView movieList={movieList} isRating={false} />
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default Search;
