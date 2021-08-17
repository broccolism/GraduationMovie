import { makeStyles, createStyles } from "@material-ui/core/styles";

import MovieItem from "./MovieItem";

import "../../styles/ListView.scss";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      height: 150,
    },
  })
);

function HorizontalListView(props) {
  const { movieList } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="list-view__horizontal">
        {movieList.map((movie, index) => {
          return (
            <MovieItem
              movieId={movie.id}
              url={movie.url}
              key={index}
              isInline={true}
              title={movie.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HorizontalListView;
