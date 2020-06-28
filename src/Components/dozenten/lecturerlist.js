import axios from 'axios';
import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as testdata from "./dozententestdata.json";
import LecturerRow from "./lecturerrow"
import AddLecturer from "./addlecturer"
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }, toolbar: theme.mixins.toolbar,
  paper: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));
export default function LecturerList() {
  const classes = useStyles();
  const [lecturers, setLecturers] = React.useState(null)
  const [output, setOutput] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const ClickSubmit = () => {
    setOpen(true);
    setInterval(function () { setOpen(false); }, 1000);
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const loadData = () => {
    const url = "api/lecturers?token=" + localStorage.getItem("ExoplanSessionToken")
    axios.get(url).then(res => {
      setLecturers(res.data.payload);
    })
  }

  useEffect(() => {
    createLecturerRow()
  }, [lecturers, searchTerm])

  const checkName = (searchterm, name) => {
    if (name.toLowerCase().includes(searchterm.toLowerCase())) {
      return true
    } else {
      return false
    }
  }
  const checkFocus = (searchterm, focus) => {
    var out = false
    for (var i = 0; i < focus.length; i++) {
      if (focus[i]["name"].toLowerCase().includes(searchterm.toLowerCase())) {
        if (out === false) {
          out = true
        }
      }
    }
    return out
  }

  const createLecturerRow = () => {

    if (lecturers !== null) {
      var temp = []

      for (var i = 0; i < lecturers["Lecturers"].length; i++) {
        if (checkName(searchTerm, lecturers["Lecturers"][i]["lastname"]) || checkFocus(searchTerm, lecturers["Lecturers"][i]["MainFocuses"])) {
          temp.push(
            <LecturerRow data={lecturers["Lecturers"][i]}></LecturerRow>
          )
        }
      }
      setOutput(temp)
    }
  }

  if (lecturers === null) {
    loadData()
    //setLecturers(testdata)
  }

  return (
    <React.Fragment>
      <Typography variant="h5" noWrap>
        Dozenten
      </Typography>
      <div style={{ marginTop: 10 }}>
        <Typography variant='h6'>
          Grenzen Sie hier die Liste mit Kriterien ein: </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item sm={8}>
            <TextField fullWidth={true} label="Suchen Sie nach dem Nachnamen oder Schwerpunkt" value={searchTerm} onChange={handleSearch} id="searchLecturer" variant="filled" />
          </Grid>
          <Grid item sm={4}>
            <div className="btn_align">
              <button className="btn btn_dhbw" onClick={ClickSubmit.bind(this)}>Dozenten hinzufügen</button>
            </div>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2}>
        <Paper className={classes.paper}>
          <Grid item xs={12} style={{ marginBottom: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Name</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">Vorlesungen</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">Studiengangsleiter</Typography>
              </Grid>
            </Grid>
            <Divider style={{ marginBottom: 10 }}></Divider>
          </Grid>
          {output}
        </Paper>

        <AddLecturer open={open}></AddLecturer>
      </Grid>
    </React.Fragment>

  );
}
