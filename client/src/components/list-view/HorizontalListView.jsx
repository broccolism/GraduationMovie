//Movie list - vertical scroll
import react, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import MovieItem from "./MovieItem";
import axios from "axios";

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
  const [movieImageList, setMovieImageList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let urls = [];
      for (const movieId of movieList) {
        const response = await axios.get(
          `http://localhost:5000/movie/poster?movieId=${movieId}`
        );
        urls.push(response.data.posterUrl);
      }
      setMovieImageList(urls);
    }
    fetchData();
  }, []);

  const poster =
    "https://www.goldenglobes.com/sites/default/files/articles/cover_images/2017-la_la_land.jpg?format=pjpg&auto=webp&optimize=high&width=850";

  return (
    <div className={classes.root}>
      <div className="list-view__horizontal">
        {/* {movieImageList.map((url, index) => (
          <MovieItem url={url} key={index} />
        ))} */}
        <MovieItem url={poster} isInline={true} isRating={false} />
        <MovieItem url={poster} isInline={true} isRating={false} />
        <MovieItem url={poster} isInline={true} isRating={false} />
        <MovieItem url={poster} isInline={true} isRating={false} />
        <MovieItem url={poster} isInline={true} isRating={false} />
        <MovieItem url={poster} isInline={true} isRating={false} />
        <MovieItem url={poster} isInline={true} isRating={false} />
      </div>
    </div>
  );
}

export default HorizontalListView;
