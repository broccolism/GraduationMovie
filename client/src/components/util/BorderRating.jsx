import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";

export const BorderRating = withStyles({
  iconFilled: {
    color: "var(--yellow)",
  },
  iconEmpty: {
    stroke: "var(--yellow)",
    strokeWidth: "1px",
  },
})(Rating);
