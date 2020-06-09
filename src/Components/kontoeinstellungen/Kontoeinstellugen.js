import React from 'react';
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    }, toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

export default function KontoeinstellungenTable() {
    const classes = useStyles();


    return (
      <div className={classes.root} >
        <Nav></Nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h5" noWrap>
            Allgemeine Kontoeinstellungen
          </Typography>

        </main>
      </div>
    )
  }