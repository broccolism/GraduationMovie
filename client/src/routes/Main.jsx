import { useState } from "react";

import "../styles/Main.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import HorizontalListView from "../components/list-view/HorizontalListView";
import BottomMenu from "../components/util/BottomMenu";

function Main() {
  const [movieList, setMovieList] = useState([]);
  const nickname = "닉네임";
  const otherNickname = "고라니";
  return <div> main </div>;
  /*
  return (
    <>
      <div className="main">
        <div className="main__title">
          <div>Top 6 movies for you, {nickname}</div>
        </div>
        <div className="main__best-recommend">
          <div className="main__best-recommend-image-wrapper">
            <div className="main__best-recommend-image">
              <img src="https://www.nultylighting.co.uk/wp-content/uploads/2017/02/la-la-land-lighting-night-sky.jpg" />
            </div>
            <div className="main__transparent-layer"></div>
          </div>
          <div className="main__best-recommend-text">
            <div className="main__emphasis">best fit!</div>
            <div className="main__description">etryfuimk;wetryhfjgs</div>
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
  */
}

export default Main;
