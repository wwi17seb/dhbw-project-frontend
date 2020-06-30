import React, { useState, useEffect } from 'react';
import { APICall } from '../../helper/Api';
import UserRow from './UserRow';
import { Grid, Paper, Typography, Divider, makeStyles } from '@material-ui/core';

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

  const classes = useStyles();

  const header = () => (
    <Grid item xs={12} style={{ marginBottom: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Typography variant='h5'>ID</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5'>Benutzername</Typography>
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
    <Grid container spacing={2}>
      <Paper className={classes.paper}>
        {header()}
        {users.map((user) => (
          <UserRow user={user} reloadData={getUsers}/>
        ))}
      </Paper>
    </Grid>
  );
};

export default UserContent;
