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

  const [byUserCount, setByUserCount] = useState(1);
  const [forEveryCount, setForEveryCount] = useState(1);
  const BY_USER_ERROR = "by user error";
  const PAGE_SIZE = 7;
  const BY_USER_COUNT = 3;

  useEffect(() => {
    async function fetchData() {
      try {
        const getTopNMoviesRes = await getTopNMoviesById();
        setByUserCount(byUserCount + 1);

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
        if (err === BY_USER_ERROR) {
          const getTopNMoviesRes = await getTopNMoviesForEvery();

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

          setForEveryCount(forEveryCount + 1);
          setIsLoading(false);
        } else {
        }
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
    try {
      const userId = UserCookie.getUserId();
      return await axios.get(
        `http://${localhost}:5000/movie/top-n/user?userId=${userId}&size=${PAGE_SIZE}&page=${byUserCount}`
      );
    } catch (err) {
      throw BY_USER_ERROR;
    }
  };

  const getTopNMoviesForEvery = async () => {
    console.log("@@@@@@@@@@", forEveryCount);
    return await axios.get(
      `http://${localhost}:5000/movie/top-n/every?size=${PAGE_SIZE}&page=${forEveryCount}`
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
    try {
      if (byUserCount <= BY_USER_COUNT) {
        const getTopNMoviesRes = await getTopNMoviesById();
        const firstId = getTopNMoviesRes.data.movieIds[0];
        const otherIds = getTopNMoviesRes.data.movieIds.filter(
          (id) => id !== firstId
        );
        await Promise.all([getFirstMovie(firstId), getOtherMovies(otherIds)]);
        setByUserCount(byUserCount + 1);
      } else {
        const getTopNMoviesEveryRes = await getTopNMoviesForEvery();
        const firstId = getTopNMoviesEveryRes.data.movieIds[0];
        const otherIds = getTopNMoviesEveryRes.data.movieIds.filter(
          (id) => id !== firstId
        );
        await Promise.all([getFirstMovie(firstId), getOtherMovies(otherIds)]);
        setForEveryCount(forEveryCount + 1);
      }
    } catch (err) {
      if (err === BY_USER_ERROR) {
        const getTopNMoviesEveryRes = await getTopNMoviesForEvery();
        const firstId = getTopNMoviesEveryRes.data.movieIds[0];
        const otherIds = getTopNMoviesEveryRes.data.movieIds.filter(
          (id) => id !== firstId
        );
        await Promise.all([getFirstMovie(firstId), getOtherMovies(otherIds)]);
        setForEveryCount(forEveryCount + 1);
      }
    }
    setIsMoviesLoading(false);
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

  const moviesString = () => {
    if (byUserCount === 2) {
      return `Top 7 movies for you, ${nickname}`;
    } else if (byUserCount <= BY_USER_COUNT + 1) {
      return "How about this?";
    } else {
      return "Recently most people liked";
    }
  };

  const bestFitString = () => {
    if (byUserCount === 2) {
      return "best fit!";
    } else if (byUserCount <= BY_USER_COUNT + 1) {
      return "you might like...";
    } else {
      return "";
    }
  };

  return (
    <>
      {isLoading ? (
        <CenterLoading />
      ) : (
        <div className="main">
          <div className="main__title">
            <div>{moviesString()}</div>
          </div>
          <div className="main__best-recommend">
            <div className="main__best-recommend-image-wrapper">
              <div className="main__best-recommend-image">
                <img src={firstMovie.imageUrl} />
              </div>
              <div className="main__transparent-layer"></div>
            </div>
            <div className="main__best-recommend-text">
              <div className="main__emphasis">{bestFitString()}</div>
              <div className="main__description">
                {firstMovie.title.split(", The")[0]}
              </div>
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
