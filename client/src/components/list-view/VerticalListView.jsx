//Movie list - vertical scroll
import react from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import MovieItem from "./MovieItem";

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

function VerticalListView() {
  const classes = useStyles();

  function FormRow() {
    return (
      <react.Fragment>
        <Grid item xs={4}>
          <MovieItem />
        </Grid>
        <Grid item xs={4}>
          <MovieItem />
        </Grid>
        <Grid item xs={4}>
          <MovieItem />
        </Grid>
      </react.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default VerticalListView;
