import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.app_bar}>
        <Toolbar className={styles.tool_bar}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WeekAssigner
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
