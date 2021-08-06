import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";

export const BorderRating = withStyles({
  iconFilled: {
    color: "#EAB462",
  },
  iconEmpty: {
    stroke: "#EAB462",
    strokeWidth: "1px",
  },
})(Rating);
