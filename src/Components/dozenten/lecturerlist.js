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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMenu = () => {
    setOpen(false);
  };
  const ClickSubmit = () => {
    setOpen(true);
  }

  const loadData = () => {
    axios.get(`api/lecturers`).then(res => {
      setLecturers(res.data);
    })
  }

  useEffect(() => {
    createLecturerRow()
  }, [lecturers])

  const createLecturerRow = () => {

    if (lecturers !== null) {
      var temp = []

      for (var i = 0; i < lecturers["default"]["payload"]["lecturers"].length; i++) {

        temp.push(
          <LecturerRow data={lecturers["default"]["payload"]["lecturers"][i]}></LecturerRow>
        )
      }
      setOutput(temp)
    }
  }

  if (lecturers === null) {
    //loadData()
    setLecturers(testdata)
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
              <Grid item xs={4}>
                <Typography variant="h5">Schwerpunkt</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5">Email</Typography>
              </Grid>
            </Grid>
            <Divider></Divider>
          </Grid>
          {output}
        </Paper>
        <Dialog
          open={open}
          onClose={handleCloseMenu}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Neuen Dozent hinzufügen:"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <AddLecturer></AddLecturer>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" >
              Submit
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>

  );
}
