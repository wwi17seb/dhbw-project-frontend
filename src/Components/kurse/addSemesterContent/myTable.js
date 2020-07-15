import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';

import ModifyPresentation from './ModifyPresentation';
import PresentationRow from './PresentationRow';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ColorInfoDialog from './ColorInfoDialog';

const COLOR_KEYWORDS = [
  // the order of these objects is important for mapping
  // -> if something matches with one of the first rows and one of the last rows it will have the color of the first match
  // e.g. "Anfrage ausstehend" will match with "ausstehend" and therefore be #FFA07A (orange) instead of #AFEEEE (blue)
  // therefore worse states have a higher importance than better ones with the following order
  { color: '#EF5350', keywords: ['Absage', 'abgesagt', 'abgebrochen'] },
  { color: '#FFA07A', keywords: ['offen', 'frei', 'ausstehend'] },
  { color: '#AFEEEE', keywords: ['angeschrieben', 'kontaktiert', 'Anfrage', 'angefragt'] },
  { color: '#FFEE58', keywords: ['in Planung', 'in Absprache', 'Termine finden', 'Zusage', 'zugesagt'] },
  { color: '#90EE90', keywords: ['abgeschlossen', 'beendet', 'vollendet', 'fertig', 'Termine festgelegt', 'Termine eingetragen'] },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: 20
  },
}));

// receives given data
const MyTable = ({ presentations, loadData, course_id, semester, semester_id, showSnackbar, moduleCatalog }) => {
  const classes = useStyles();
  const [createPresentationDialog, setCreatePresentationDialog] = useState(false);
  const [editPresentation, setEditPresentation] = useState(false);
  const [showColorInfoDialog, setShowColorInfoDialog] = useState(false);

  const openColorInfoDialog = () => {
    setShowColorInfoDialog(true);
  };

  const createNewPresentation = () => {
    setEditPresentation(false);
    setCreatePresentationDialog(true);
  };

  const handleClose = () => {
    setCreatePresentationDialog(false);
    setShowColorInfoDialog(false);
  };

  const getColorInfoDialog = (handleClose) => {
    return <ColorInfoDialog COLOR_KEYWORDS={COLOR_KEYWORDS} handleClose={handleClose} />;
  };

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
          <Typography variant='h5'>
            Status
            <HelpOutlineIcon
              onClick={() => {
                openColorInfoDialog(handleClose);
              }}
              style={{ cursor: 'pointer', fontSize: '0.8em', marginLeft: '5', marginBottom: '2', color: '#666' }}
            />
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant='h5'>Aktionen</Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: 10 }} />
    </Grid>
  );

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
      {showColorInfoDialog ? getColorInfoDialog(handleClose) : null}
      {createPresentationDialog ? modifyPresentation(null, handleClose) : null}
      <div style={{ textAlign: 'right', marginBottom: 20 }}>
        <Button variant="contained" color="primary" onClick={createNewPresentation}>
          Vorlesung planen
        </Button>
      </div>

      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          {header()}
          {presentations.map((presentation, index) => (
            <PresentationRow
              presentation={presentation}
              key={index}
              loadData={loadData}
              course_id={course_id}
              semester_id={semester_id}
              showSnackbar={showSnackbar}
              modifyPresentation={modifyPresentation}
              COLOR_KEYWORDS={COLOR_KEYWORDS}
            />
          ))}
        </Grid>
      </Paper>

    </Fragment>
  );
};

export default MyTable;
