import { useState } from "react";
import BottomMenu from "../components/util/BottomMenu";
import HorizontalListView from "../components/list-view/HorizontalListView";
import "../styles/MovieDetail.scss";

import { BorderRating } from "../components/util/BorderRating";
import RatingModal from "../components/util/RatingModal";

function MovieDetail() {
  const movieImageUrl =
    "https://www.nultylighting.co.uk/wp-content/uploads/2017/02/la-la-land-lighting-night-sky.jpg";
  const trailerUrl = "asdf";
  const award = "ksjafl";
  const movieTitle = "LaLaLand";
  const year = 2021;
  const genre = "Adventure";
  const personRating = 3.7;
  const summary = "From the moment they met it was murder!";
  const detailSummary =
    "A rich woman and a calculating insurance agent plot to kill her unsuspecting husband after he signs a double indemnity policy. Against a backdrop of distinctly Californian settings, the partners in crime plan the perfect murder to collect the insurance, which pays double if the death is accidental.";
  // detail summary, 감독, 배우, 각본 쓰는 사람는 없을수도 있는거 같은데, 없을 경우 무슨 값이 들어있는지 확인 필요
  // 배우는 빈 리스트가 올 수 있음
  const peopleList = [1, 2];
  const peopleSummary =
    "Directed by Bertrand Tavernier, and written by David Rayfiel (screenplay), Bertrand Tavernier (screenplay), Colo Tavernier (French translation)";

  const [modalOpen, setModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

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
      <div className="header-back">
        <i class="fas fa-chevron-left"></i>
      </div>
      <div className="movie-detail">
        {!!movieImageUrl && (
          <div className="movie-detail__movie-image">
            <img src={movieImageUrl} alt="movieImageUrl" />
          </div>
        )}
        {!!trailerUrl && (
          <div className="movie-detail__trailer">
            <div>There's an official trailer for it!</div>
            <div className="movie-detail__trailer-button">
              <i class="fas fa-play"></i>Youtube
            </div>
          </div>
        )}

        <div className="movie-detail__main-information">
          {!!award && (
            <div className="movie-detail__award">
              <div className="movie-detail__award-icon">
                <i class="fas fa-trophy"></i>
              </div>
              {award}
            </div>
          )}
          <div className="movie-detail__movie-title">{movieTitle}</div>
          <div className="movie-detail__genre">
            {year} ⋅ {genre}
          </div>
        </div>
        <div className="movie-detail__rating-information">
          <div className="movie-detail__rating">
            <BorderRating name="personRating" value={personRating} readOnly />
            <div className="movie-detail__rated-value">{personRating}</div>
            <div className="movie-detail__rated-count">(1124 rated)</div>
            {!!!userRating && (
              <>
                <div
                  className="movie-detail__rating-button"
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
          {!!userRating && (
            <div className="movie-detail__rating">
              <BorderRating name="personRating" value={userRating} readOnly />
              <div className="movie-detail__rated-value">{userRating}</div>
              <div className="movie-detail__rated-count">(my rating)</div>
            </div>
          )}
        </div>
        <div className="movie-detail__content">
          {!!summary && <div className="movie-detail__title">{summary}</div>}
          <div>{detailSummary}</div>
        </div>
        <div className="movie-detail__content">
          {!!peopleList.length && (
            <div className="movie-detail__title">People</div>
          )}
          {!!peopleSummary && <div>{peopleSummary}</div>}
        </div>
        <HorizontalListView movieList={peopleList} />
      </div>
      <BottomMenu />
    </>
  );
}

export default MovieDetail;
