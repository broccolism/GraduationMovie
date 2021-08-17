import { useState, useRef } from "react";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";

import "../../styles/MovieItem.scss";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const StyledRating = withStyles({
  iconFilled: {
    color: "white",
  },
  iconEmpty: {
    color: "white",
  },
})(Rating);

function MovieItem(props) {
  const { movieId, url, isInline, isRating, addNewRating, title } = props;
  const [star, setStar] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const starRef = useRef(null);
  const history = useHistory();

  function onClickPoster() {
    if (isRating) setIsSelected((prev) => !prev);
    else history.push(`/movie-detail/${movieId}`);
  }

  return (
    <div
      className={(isInline ? "movie-inline-item" : "") + " movie-item"}
      style={!!title ? { height: "170px" } : {}}
    >
      <div className="movie-item__item">
        <img
          style={{ width: "100px" }}
          src={url}
          alt="movie"
          onClick={onClickPoster}
        ></img>
        {!!title && (
          <div className="movie-item__title">
            {title.length < 13 ? title : title.slice(0, 11) + "..."}
          </div>
        )}
      </div>
      {isRating ? (
        isSelected ? (
          <div className="movie-item__selected">
            <CenterWrapper>
              <StyledRating
                icon={<StarIcon style={{ fontSize: "22px" }} />}
                emptyIcon={<StarBorderIcon style={{ fontSize: "22px" }} />}
                ref={starRef}
                name={movieId.toString()}
                value={star}
                onChange={(_, newValue) => {
                  setStar(newValue);
                  addNewRating({ id: movieId, rating: newValue });
                }}
              />
            </CenterWrapper>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
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

export default MovieItem;
