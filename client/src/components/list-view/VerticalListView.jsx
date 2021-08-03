//Movie list - vertical scroll
import { makeStyles, createStyles } from "@material-ui/core/styles";
import "../../styles/ListView.scss";

import MovieItem from "./MovieItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

function VerticalListView(props) {
  const { posterList, isRating } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="list-view__grid">
        {posterList.map((url, _) => (
          <MovieItem url={url} key={url} isRating={isRating} />
        ))}
      </div>
    </div>
  );
}

export default VerticalListView;
