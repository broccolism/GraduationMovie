import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/App.scss";
import "../styles/SetTaste.scss";

import VerticalListView from "../components/list-view/VerticalListView";

function SetTaste() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/movie/dissimilar?topN=30"
      );
      setMovieList(response.data.movieIds);
    }
    fetchData();
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
        <VerticalListView movieList={movieList} isRating={true} />
      </div>
      <div className="set-taste__done">
        <Link to="/main">
          <button className="border-button">DONE</button>
        </Link>
      </div>
    </div>
  );
}

export default SetTaste;
