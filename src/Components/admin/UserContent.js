import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { APICall } from '../../helper/Api';
import SnackBar from '../Snackbar/Snackbar';
import AddUserDialog from './AddUserDialog';
import UserRow from './UserRow';

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

const UserContent = () => {
  const [users, setUsers] = useState([]);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getUsers = async () => {
    APICall('GET', 'users').then((res) => {
      if (res.data && res.status === 200) {
        const users = res.data.payload.Users;
        setUsers(users);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenDialog = () => {
    setOpenAddUserDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenAddUserDialog(false);
  };

  const classes = useStyles();

  const header = () => (
    <Grid item xs={12} style={{ marginBottom: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Typography variant='h5'>ID</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5'>Benutzername/E-Mail</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5'>Benutzerart</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5'>Passwortstatus</Typography>
        </Grid>
      </Grid>
      <Divider style={{ marginBottom: 10 }} />
    </Grid>
  );

  return (
    <Fragment>
      <Grid container justify='flex-end'>
        <Grid item>
            <Button variant="contained" color="primary" size="medium" style={{ marginBottom: '1.5rem' }} onClick={handleOpenDialog}>Studiengangsleiter hinzufügen</Button>
        </Grid>
      </Grid>
      
      <AddUserDialog
        openAddUserDialog={openAddUserDialog}
        handleClose={handleCloseDialog}
        showSnackbar={showSnackbar}
        reloadData={getUsers}
      />
      <Grid container spacing={2}>
        <Paper className={classes.paper}>
          {header()}
          {users.map((user) => (
            <UserRow key={user.directorOfStudies_id} user={user} showSnackbar={showSnackbar} reloadData={getUsers} />
          ))}
        </Paper>
      </Grid>
      <SnackBar isOpen={snackbarOpen} message={message} severity={severity} closeSnackbar={closeSnackbar} />
    </Fragment>
  );
};

export default UserContent;
