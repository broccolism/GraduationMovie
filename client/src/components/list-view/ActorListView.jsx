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
      paddingLeft: "16px",
      paddingRight: "16px",
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      height: 150,
    },
  })
);

function ActorListView(props) {
  const { actors } = props;
  const classes = useStyles();
  const [movieImageList, setMovieImageList] = useState([]);

  const poster =
    "https://www.goldenglobes.com/sites/default/files/articles/cover_images/2017-la_la_land.jpg?format=pjpg&auto=webp&optimize=high&width=850";

  return (
    <div className={classes.root}>
      <div className="list-view__horizontal">
        {actors.map((actor, index) => (
          <MovieItem
            url={actor.profileUrl}
            isInline={true}
            key={index}
            title={actor.name}
          />
        ))}
      </div>
    </div>
  );
}

export default ActorListView;
