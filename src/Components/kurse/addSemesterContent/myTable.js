import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

import PresentationRow from './PresentationRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const header = () => (
  <Grid item xs={12} style={{ marginBottom: 10 }}>
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant='h5'>Vorlesung</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h5'>Dozent</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h5'>Präsenzzeit</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h5'>Prüfungsleistung</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h5'>Status</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant='h5'>Aktionen</Typography>
      </Grid>
    </Grid>
    <Divider style={{ marginBottom: 10 }} />
  </Grid>
);

// receives given data
const MyTable = ({ presentations, loadData, course_id, semester_id }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Paper className={classes.paper}>
          {header()}
          {presentations.map((presentation, index) => (
            <PresentationRow
              presentation={presentation}
              key={index}
              loadData={loadData}
              course_id={course_id}
              semester_id={semester_id}
            />
          ))}
        </Paper>
      </Grid>
      <div style={{ textAlign: 'right' }}>
        <button
          style={{ color: '#ffffff', backgroundColor: '#e30613', marginBottom: '1rem' }}
          className='btn'
          onClick={() => {
            alert('TBD'); // TODO: exchange with snackbar
          }}>
          Vorlesung planen
        </button>
      </div>
      {/* Snackbar?? */}
    </Fragment>
  );
};

export default MyTable;
