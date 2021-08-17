import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/App.scss";
import "../styles/MyPageSearch.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import UserCookie from "../utils/cookie";
import CenterLoading from "../components/util/CenterLoading";

function MyPageSearch() {
  const [watchedMovieList, setWatchedMovieList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const user_id = UserCookie.getUserId();
        setUserId(user_id);

        setIsLoading(false);
      } catch (err) {
        console.log("@@@@@@ fetch data ERR", err);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function searchMovie(searchText) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/user/search/watched?keyword=${searchText}&userId=${userId}`
      );

      setWatchedMovieList(response.data.movieIds);
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
    const idAndPosters = (await Promise.all(promises)).filter(
      (movie) => movie.url !== ""
    );
    setWatchedMovieList(idAndPosters);
  };

  function onChangeSearch(e) {
    setSearchText(e.target.value);
  }

  async function handleKeyPressSearch(e) {
    if (e.key === "Enter") {
      setIsLoading(true);
      await searchMovie(searchText);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="header-back">
        <Link to="/mypage">
          <i className="fas fa-chevron-left"></i>
        </Link>
        <div className="header-back__title">Movie watched</div>
      </div>
      <div className="mypage-search">
        <input
          className="main-input"
          value={searchText}
          onChange={onChangeSearch}
          onKeyPress={handleKeyPressSearch}
        ></input>
        {isLoading ? (
          <CenterLoading />
        ) : !!watchedMovieList ? (
          <div className="search__movie-list">
            <VerticalListView movieList={watchedMovieList} isRating={false} />
          </div>
        ) : (
          <div className="search__nothing">No results</div>
        )}
      </div>
    </>
  );
}

export default MyPageSearch;
