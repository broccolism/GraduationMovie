import { useState, useEffect } from "react";
import axios from "axios";

import "../styles/Main.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import HorizontalListView from "../components/list-view/HorizontalListView";
import BottomMenu from "../components/util/BottomMenu";

function Main() {
  const [movieList, setMovieList] = useState([]);
  const [bestRecommendID, setBestRecommendID] = useState();
  const [bestRecommendPoster, setBestRecommendPoster] = useState();

  const nickname = "닉네임";
  const otherNickname = "고라니";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/movie/top-n/user?userId=4&topN=7"
      );
      const firstId = response.data.movieIds[0];
      setBestRecommendID(firstId);
      const poster = await axios.get(
        "http://localhost:5000/movie/image?movieId=1"
      );
      console.log(poster.data);
      setBestRecommendPoster(poster.data);
      setMovieList(response.data.movieIds);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="main">
        <div className="main__title">
          <div>Top 6 movies for you, {nickname}</div>
        </div>
        {/* 추천 영화 가로 이미지 (그라데이션) */}
        <div className="main__best-recommend">
          <div className="main__best-recommend-image-wrapper">
            <div className="main__best-recommend-image">
              {/* <img src="https://www.nultylighting.co.uk/wp-content/uploads/2017/02/la-la-land-lighting-night-sky.jpg" /> */}
              <img src={bestRecommendPoster.imageUrl} />
            </div>
            <div className="main__transparent-layer"></div>
          </div>
          <div className="main__best-recommend-text">
            <div className="main__emphasis">best fit!</div>
            <div className="main__description">{bestRecommendPoster.title}</div>
          </div>
        </div>

        <div className="main__item-similar-recommend">
          <VerticalListView movieList={movieList} />
        </div>
        <div className="main__reload-button">
          <button className="border-white-button">
            <i className="fas fa-redo"></i> &nbsp;&nbsp; I want more
          </button>
        </div>

        <div className="main__title">
          <div>We found someone like you!</div>
        </div>

        <div className="main__profile">
          <div class="main__profile-image">
            <img src="https://thumb.ac-illust.com/t/f6/f6e3fd6d7e60544500352e46ad300085_t.jpeg" />
          </div>
          <div className="main__title">
            <div>익명의 {otherNickname}</div>
          </div>
        </div>

        <div className="main__title">
          <div>{otherNickname} recently liked</div>
        </div>
        <div className="main__user-similar-recommend">
          <HorizontalListView movieList={movieList} />
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default Main;
