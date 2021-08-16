import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import "../../styles/RatingModal.scss";

import { BorderRating } from "./BorderRating";

const useStyles = makeStyles((theme) => ({
  modal: {
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    borderRadius: "3px",
    width: 280,
    backgroundColor: "#292929",
    color: "white",
    boxShadow: "3px 3px 6px 0 rgba(178, 178, 178, 0.16)",
    padding: theme.spacing(3, 4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

function RatingModal(props) {
  const { modalOpen, handleCloseModal, onClickConfirm, movieTitle } = props;

  const classes = useStyles();
  const [rating, setRating] = useState(0);

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <div className="rating-modal__header">
          <div className="rating-modal__question">How was the movie?</div>
          <div className="rating-modal__movie-title">{movieTitle}</div>
        </div>
        <div className="rating-modal__rating">
          <BorderRating
            name="personRating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>
        <div className="rating-modal__buttons">
          <button
            className="rating-modal__cancle-button"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className={
              !!rating
                ? "rating-modal__submit-button"
                : "rating-modal__submit-button--disable"
            }
            onClick={() => onClickConfirm(rating)}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RatingModal;
