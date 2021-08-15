import { useState, useRef } from "react";
import Rating from "@material-ui/lab/Rating";

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
  const { movieId, url, isInline, isRating, addNewRating } = props;
  const [star, setStar] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const starRef = useRef(null);

  function onClickPoster() {
    setIsSelected((prev) => !prev);
  }

  return (
    <div class={(isInline ? "movie-inline-item" : "") + " movie-item"}>
      <img src={url} alt="movie" onClick={onClickPoster}></img>
      {isRating ? (
        isSelected ? (
          <div class="movie-item__selected">
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
