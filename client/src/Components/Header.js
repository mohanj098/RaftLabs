import {
  AppBar,
  Button,
  CssBaseline,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: "auto",
  },
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  appbar:{
    height: theme.spacing(8),
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appbar}>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Button className={classes.button} color="inherit">hOME</Button>
      </Toolbar>
    </AppBar>
  );
}
