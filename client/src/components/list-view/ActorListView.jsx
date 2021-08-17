//Movie list - vertical scroll
import react, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import MovieItem from "./MovieItem";
import axios from "axios";

import "../../styles/ListView.scss";
import styled from "styled-components";

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
  return (
    <div className={classes.root}>
      <div className="list-view__horizontal">
        {actors.map((actor, index) =>
          actor.profileUrl !== "-" ? (
            <MovieItem
              url={actor.profileUrl}
              isInline={true}
              key={index}
              title={actor.name}
              showTitle={true}
            />
          ) : (
            <Column>
              <EmptyProfileImage>
                <i
                  class="fas fa-portrait"
                  style={{ opacity: "0.3", fontSize: "30px" }}
                ></i>
              </EmptyProfileImage>
              <EmptyProfileName>{actor.name}</EmptyProfileName>
            </Column>
          )
        )}
      </div>
    </div>
  );
}

export default ActorListView;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyProfileImage = styled.div`
  margin: 5px 6px 0px 6px;
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
`;

const EmptyProfileName = styled.div`
  padding-left: 10px;
  font-size: 16px;
  text-overflow: ellipsis;
`;
