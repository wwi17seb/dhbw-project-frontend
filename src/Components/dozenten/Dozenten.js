import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Nav from '../nav/Nav';
import DozentenDetails from './dozentendetails/dozentendetails';
import LecturerList from './lecturerlist';

import './dozenten.css';

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
      <Nav></Nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* @erik, do you really check all the code? */}
        <Switch>
          <Route exact path='/dozenten' component={LecturerList} />
          <Route path='/dozenten/:id' component={DozentenDetails} />
        </Switch>
      </main>
    </div>
  );
}
