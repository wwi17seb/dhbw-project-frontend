import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';

import ModifyPresentation from './ModifyPresentation';
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
const MyTable = ({ presentations, loadData, course_id, semester, semester_id, showSnackbar, moduleCatalog }) => {
  const classes = useStyles();
  const [createPresentationDialog, setCreatePresentationDialog] = useState(false);
  const [editPresentation, setEditPresentation] = useState(false);

  const createNewPresentation = () => {
    setEditPresentation(false);
    setCreatePresentationDialog(true);
  };

  const handleClose = () => {
    setCreatePresentationDialog(false);
  };

  const modifyPresentation = (presentation, handleClose) => {
    return (
      <ModifyPresentation
        open={true}
        edit={editPresentation}
        handleClose={handleClose}
        course_id={course_id}
        semester={semester}
        semester_id={semester_id}
        loadData={loadData}
        showSnackbar={showSnackbar}
        moduleCatalog={moduleCatalog}
        presentation={presentation}
      />
    );
  };

  return (
    <Fragment>
      {createPresentationDialog ? modifyPresentation(null, handleClose) : null}
      <div style={{ textAlign: 'right' }}>
        <button
          style={{ color: '#ffffff', backgroundColor: '#e30613', marginBottom: '1rem' }}
          className='btn'
          onClick={() => {
            createNewPresentation();
          }}>
          Vorlesung planen
        </button>
      </div>
      <Grid container spacing={2}>
        <Paper className={classes.paper}>
          {header()}
          {(new Date()).getMonth() === 3 && (new Date()).getDate() === 1 ?
            <PresentationRow
              presentation={{
                presentation_id: 0,
                academicRecord_id: 0,
                course_id: course_id,
                lecture_id: 0,
                lecturer_id: 0,
                semester_id: semester_id,
                status: 'April, April',
                AcademicRecord: undefined,
                Lecture: {
                  name: 'Studiengangsleiter zum Narren halten',
                  workload_dhbw: 42,
                  Module: { AcademicRecords: [{ abbreviation: 'Namen tanzen', name: '' }, { abbreviation: 'Vorsingen', name: '' }] },
                },
                Lecturer: { firstname: 'Bold', lastname: 'Witz' },
              }}
              loadData={loadData}
              course_id={course_id}
              semester_id={semester_id}
              showSnackbar={showSnackbar}
              modifyPresentation={modifyPresentation}
            /> : null
          }
          {presentations.map((presentation, index) => (
            <PresentationRow
              presentation={presentation}
              key={index}
              loadData={loadData}
              course_id={course_id}
              semester_id={semester_id}
              showSnackbar={showSnackbar}
              modifyPresentation={modifyPresentation}
            />
          ))}
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default MyTable;