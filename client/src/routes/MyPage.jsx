import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/App.scss";
import "../styles/MyPage.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import BottomMenu from "../components/util/BottomMenu";
import UserCookie from "../utils/cookie";
import CenterLoading from "../components/util/CenterLoading";

function MyPage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    unratedMovies: [],
    ratedMovies: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const user_id = UserCookie.getUserId();
        setUserId(user_id);
        await getUserInfo(user_id);

        const watchedMovieIds = userInfo.unratedMovies.map(
          (movie) => movie.movieId
        );
        watchedMovieIds.push.apply(
          watchedMovieIds,
          userInfo.ratedMovies.map((movie) => movie.movieId)
        );

        await getPosterAndIdList(watchedMovieIds);

        setIsLoading(false);
      } catch (err) {
        console.log("@@@@@@ fetch data ERR", err);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

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
    setMovieList(idAndPosters);
  };

  async function getUserInfo(user_id) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/user/info?userId=${user_id}`
      );
      setUserInfo({
        nickname: response.data.nickname,
        unratedMovies: response.data.unratedMovies,
        ratedMovies: response.data.ratedMovies,
      });
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  return (
    <>
      <div className="my-page">
        <div className="my-page__user-info">
          <div className="my-page__profile">
            <div className="my-page__profile-image">
              <img src="https://thumb.ac-illust.com/t/f6/f6e3fd6d7e60544500352e46ad300085_t.jpeg" />
            </div>
            <div className="my-page__profile-nickname">{userInfo.nickname}</div>
          </div>
          <div className="my-page__movies-info">
            <div className="my-page__movie-info">
              <div className="my-page__movie-info-title">watched</div>
              <div className="my-page__movie-info-count">
                {userInfo.ratedMovies.length + userInfo.unratedMovies.length}
              </div>
            </div>
            <div className="my-page__movie-info">
              <div className="my-page__movie-info-title">rated</div>
              <div className="my-page__movie-info-count">
                {userInfo.ratedMovies.length}
              </div>
            </div>
          </div>
        </div>
        <div className="my-page__watched-movie">
          <div className="my-page__watched-movie-header">
            <div className="my-page__watched-movie-title">Movie watched</div>
            <div className="my-page__search-icon">
              <Link to="/mypage/search">
                <i className="fas fa-search"></i>
              </Link>
            </div>
          </div>
          <div className="my-page__movie-list">
            <VerticalListView movieList={movieList} isRating={false} />
          </div>
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default MyPage;
