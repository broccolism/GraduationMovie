import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/Main.scss";
import styled from "styled-components";

import VerticalListView from "../components/list-view/VerticalListView";
import HorizontalListView from "../components/list-view/HorizontalListView";
import BottomMenu from "../components/util/BottomMenu";
import UserCookie from "../utils/cookie";
import CenterLoading from "../components/util/CenterLoading";
import StyledEmptyDiv from "../components/util/StyledEmptyDiv";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [firstMovie, setFirstMovie] = useState();
  const [nickname, setNickname] = useState("");
  const [similarUserId, setSimilarUserId] = useState();
  const [similarUserNickname, setSimilarUserNickname] = useState("");
  const [similarUserLikedMovieIds, setSimilarUserLikedMovieIds] = useState([]);
  const [similarUserMovieList, setSimilarUserMovieList] = useState([]);

  const [moreButtonCount, setMoreButtonCount] = useState(1);
  const PAGE_SIZE = 7;
  const BY_USER_COUNT = 3;

  useEffect(() => {
    async function fetchData() {
      try {
        const getTopNMoviesRes = await getTopNMoviesById();
        setMoreButtonCount(moreButtonCount + 1);

        const firstId = getTopNMoviesRes.data.movieIds[0];
        const otherIds = getTopNMoviesRes.data.movieIds.filter(
          (id) => id !== firstId
        );

        await Promise.all([
          getFirstMovie(firstId),
          getOtherMovies(otherIds),
          getUserNickname(),
          getSimilarUser(),
        ]);

        setIsLoading(false);
      } catch (err) {
        console.log("@@@@@@ fetch data ERR", err);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const getUserNickname = async () => {
    try {
      const userId = UserCookie.getUserId();
      const response = await axios.get(
        `http://${localhost}:5000/user/info?userId=${userId}`
      );
      setNickname(response.data.nickname);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  };

  const getSimilarUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/user/similar?id=${userId}`
      );
      setSimilarUserId(response.data.userId);
      setSimilarUserNickname(response.data.nickname);
      setSimilarUserLikedMovieIds(response.data.likedMovieIds);
      await getPosterAndIdList(response.data.likedMovieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  };

  const getTopNMoviesById = async () => {
    const userId = UserCookie.getUserId();
    return await axios.get(
      `http://${localhost}:5000/movie/top-n/user?userId=${userId}&size=${PAGE_SIZE}&page=${moreButtonCount}`
    );
  };

  const getTopNMoviesForEvery = async () => {
    return await axios.get(
      `http://${localhost}:5000/movie/top-n/every?size=${PAGE_SIZE}&page=${
        moreButtonCount - BY_USER_COUNT
      }`
    );
  };

  const getFirstMovie = async (movieId) => {
    const getImageAndIdRes = await axios.get(
      `http://${localhost}:5000/movie/image?movieId=${movieId}`
    );

    setFirstMovie(getImageAndIdRes.data);
  };

  const getOtherMovies = async (movieIds) => {
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
    const result = await Promise.all(promises);

    setMovieList(result);
  };

  const handleMoreButton = async () => {
    setIsMoviesLoading(true);
    if (moreButtonCount <= BY_USER_COUNT) {
      const getTopNMoviesRes = await getTopNMoviesById();
      const firstId = getTopNMoviesRes.data.movieIds[0];
      const otherIds = getTopNMoviesRes.data.movieIds.filter(
        (id) => id !== firstId
      );
      await Promise.all([getFirstMovie(firstId), getOtherMovies(otherIds)]);
    } else {
      const getTopNMoviesEveryRes = await getTopNMoviesForEvery();
      const firstId = getTopNMoviesEveryRes.data.movieIds[0];
      const otherIds = getTopNMoviesEveryRes.data.movieIds.filter(
        (id) => id !== firstId
      );
      await Promise.all([getFirstMovie(firstId), getOtherMovies(otherIds)]);
    }
    setIsMoviesLoading(false);
    setMoreButtonCount(moreButtonCount + 1);
  };

  const getPosterAndIdList = async (movieIds) => {
    const promises = movieIds.map((movieId) =>
      axios
        .get(`http://${localhost}:5000/movie/firstMovie?movieId=${movieId}`)
        .then((res) => {
          return {
            id: movieId,
            url: res.data.posterUrl,
          };
        })
    );
    const idAndPosters = await Promise.all(promises);
    setSimilarUserMovieList(idAndPosters);
  };

  return (
    <>
      {isLoading ? (
        <CenterLoading />
      ) : (
        <div className="main">
          <div className="main__title">
            <div>Top 7 movies for you, {nickname}</div>
          </div>
          <div className="main__best-recommend">
            <div className="main__best-recommend-image-wrapper">
              <div className="main__best-recommend-image">
                <img src={firstMovie.imageUrl} />
              </div>
              <div className="main__transparent-layer"></div>
            </div>
            <div className="main__best-recommend-text">
              <div className="main__emphasis">best fit!</div>
              <div className="main__description">{firstMovie.title}</div>
            </div>
          </div>

          <div className="main__item-similar-recommend">
            {isMoviesLoading ? (
              <CenterLoading />
            ) : (
              <VerticalListView movieList={movieList} />
            )}
          </div>
          <div className="main__reload-button">
            <button className="border-white-button" onClick={handleMoreButton}>
              <i className="fas fa-redo"></i> &nbsp;&nbsp; I want more
            </button>
          </div>

          <div className="main__title">
            <div>We found someone like you!</div>
          </div>

          <div className="main__profile">
            <div className="main__profile-image">
              <img
                src={`https://gravatar.com/avatar/${similarUserId}?s=200&r=pg&d=identicon&f=y`}
              />
            </div>
            <div className="main__title">
              <div>{similarUserNickname}</div>
            </div>
          </div>

          <div className="main__title">
            <div>{similarUserNickname} recently liked</div>
          </div>
          <div className="main__user-similar-recommend">
            <HorizontalListView movieList={movieList} />
          </div>
        </div>
      )}
      <BottomMenu />
    </>
  );
}

export default Main;
