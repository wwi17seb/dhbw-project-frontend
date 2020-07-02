import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { APICall } from '../../helper/Api';
import SnackBar from '../Snackbar/Snackbar';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';
import AddEntityDialog from './AddEntityDialog';
import DeleteEntityDialog from './DeleteEntityDialog';
import GeneralEntry from './GeneralEntry';
import GeneralHeader from './GeneralHeader';

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

const GeneralTabTable = ({
  label,
  labelSingular,
  route,
  idQueryName,
  idDbName,
  payloadName,
  attributes,
  addDialog,
  setAddDialog,
}) => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [idToBeDeletedWhenConfirmedInDialog, setIdToBeDeletedWhenConfirmedInDialog] = useState(undefined);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [idToBeUpdated, setIdToBeUpdated] = useState(undefined);

  const showDeleteDialog = (entityId) => {
    setIdToBeDeletedWhenConfirmedInDialog(entityId);
    setDeleteDialog(true);
  };

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const getData = async () => {
    APICall('GET', route).then((res) => {
      if (res.data && res.status === 200) {
        const data = res.data.payload[payloadName];
        setData(data);
      }
    });
  };

  const updateData = async (entityId) => {
    setIdToBeUpdated(entityId);
    setAddDialog(true);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    APICall('DELETE', `${route}?${idQueryName}=${idToBeDeletedWhenConfirmedInDialog}`).then((res) => {
      if (res.status === 200) {
        showSnackbar(`${labelSingular} erfolgreich gelöscht.`, SEVERITY.SUCCESS);
        getData();
        setDeleteDialog(false);
      } else {
        showSnackbar('Es ist ein Fehler aufgetreten.', SEVERITY.ERROR);
      }
    });
  };

  const handleClose = () => {
    setAddDialog(false);
    setIdToBeUpdated(undefined);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Paper className={classes.paper}>
          <GeneralHeader attributes={attributes} />
          {data.map((entry, index) => (
            <GeneralEntry
              attributes={attributes}
              entry={entry}
              labelSingular={labelSingular}
              key={index}
              onDelete={() => showDeleteDialog(entry[idDbName])}
              onEdit={() => updateData(entry[idDbName])}
            />
          ))}
        </Paper>
      </Grid>
      <SnackBar isOpen={snackbarOpen} message={message} severity={severity} />
      <AddEntityDialog
        addDialog={addDialog}
        handleClose={handleClose}
        reloadData={getData}
        showSnackbar={showSnackbar}
        route={route}
        attributes={attributes}
        labelSingular={labelSingular}
        idToBeUpdated={idToBeUpdated}
        idQueryName={idQueryName}
      />
      <DeleteEntityDialog
        deleteDialog={deleteDialog}
        handleClose={() => setDeleteDialog(false)}
        labelSingular={labelSingular}
        onDelete={onDelete}
      />
    </Fragment>
  );
};

export default GeneralTabTable;
