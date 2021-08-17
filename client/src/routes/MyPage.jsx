import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/App.scss";
import "../styles/MyPage.scss";
import styled from "styled-components";
import StyledEmptyDiv from "../components/util/StyledEmptyDiv";

import VerticalListView from "../components/list-view/VerticalListView";
import BottomMenu from "../components/util/BottomMenu";
import UserCookie from "../utils/cookie";
import CenterLoading from "../components/util/CenterLoading";
import Dialog from "@material-ui/core/Dialog";
import RatingModal from "../components/util/RatingModal";

function MyPage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    unratedMovies: [],
    ratedMovies: [],
  });
  const [unratedMovie, setUnratedMovie] = useState();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const user_id = UserCookie.getUserId();
        setUserId(user_id);
        const unratedMovies = await getUserInfo(user_id);
        await getUnratedMovieTitle(unratedMovies);
        console.log("userInfo", userInfo);

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
      return response.data.unratedMovies;
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  const getUnratedMovieTitle = async (unratedMovies) => {
    if (unratedMovies.length > 0) {
      try {
        const targetId = unratedMovies[0].movieId;
        const res = await axios.get(
          `http://${localhost}:5000/movie/poster?movieId=${targetId}`
        );
        setUnratedMovie(res.data);
      } catch (err) {
        console.error("@@@@@ get unrated movie title ERR", err);
      }
    }
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleRating = async (rate) => {
    const movieId = userInfo.unratedMovies[0].movieId;
    const userId = UserCookie.getUserId();
    const rating = rate;
    await axios.get(
      `http://${localhost}:5000/movie/rate?movieId=${movieId}&userId=${userId}&rating=${rating}`
    );
    handleCloseDialog();
    window.location.reload();
  };

  const ratedMoviePercent =
    (userInfo.ratedMovies.length /
      (userInfo.ratedMovies.length + userInfo.unratedMovies.length)) *
    100;
  const doneRating = ratedMoviePercent === 100;

  return (
    <>
      <div className="my-page">
        {isLoading ? (
          <CenterLoading />
        ) : (
          <>
            <RatingModal
              modalOpen={isOpenDialog}
              handleCloseModal={handleCloseDialog}
              onClickConfirm={async (rating) => await handleRating(rating)}
              movieTitle={unratedMovie?.title ?? ""}
            />
            <div className="my-page__user-info">
              <div className="my-page__profile">
                <div className="my-page__profile-image">
                  <img src="https://thumb.ac-illust.com/t/f6/f6e3fd6d7e60544500352e46ad300085_t.jpeg" />
                </div>
                <div className="my-page__profile-nickname">
                  {userInfo.nickname}
                </div>
              </div>
              <div className="my-page__movies-info">
                <div className="my-page__movie-info">
                  <div className="my-page__movie-info-title">watched</div>
                  <div className="my-page__movie-info-count">
                    {userInfo.ratedMovies.length +
                      userInfo.unratedMovies.length}
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

            <Column>
              <RatedRatio>{ratedMoviePercent}% rated</RatedRatio>
              <StyledEmptyDiv height="4px" />
              <BarWrapper>
                <HorizontalBar
                  width={ratedMoviePercent.toString()}
                  color="var(--main-purple)"
                />
                <HorizontalBar
                  width={(100 - ratedMoviePercent).toString()}
                  color="gray"
                />
              </BarWrapper>
              <StyledEmptyDiv height="12px" />
              {doneRating ? (
                <BarText>🎉All rated. Well done!</BarText>
              ) : (
                <BarText onClick={handleOpenDialog}>
                  How was '{unratedMovie.title.substring(0, 12) + "..."}'?
                  <BarButtonIcon className="fas fa-chevron-right" />
                </BarText>
              )}
              <StyledEmptyDiv height="12px" />
            </Column>

            <div className="my-page__watched-movie">
              <div className="my-page__watched-movie-header">
                <div className="my-page__watched-movie-title">
                  Movie watched
                </div>
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
          </>
        )}
      </div>
      <BottomMenu />
    </>
  );
}

export default MyPage;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  align-items: flex-end;
`;

const RatedRatio = styled.div`
  display: flex;
  font-size: 14px;
  color: white;
`;

const BarWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const HorizontalBar = styled.div`
  display: inline-flex;
  height: 6px;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  color: ${(props) => props.color};
`;

const BarText = styled.div`
  display: flex;
  font-size: 14px;
  color: white;
`;

const BarButtonIcon = styled.i`
  display: flex;
  padding-left: 6px;
  font-size: 18px;
  color: white;
  opacity: 0.87;
`;
