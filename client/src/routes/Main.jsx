import { useState, useEffect } from "react";
import axios from "axios";
import { localhost } from "../consts";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../styles/Main.scss";

import VerticalListView from "../components/list-view/VerticalListView";
import HorizontalListView from "../components/list-view/HorizontalListView";
import BottomMenu from "../components/util/BottomMenu";
import UserCookie from "../utils/cookie";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [bestRecommendID, setBestRecommendID] = useState();
  const [bestRecommendPoster, setBestRecommendPoster] = useState();
  const [userId, setUserId] = useState();
  const [nickname, setNickname] = useState("");
  const [similarUserNickname, setSimilarUserNickname] = useState("");
  const [similarUserLikedMovieIds, setSimilarUserLikedMovieIds] = useState([]);
  const [similarUserMovieList, setSimilarUserMovieList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://${localhost}:5000/movie/top-n/user?userId=4&topN=7`
        );
        const firstId = response.data.movieIds[0];
        setBestRecommendID(firstId);
        const poster = await axios.get(
          `http://${localhost}:5000/movie/image?movieId=1`
        );
        console.log(poster.data);
        setBestRecommendPoster(poster.data);
        setMovieList(response.data.movieIds);
        console.log(response.data.movieIds);
        setIsLoading(false);
      } catch (err) {
        console.log("@@@@@@ fetch data ERR", err);
        setIsLoading(false);
      }

      const user_id = UserCookie.getUserId();
      setUserId(user_id);
      await getUserNickname(user_id);
      await getSimilarUser(user_id);
    }
    fetchData();
  }, []);

  async function getUserNickname(user_id) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/user/info?userId=${user_id}`
      );
      setNickname(response.data.nickname);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }
  async function getSimilarUser(user_id) {
    try {
      const response = await axios.get(
        `http://${localhost}:5000/user/similar/id=${user_id}`
      );
      setSimilarUserNickname(response.data.nickname);
      setSimilarUserLikedMovieIds(response.data.likedMovieIds);
      console.log("hi", response.data);
      await getPosterAndIdList(response.data.likedMovieIds);
    } catch (err) {
      console.log("@@@@@@ fetch data ERR", err);
    }
  }

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

  return isLoading ? (
    <CenterWrapper>
      <CircularProgress color="primary" />
    </CenterWrapper>
  ) : (
    <>
      <div className="main">
        <div className="main__title">
          <div>Top 6 movies for you, {nickname}</div>
        </div>
        <div className="main__best-recommend">
          <div className="main__best-recommend-image-wrapper">
            <div className="main__best-recommend-image">
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
            <div>익명의 {similarUserNickname}</div>
          </div>
        </div>

        <div className="main__title">
          <div>{similarUserNickname} recently liked</div>
        </div>
        <div className="main__user-similar-recommend">
          <HorizontalListView movieList={movieList} />
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

const CenterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Main;
