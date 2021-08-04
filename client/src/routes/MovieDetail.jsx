// <Star/>
// <Description/>
// MovieListVertical을 재활용 할지?

import BottomMenu from "../components/util/BottomMenu";

import "../styles/MovieDetail.scss";

function MovieDetail() {
  const movieImageUrl =
    "https://www.nultylighting.co.uk/wp-content/uploads/2017/02/la-la-land-lighting-night-sky.jpg";
  const trailerUrl = "";
  const award = "";
  const movieTitle = "LaLaLand";
  const year = 2021;
  const genre = "Adventure";
  const userRating = 0;
  const summary = "From the moment they met it was murder!";
  const detailSummary =
    "A rich woman and a calculating insurance agent plot to kill her unsuspecting husband after he signs a double indemnity policy. Against a backdrop of distinctly Californian settings, the partners in crime plan the perfect murder to collect the insurance, which pays double if the death is accidental.";
  // detail summary, 감독, 배우, 각본 쓰는 사람는 없을수도 있는거 같은데, 없을 경우 무슨 값이 들어있는지 확인 필요
  // 배우는 빈 리스트가 올 수 있음
  const people = [];
  const peopleSummary = "";

  return (
    <>
      <div className="header-back"></div>
      <div className="movie-detail">
        {!!movieImageUrl && (
          <div className="movie-detail__movie-image">
            <img src={movieImageUrl} alt="movieImageUrl" />
          </div>
        )}
        <div className="movie-detail__main-information">
          {!!trailerUrl && <div className="movie-detail__trailer"></div>}
          {!!award && <div className="movie-detail__award"></div>}
          <div className="movie-detail__movie-title">{movieTitle}</div>
          <div className="movie-detail__genre">
            {year} ⋅ {genre}
          </div>
        </div>
        <div className="movie-detail__rating-information">
          <div>
            <div className="movie-detail__rated-by-person"></div>
            {!!!userRating && (
              <div className="movie-detail__rating-button"></div>
            )}
          </div>
          {!!userRating && <div className="movie-detail__rated-by-user"></div>}
        </div>
        <div className="movie-detail__content">
          {!!summary && <div className="movie-detail__title">{summary}</div>}
          <div>{detailSummary}</div>
        </div>
        <div className="movie-detail__content">
          {!!people.length && <div className="movie-detail__title">People</div>}
          {!!peopleSummary && <div>{peopleSummary}</div>}
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default MovieDetail;
