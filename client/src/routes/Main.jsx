import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/Main.scss";
import styled, { isStyledComponent } from "styled-components";

import VerticalListView from "../components/list-view/VerticalListView";
import HorizontalListView from "../components/list-view/HorizontalListView";
import UserCookie from "../utils/cookie";
import CenterLoading from "../components/util/CenterLoading";
import { useHistory } from "react-router-dom";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [firstMovie, setFirstMovie] = useState();
  const [nickname, setNickname] = useState("");
  const [similarUser, setSimilarUser] = useState();
  const [similarUserMovieList, setSimilarUserMovieList] = useState([]);

  const [byUserCount, setByUserCount] = useState(1);
  const [forEveryCount, setForEveryCount] = useState(1);
  const BY_USER_ERROR = "by user error";
  const PAGE_SIZE = 7;
  const BY_USER_COUNT = 3;

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const getTopNMoviesRes = await getTopNMoviesById();

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

        setByUserCount(byUserCount + 1);
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

  const getSimilarUser = async () => {
    try {
      const userId = UserCookie.getUserId();
      const response = await axios.get(
        `http://${localhost}:5000/user/similar?id=${userId}`
      );

      setSimilarUser({
        userId: response.data.userId,
        nickname: response.data.nickname,
        likedMovieIds: response.data.likedMovieIds,
      });
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
    return await axios.get(
      `http://${localhost}:5000/movie/top-n/every?size=${PAGE_SIZE}&page=${forEveryCount}`
    );
  };

  const getFirstMovie = async (movieId) => {
    const getImageAndIdRes = await axios.get(
      `http://${localhost}:5000/movie/image?movieId=${movieId}`
    );

    setFirstMovie({ ...getImageAndIdRes.data, movieId });
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
        .get(`http://${localhost}:5000/movie/poster?movieId=${movieId}`)
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
    if (forEveryCount > 1) {
      return "Recently most people liked";
    }
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

  const moveToFirstMovieDetail = () => {
    history.push(`/movie-detail/${firstMovie.movieId}`);
  };

  return (
    <>
      {isLoading ? (
        <CenterLoading />
      ) : (
        <div className="main">
          <LogoWrapper>
            {/* <i class="fas fa-star" style={{ fontSize: "30px" }} /> */}
            movie
            <br />
            .com
          </LogoWrapper>

          <div className="main__title">
            <div>{moviesString()}</div>
          </div>
          <div
            className="main__best-recommend"
            onClick={moveToFirstMovieDetail}
          >
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

          {!!similarUser && (
            <div>
              <div className="main__title">
                <div>We found someone like you!</div>
              </div>

              <div className="main__profile">
                <div className="main__profile-image">
                  <img
                    src={`https://gravatar.com/avatar/${similarUser.userId}?s=200&r=pg&d=identicon&f=y`}
                  />
                </div>
                <div className="main__title">
                  <div>{similarUser.nickname}</div>
                </div>
              </div>

              <div className="main__title">
                <div>{similarUser.nickname} recently liked</div>
              </div>
              <div className="main__user-similar-recommend">
                <HorizontalListView movieList={similarUserMovieList} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Main;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 20px;
  padding-bottom: 40px;
  opacity: 1;
  font-weight: 700;
  font-family: "Rock Salt", cursive;
`;
