import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/App.scss";
import "../styles/Search.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import BottomMenu from "../components/util/BottomMenu";

function Search() {
  const [movieIds, setMovieIds] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [movieList, setMovieList] = useState([]);

  function onChangeSearch(e) {
    setSearchText(e.target.value);
  }

  async function handleKeyPressSearch(e) {
    if (e.key === "Enter") {
      await searchMovie(searchText);
    }
  }

  function onClickTag(keyword) {
    setSearchText(keyword);
    searchMovieByKeyword(keyword);
  }

  async function searchMovie(searchText) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/search?keyword=${searchText}`
      );
      setKeywords(response.data.keywords);
      setMovieIds(response.data.movieIds);
      await getPosterAndIdList(response.data.movieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  async function searchMovieByKeyword(keyword) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/search/keyword?keyword=${keyword}`
      );
      setMovieIds(response.data.movieIds);
      await getPosterAndIdList(response.data.movieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  const getPosterAndIdList = async (movieIds) => {
    const promises = movieIds.map((movieId) =>
      axios
        .get(`http://${localhost}:5000/movie/poster?movieId=${movieId}`)
        .then((res) => {
          return {
            id: movieId,
            url: res.data.posterUrl,
          };
        })
    );
    const idAndPosters = await Promise.all(promises);
    setMovieList(idAndPosters);
  };

  return (
    <>
      <div className="search">
        <input
          className="main-input fa"
          value={searchText}
          onChange={onChangeSearch}
          onKeyPress={handleKeyPressSearch}
        ></input>
        {keywords && (
          <div className="search__tags">
            {keywords.map((keyword) => (
              <div className="search__tag" onClick={() => onClickTag(keyword)}>
                {keyword}
              </div>
            ))}
          </div>
        )}
        {movieIds && (
          <div className="search__movie-list">
            <VerticalListView movieList={movieList} isRating={false} />
          </div>
        )}
      </div>
      <BottomMenu />
    </>
  );
}

export default Search;
