import { useState, useEffect } from "react";
import axios from "axios";

import "../styles/MovieDetail.scss";

import BottomMenu from "../components/util/BottomMenu";
import HorizontalListView from "../components/list-view/HorizontalListView";
import RatingModal from "../components/util/RatingModal";
import { BorderRating } from "../components/util/BorderRating";
import UserCookie from "../utils/cookie";
import { localhost } from "../consts";

function MovieDetail() {
  const movieId = "425";
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [award, setAward] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [year, setYear] = useState();
  const [genre, setGenre] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [ratingPeopleCount, setRatingPeopleCount] = useState(0);
  const [summary, setSummary] = useState("");
  const [plot, setPlot] = useState("");
  const [director, setDirector] = useState("");
  const [writers, setWriters] = useState("");
  const [actors, setActors] = useState([]);
  const [movieImageUrl, setMovieImageUrl] = useState("");

  // const movieImageUrl =
  //   "https://www.nultylighting.co.uk/wp-content/uploads/2017/02/la-la-land-lighting-night-sky.jpg";
  // detail summary, 감독, 배우, 각본 쓰는 사람는 없을수도 있는거 같은데, 없을 경우 무슨 값이 들어있는지 확인 필요
  // 배우는 빈 리스트가 올 수 있음
  const peopleList = [1, 2];

  const [modalOpen, setModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const [userId, setUserId] = useState();

  useEffect(() => {
    const user_id = UserCookie.getUserId();
    setUserId(user_id);

    async function fetchData() {
      await getMovieDetail(movieId, user_id);
      await getMovieImage(movieId);
    }
    fetchData();
  }, []);

  async function getMovieDetail(movie_id, user_id) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/detail?movieId=${movieId}&userId=${user_id}`
      );
      console.log(response.data);
      setYoutubeUrl(response.data.youtubeUrl);
      setAward(response.data.award);
      setMovieTitle(response.data.title);
      setYear(response.data.year);
      setGenre(response.data.genre);
      setAvgRating(response.data.avgRating);
      setRatingPeopleCount(response.data.ratingPeopleCount);
      setUserRating(response.data.userRating);
      setSummary(response.data.summary);
      setPlot(response.data.plot);
      setDirector(response.data.director);
      setWriters(response.data.writers);
      setActors(response.data.actors);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  async function getMovieImage(movie_id) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/movie/image?movieId=${movieId}`
      );
      setMovieImageUrl(response.data.imageUrl);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function onClickConfirm(rating) {
    setUserRating(rating);
  }

  return (
    <>
      <div class="header-back">
        <i class="fas fa-chevron-left"></i>
      </div>
      <div class="movie-detail">
        {!!movieImageUrl && (
          <div class="movie-detail__movie-image">
            <img src={movieImageUrl} alt="movieImageUrl" />
          </div>
        )}
        {!!youtubeUrl && (
          <div class="movie-detail__trailer">
            <div>There's an official trailer for it!</div>
            <div class="movie-detail__trailer-button">
              <i class="fas fa-play"></i>Youtube
            </div>
          </div>
        )}

        <div class="movie-detail__main-information">
          {!!award && (
            <div class="movie-detail__award">
              <div class="movie-detail__award-icon">
                <i class="fas fa-trophy"></i>
              </div>
              {award}
            </div>
          )}
          <div class="movie-detail__movie-title">{movieTitle}</div>
          <div class="movie-detail__genre">
            {year} ⋅ {genre}
          </div>
        </div>
        <div class="movie-detail__rating-information">
          <div class="movie-detail__rating">
            <BorderRating name="avgRating" value={avgRating} readOnly />
            <div class="movie-detail__rated-value">{avgRating}</div>
            <div class="movie-detail__rated-count">
              ({ratingPeopleCount} rated)
            </div>
            {userRating <= 0 && (
              <>
                <div
                  class="movie-detail__rating-button"
                  onClick={handleOpenModal}
                >
                  Rating
                </div>
                <RatingModal
                  modalOpen={modalOpen}
                  movieTitle={movieTitle}
                  handleCloseModal={handleCloseModal}
                  onClickConfirm={onClickConfirm}
                />
              </>
            )}
          </div>
          {userRating > 0 && (
            <div class="movie-detail__rating">
              <BorderRating name="personRating" value={userRating} readOnly />
              <div class="movie-detail__rated-value">{userRating}</div>
              <div class="movie-detail__rated-count">(my rating)</div>
            </div>
          )}
        </div>
        <div class="movie-detail__content">
          {!!summary && <div class="movie-detail__title">{summary}</div>}
          <div>{plot}</div>
        </div>
        <div class="movie-detail__content">
          {!!peopleList.length && <div class="movie-detail__title">People</div>}
          <div>
            {director && "Directed by " + director}{" "}
            {writers && ", and written by " + writers}
          </div>
        </div>
        <HorizontalListView movieList={peopleList} />
      </div>
      <BottomMenu />
    </>
  );
}

export default MovieDetail;
