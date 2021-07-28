//Movie list - vertical scroll
import react, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import MovieItem from "./MovieItem";
import axios from "axios";

import "../../styles/ListView.scss"

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

function VerticalListView(props) {
    const { movieList } = props;
    const classes = useStyles();
    const [movieImageList, setMovieImageList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let urls = []
            for (const movieId of movieList) {
                const response = await axios.get(`http://localhost:5000/movie/poster?movieId=${movieId}`);
                urls.push(response.data.posterUrl);
            }
            setMovieImageList(urls)
        }
        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <div className="list-view__grid">
                {movieImageList.map((url, index) =>
                    <MovieItem url={url} key={index} />
                )}
            </div>
        </div>
    );
}

export default VerticalListView;
