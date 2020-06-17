import axios from 'axios';
import React, { forwardRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as testdata from "./dozententestdata.json";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LecturerRow from "./lecturerrow"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddLecturer from "./addlecturer"

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

  const ClickSubmit = () => {
    setOpen(true);
    setInterval(function () { setOpen(false); }, 1000);
  }

  const loadData = () => {
    const url = "api/lecturers?token=" + localStorage.getItem("ExoplanSessionToken")
    axios.get(url).then(res => {
      console.log(res.data)
      setLecturers(res.data.payload);
    })
  }

  useEffect(() => {
    createLecturerRow()
  }, [lecturers])

  const createLecturerRow = () => {

    if (lecturers !== null) {
      var temp = []

      for (var i = 0; i < lecturers["lecturers"].length; i++) {

        temp.push(
          <LecturerRow data={lecturers["lecturers"][i]}></LecturerRow>
        )
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
      <div className="btn_align">
        <button className="btn btn_dhbw" onClick={ClickSubmit.bind(this)}>Dozenten hinzufügen</button>
      </div>
      <Grid container spacing={2}>
        <Paper className={classes.paper}>
          <Grid item xs={12} style={{ marginBottom: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h5">Name</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">Schwerpunkt</Typography>
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
