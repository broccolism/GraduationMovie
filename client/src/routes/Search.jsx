import react, { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/App.scss";
import "../styles/Search.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import styled from "styled-components";
import ShimmerGird from "../components/search/ShimmerGrid";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [movieIds, setMovieIds] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  const saveCurState = (keywords, movieList, movieIds) => {
    window.localStorage.setItem(
      "search",
      JSON.stringify({
        movieIds,
        keywords,
        searchText,
        movieList,
        page,
      })
    );
  };

  useEffect(() => {
    const state = JSON.parse(window.localStorage.getItem("search"));
    console.log("@@@@@@@@@@@@@@@@@@@@state", state);
    if (state) {
      setMovieIds(state.movieIds);
      setKeywords(state.keywords);
      setSearchText(state.searchText);
      setMovieList(state.movieList);
      setPage(state.page);
    }
  }, []);

  function onChangeSearch(e) {
    setPage(1);
    setSearchText(e.target.value);
  }

  async function handleKeyPressSearch(e) {
    if (e.key === "Enter") {
      if (searchText.length > 0) {
        setIsLoading(true);
        await searchMovie(searchText);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setMovieIds([]);
        setKeywords([]);
      }
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
        if (data.movieIds.length == 0) {
          throw "fetch data err";
        }
        keywords = keywords.concat(data.keywords);
        movieIds = movieIds.concat(data.movieIds);
        curPage += 1;
      }
      const movieList = await getPosterAndIdList(movieIds);

      setPage(curPage);
      setKeywords(keywords);
      setMovieIds(movieIds);
      setMovieList(movieList);
      saveCurState(keywords, movieList, movieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
      setKeywords([]);
      setMovieIds([-1]);
      console.log("@@@@@@@@@@@@@", movieIds);
      saveCurState([], [], [-1]);
    }
  }

  const searchOnScrollDown = async () => {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/search?keyword=${searchText}&page=${page}`
      );
      setMovieIds(movieIds.concat(response.data.movieIds));
      const movieList = await getPosterAndIdList(response.data.movieIds);
      setMovieList(movieList);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  };

  async function searchMovieByKeyword(keyword) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/search/keyword?keyword=${keyword}&page=${page}`
      );

      if (response.data.movieIds.length > 0) {
        const movieList = await getPosterAndIdList(response.data.movieIds);
        setMovieIds(response.data.movieIds);
        setMovieList(movieList);
        saveCurState(keywords, movieList, movieIds);
      } else {
        setMovieIds([-1]);
        setKeywords([]);
        saveCurState(keywords, [], [-1]);
      }
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
    return isConcat ? idAndPosters.concat(movieList) : idAndPosters;
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
            {keywords.map((keyword, index) => (
              <div
                key={keyword + index.toString()}
                className="search__tag"
                onClick={async () => await onClickTag(keyword)}
              >
                {keyword}
              </div>
            ))}
          </div>
        )}
        {isLoading && <ShimmerGird />}
        {!isLoading && movieIds[0] === -1 && (
          <EmptyText>
            <BigText>🥲</BigText>
            <br />
            Ooops, no result yet.
          </EmptyText>
        )}
        {!isLoading && movieIds.length === 0 && (
          <EmptyText>Search by title, keyword, actors... etc.</EmptyText>
        )}
        {!isLoading && movieIds[0] !== -1 && movieIds.length > 0 && (
          <div className="search__movie-list">
            <VerticalListView movieList={movieList} isRating={false} />
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

const BigText = styled.div`
  font-size: 30px;
`;

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
