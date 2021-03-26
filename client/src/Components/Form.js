import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form() {
  const [person1, setperson1] = useState("");
  const [person2, setperson2] = useState("");
  const [showstring, setshowstring] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    
    axios({
      method: "post",
      url: process.env.REACT_APP_backend_url + "/check",
      headers: {
        "Content-Type": "application/json",
      },
      data: { person1: person1, person2: person2 },
    })
      .then((res) => {
        setshowstring("");
        // setperson1("");
        // setperson2("");
        const data=res.data;
        setshowstring(data);
        }
        
      )
      .catch((error) => {
        setperson1("");
        setperson2("");
        alert("something went wrong try later");
        console.log(error);
      });
  };

  const classes = useStyles();
  return (
    <Box justifyContent="center">
      <Typography style={{ textAlign: "center" }}>
        CHECK DEGREES OF SEPARATION
      </Typography>
      <form onSubmit={onsubmit} className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={person1}
          onChange={(e) => setperson1(e.target.value)}
          id="person1"
          label="person1"
          name="person1"
          autoComplete="off"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={person2}
          onChange={(e) => setperson2(e.target.value)}
          id="person2"
          label="person2"
          name="person2"
          autoComplete="off"
          autoFocus
        />
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          submit
        </Button>
      </form>
      <Typography>{showstring}</Typography>
    </Box>
  );
}
