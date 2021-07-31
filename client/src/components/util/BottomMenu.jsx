import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

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
        label="Home"
        value="home"
        icon={<i class="fas fa-home" />}
      />
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<i class="fas fa-search" />}
      />
      <BottomNavigationAction
        label="Mypage"
        value="mypage"
        icon={<i class="fas fa-user-alt" />}
      />
    </BottomNavigation>
  );
}
