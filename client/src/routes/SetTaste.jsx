import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { localhost } from "../consts";
import UserCookie from "../utils/cookie";

import "../styles/App.scss";
import "../styles/SetTaste.scss";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import VerticalListView from "../components/list-view/VerticalListView";

function SetTaste() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [idAndPosterList, setIdAndPosterList] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const movieIds = await getIdList();
        await getPosterAndIdList(movieIds);
        setIsLoading(false);
      } catch (err) {
        console.log("@@@@@ fetch all ERR:", err);
        setIsLoading(false);
        setIsError(true);
        setErrorText(err.toString());
      }
    };

    fetchAll();
  }, []);

  const getIdList = async () => {
    const response = await axios.get(
      `http://${localhost}:5000/movie/dissimilar?topN=21`
    );
    return response.data.movieIds;
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
    setIdAndPosterList(idAndPosters);
  };

  const addNewRating = (newRating) => {
    const isAlreadyRated =
      selectedRatings.find((rating) => rating.id === newRating.id) !==
      undefined;

    if (isAlreadyRated) {
      const newSelectedRatings = selectedRatings
        .filter((rating) => rating.id !== newRating.id)
        .concat(newRating);
      setSelectedRatings(newSelectedRatings);
    } else {
      const newSelectedRatings = selectedRatings.concat(newRating);
      setSelectedRatings(newSelectedRatings);
    }
  };

  const handleDoneButton = async () => {
    try {
      setIsLoading(true);
      const userId = UserCookie.getUserId();
      const promises = selectedRatings.map(async ({ id, rating }) => {
        if (rating !== null) {
          return await axios.get(
            `http://${localhost}:5000/movie/rate?movieId=${id}&userId=${userId}&rating=${rating}`
          );
        }
      });

      await Promise.all(promises);
      setIsLoading(false);
      window.location.assign("/main");
    } catch (err) {
      console.log("@@@@ handle done button ERR", err);
      setIsLoading(false);
      setIsError(true);
      setErrorText(err.toString());
    }
  };

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
          <VerticalListView
            movieList={idAndPosterList}
            isRating={true}
            addNewRating={addNewRating}
          />
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
        <button className="border-button" onClick={handleDoneButton}>
          DONE
        </button>
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
