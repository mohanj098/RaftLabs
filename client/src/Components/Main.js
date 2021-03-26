import {
  Button,
  CssBaseline,
  Fab,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f50b5",
    color: "white",
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    maxHeight: "80vh",
  },
}));

export default function Main() {
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [newdata, setnewdata] = useState([]);

  const getdata = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_backend_url,
    })
      .then((response) => {
        setdata(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [relation, setrelation] = useState(null);
  const [person1, setperson1] = useState(null);
  const [person2, setperson2] = useState(null);

  const onedit = ({ id, newrelation, newperson1, newperson2 }) => {
    setInEditMode({
      status: true,
      rowkey: id,
    });
    setrelation(newrelation);
    setperson1(newperson1);
    setperson2(newperson2);
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setrelation(null);
    setperson1(null);
    setperson2(null);
  };

  const onSave = ({ id, newrelation, newperson1, newperson2 }) => {
    if (newdata.length === 1) {
      axios({
        method: "post",
        url: process.env.REACT_APP_backend_url,
        headers: { 
          'Content-Type': 'application/json'
        },
        data: ({"key": id, "relation": newrelation, "person1": newperson1, "person2": newperson2}),
      })
        .then((response) => {
          getdata();
          onCancel();
          setnewdata([]);
        })
        .catch((e) => {
          alert("ALl fields are mandatory")
          console.log(e);
        });
    }
    else{
      axios({
        method: "patch",
        url: process.env.REACT_APP_backend_url,
        headers: { 
          'Content-Type': 'application/json'
        },
        data: ({"key": id, "relation": newrelation, "person1": newperson1, "person2": newperson2}),
      })
      .then((response) => {
        getdata();
        onCancel();
        setnewdata([]);
      })
      .catch((e) => {
        alert("ALl fields are mandatory")
        console.log(e);
      });

    }

    setInEditMode({
      status: false,
      rowKey: null,
    });
    setrelation(null);
    setperson1(null);
    setperson2(null);
  };

  const addrow = () => {
    const length = data.length + newdata.length + 1;
    if (newdata.length >= 1) {
      alert("first completely fill others and save");
    } else {
      setnewdata([
        ...newdata,
        { key: length, person1: "", person2: "", relation: "" },
      ]);
      setdata([
        ...data,
        { key: length, person1: "", person2: "", relation: "" },
      ]);
    }
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.container}>
        <CssBaseline />
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Person 1</StyledTableCell>
              <StyledTableCell />
              <StyledTableCell align="center">Relation</StyledTableCell>
              <StyledTableCell />
              <StyledTableCell align="center">Person2</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={data.key}>
                <TableCell align="center">
                  {inEditMode.status && inEditMode.rowkey === item.key ? (
                    <TextField
                      required
                      value={person1}
                      onChange={(e) => setperson1(e.target.value)}
                      inputProps={{ style: { textAlign: "center" } }}
                    />
                  ) : (
                    item.person1
                  )}
                </TableCell>
                <TableCell align="center">
                  <Typography style={{ fontWeight: "bold" }}>is</Typography>
                </TableCell>
                <TableCell align="center">
                  {inEditMode.status && inEditMode.rowkey === item.key ? (
                    <TextField
                      required
                      value={relation}
                      onChange={(e) => setrelation(e.target.value)}
                      inputProps={{ style: { textAlign: "center" } }}
                    />
                  ) : (
                    item.relation
                  )}
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold" }}>of</Typography>
                </TableCell>
                <TableCell align="center">
                  {inEditMode.status && inEditMode.rowkey === item.key ? (
                    <TextField
                      required
                      value={person2}
                      onChange={(e) => setperson2(e.target.value)}
                      inputProps={{ style: { textAlign: "center" } }}
                    />
                  ) : (
                    item.person2
                  )}
                </TableCell>
                <TableCell align="center">
                  {inEditMode.status && inEditMode.rowkey === item.key ? (
                    <>
                      <Fab
                        size="small"
                        style={{ backgroundColor: "white", boxShadow: "none" }}
                      >
                        <CancelIcon onClick={() => onCancel()} />
                      </Fab>
                      <Fab
                        size="small"
                        style={{ backgroundColor: "white", boxShadow: "none" }}
                      >
                        <CheckIcon
                          onClick={() =>
                            onSave({
                              id: item.key,
                              newrelation: relation,
                              newperson1: person1,
                              newperson2: person2,
                            })
                          }
                        />
                      </Fab>
                    </>
                  ) : (
                    <Fab
                      size="small"
                      style={{ backgroundColor: "white", boxShadow: "none" }}
                    >
                      <EditIcon
                        onClick={() =>
                          onedit({
                            id: item.key,
                            newrelation: item.relation,
                            newperson1: item.person1,
                            newperson2: item.person2,
                          })
                        }
                      />
                    </Fab>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => addrow()}
      >
        Add a row
      </Button>
    </div>
  );
}
