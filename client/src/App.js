import { CssBaseline, Grid, makeStyles, Paper } from "@material-ui/core";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Form from "./Components/Form";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    height: "91vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    margin: theme.spacing(4, 4),
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <CssBaseline />
      <Grid container component="main" className={classes.root}>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.table}>
            <Main />
          </div>
        </Grid>
        <Grid
          item
          xs={false}
          sm={8}
          md={6}
          component={Paper}
          elevation={1}
          square
        >
          <div className={classes.paper}>
            <Form />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
