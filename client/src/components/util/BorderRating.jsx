import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";

export const BorderRating = withStyles({
  iconFilled: {
    color: "#FFC95A",
  },
  iconEmpty: {
    stroke: "#FFC95A",
    strokeWidth: "1px",
  },
})(Rating);
