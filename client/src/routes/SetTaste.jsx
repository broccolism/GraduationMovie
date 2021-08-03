import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { localhost } from "../consts";

import "../styles/App.scss";
import "../styles/SetTaste.scss";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import VerticalListView from "../components/list-view/VerticalListView";

function SetTaste() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [posterList, setPosterList] = useState([]);

  const getMovieList = async () => {
    const response = await axios.get(
      `http://${localhost}:5000/movie/dissimilar?topN=21`
    );
    return response.data.movieIds;
  };

  const getPosterList = async (movieIds) => {
    const promises = movieIds.map((movieId) =>
      axios
        .get(`http://${localhost}:5000/movie/poster?movieId=${movieId}`)
        .then((res) => res.data.posterUrl)
    );
    const posters = await Promise.all(promises);
    setPosterList(posters);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const movieIds = await getMovieList();
        await getPosterList(movieIds);
        setIsLoading(false);
      } catch (err) {
        console.log("@@@@@ ERR:", err);
        setIsLoading(false);
        setIsError(true);
        setErrorText(err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="set-taste">
      <div className="set-taste__text">
        <span className="set-taste__title">Let me know your taste</span>
        <span className="set-taste__description">
          Just pick as many as you can!
        </span>
      </div>
      <div className="set-taste__movie-list">
        {isLoading ? (
          <CenterWrapper>
            <CircularProgress color="primary" />
          </CenterWrapper>
        ) : (
          <VerticalListView posterList={posterList} isRating={true} />
        )}
        {isError ? (
          <CenterWrapper>
            <div>{errorText}</div>
          </CenterWrapper>
        ) : (
          <></>
        )}
      </div>
      <div className="set-taste__done">
        <Link to="/">
          <button className="border-button">DONE</button>
        </Link>
      </div>
    </div>
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

export default SetTaste;
