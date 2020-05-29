import axios from 'axios';
import React, { forwardRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as testdata from "./dozententestdata.json"

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
  const [lecturers,setLecturers] = React.useState(null)
  const [output,setOutput] = React.useState([])

  const loadData = ()=>{
    axios.get(`api/lecturers`).then(res => {
      setLecturers(res.data);
    })
  }

  useEffect(()=>{
    createLecturerRow()
  },[lecturers])

  const createLecturerRow = ()=>{
    
    if(lecturers!==null){
      var temp=[]
      for(var i=0; i<lecturers["default"]["payload"]["lecturers"].length;i++){
        var title= lecturers["default"]["payload"]["lecturers"][i]["academic_title"]
        var name = lecturers["default"]["payload"]["lecturers"][i]["firstname"]+ " " + lecturers["default"]["payload"]["lecturers"][i]["lastname"]
        var mainFocus=lecturers["default"]["payload"]["lecturers"][i]["main_focus"]
        var email=lecturers["default"]["payload"]["lecturers"][i]["email"]
        temp.push(
          <Grid item xs={12}>
            <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography variant="h6">{title+" " +name}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h6">{mainFocus}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h6">{email}</Typography>
            </Grid>
          </Grid>
          <Divider></Divider>
          </Grid>        
        )
      }
      setOutput(temp)
    }
    
    console.log(temp)
    
  }
  
  if(lecturers === null){
    //loadData()
    setLecturers(testdata)
  }
    
  console.log(lecturers)

  return (
        <Grid container spacing={2}>
        <Paper className={classes.paper}>
        <Grid item xs={12} style={{marginBottom:10}}>
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
        
        </Grid>
    );
  }

