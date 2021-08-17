import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/App.scss";
import "../styles/Search.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import CenterLoading from "../components/util/CenterLoading";
import styled from "styled-components";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [movieIds, setMovieIds] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

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

  async function onClickTag(keyword) {
    setIsLoading(true);
    setSearchText(keyword);
    await searchMovieByKeyword(keyword);
    setIsLoading(false);
  }

  async function searchMovie(searchText) {
    try {
      let curPage = page;
      let keywords = [];
      let movieIds = [];
      while (movieIds.length < 21) {
        const res = await axios.get(
          `http://${localhost}:5000/movie/search?keyword=${searchText}&page=${curPage}`
        );
        const data = res.data;
        keywords = keywords.concat(data.keywords);
        movieIds = movieIds.concat(data.movieIds);
        curPage += 1;
      }

      setPage(curPage);
      setKeywords(keywords);
      setMovieIds(movieIds);
      await getPosterAndIdList(movieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  const searchOnScrollDown = async () => {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/search?keyword=${searchText}&page=${page}`
      );
      setMovieIds(movieIds.concat(response.data.movieIds));
      await getPosterAndIdList(response.data.movieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  };

  async function searchMovieByKeyword(keyword) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/search/keyword?keyword=${keyword}&page=${page}`
      );
      setMovieIds(response.data.movieIds);
      await getPosterAndIdList(response.data.movieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  const getPosterAndIdList = async (movieIds, isConcat) => {
    const promises = movieIds.map((movieId) =>
      axios
        .get(`http://${localhost}:5000/movie/poster?movieId=${movieId}`)
        .then((res) => {
          return {
            id: movieId,
            url: res.data.posterUrl,
            title: res.data.title.split(", The")[0],
          };
        })
    );
    const idAndPosters = (await Promise.all(promises)).filter(
      (movie) => movie.url !== ""
    );
    setMovieList(isConcat ? idAndPosters.concat(movieList) : idAndPosters);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = async () => {};

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
              <div
                key={keyword}
                className="search__tag"
                onClick={async () => await onClickTag(keyword)}
              >
                {keyword}
              </div>
            ))}
          </div>
        )}
        {isLoading && <CenterLoading />}
        {!isLoading && movieIds.length === 0 && (
          <EmptyText>
            Oops, no results yet. <br />
            <br />
            Search by title, keyword, actors... etc.
          </EmptyText>
        )}
        {!isLoading && movieIds && (
          <div className="search__movie-list">
            <VerticalListView movieList={movieList} isRating={false} />
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

const EmptyText = styled.div`
  width: 100%;
  padding: 200px 0px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  opacity: 0.65;
`;
