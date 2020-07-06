import React, { forwardRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Nav from '../nav/Nav';
import LecturerList from './lecturerlist'
import { Route, Switch } from 'react-router-dom'
import DozentenDetails from './dozentendetails/dozentendetails'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function DozentenTable() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path='/dozenten' component={LecturerList} />
          <Route path='/dozenten/:id' component={DozentenDetails} />
        </Switch>
      </main>
    </div>
  );
}
