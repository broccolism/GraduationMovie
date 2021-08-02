import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

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
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        value="home"
        icon={
          <span
            className={value === "home" ? "menu-icon--active" : "menu-icon"}
          >
            <i class="fas fa-home" />
          </span>
        }
      />
      <BottomNavigationAction
        value="search"
        icon={
          <span
            className={value === "search" ? "menu-icon--active" : "menu-icon"}
          >
            <i class="fas fa-search" />
          </span>
        }
      />
      <BottomNavigationAction
        value="mypage"
        icon={
          <span
            className={value === "mypage" ? "menu-icon--active" : "menu-icon"}
          >
            <i class="fas fa-user-alt" />{" "}
          </span>
        }
      />
    </BottomNavigation>
  );
}
