import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useHistory } from "react-router-dom";

import "../../styles/BottomMenu.scss";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    backgroundColor: "black",
    position: "fixed",
    bottom: "0px",
    zIndex: "99",
  },
});

export default function BottomMenu() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState("main");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${newValue}`);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        value="main"
        icon={
          <span
            className={value === "main" ? "menu-icon--active" : "menu-icon"}
          >
            <i className="fas fa-home" />
          </span>
        }
      />
      <BottomNavigationAction
        value="search"
        icon={
          <span
            className={value === "search" ? "menu-icon--active" : "menu-icon"}
          >
            <i className="fas fa-search" />
          </span>
        }
      />
      <BottomNavigationAction
        value="mypage"
        icon={
          <span
            className={value === "mypage" ? "menu-icon--active" : "menu-icon"}
          >
            <i className="fas fa-user-alt" />{" "}
          </span>
        }
      />
    </BottomNavigation>
  );
}
