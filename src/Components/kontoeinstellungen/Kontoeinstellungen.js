import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Person, TransferWithinAStation, VpnKey } from '@material-ui/icons';
import React, { useState } from 'react';

import Nav from '../nav/Nav';
import SnackBar from '../Snackbar/Snackbar';
import KontoeinstellungenCard from './KontoeinstellungenCard';
import SettingsChangeEmail from './SettingsChangeEmail';
import SettingsChangePassword from './SettingsChangePassword';
import SettingsTransferOwnership from './SettingsTransferOwnership';

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
  Buttons: {
    marginTop: '2rem',
  },
  cardsGrid: {
    marginTop: '2rem',
  },
  card: {
    width: 345,
    height: 256,
    marginRight: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  media: {
    height: 140,
  },
  icon: {
    marginTop: '1rem',
    fontSize: 90,
  },
}));

const KontoeinstellungenTable = () => {
  const classes = useStyles();
  const [openPassword, setOpenPassword] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [openTransferOwnership, setOpenTransferOwnership] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleDialogPassword = () => {
    setOpenPassword(true);
  };

  const handleDialogMail = () => {
    setOpenMail(true);
  };

  const handleTransferData = () => {
    setOpenTransferOwnership(true);
  };

  const handleClose = () => {
    setOpenMail(false);
    setOpenPassword(false);
    setOpenTransferOwnership(false);
  };

  return (
    <div className={classes.root}>
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant='h5' noWrap>
          Allgemeine Kontoeinstellungen
        </Typography>

        <SettingsChangePassword
          openPassword={openPassword}
          classes={classes}
          handleClose={handleClose}
          showSnackbar={showSnackbar}
        />

        <SettingsChangeEmail
          openMail={openMail}
          classes={classes}
          handleClose={handleClose}
          showSnackbar={showSnackbar}
        />

        <SettingsTransferOwnership
          openTransferOwnership={openTransferOwnership}
          classes={classes}
          handleClose={handleClose}
          showSnackbar={showSnackbar}
        />

        <Grid container className={classes.cardsGrid} alignContent='center' alignItems='center'>
          <KontoeinstellungenCard
            icon={<Person className={classes.icon} />}
            cardBody={'E-Mail des Benutzerkontos ändern'}
            btnDescription={'E-Mail ändern'}
            func={handleDialogMail}
            classes={classes}
          />
          <KontoeinstellungenCard
            icon={<VpnKey className={classes.icon} />}
            cardBody={'Passwort des Benutzerkontos ändern'}
            btnDescription={'Passwort ändern'}
            func={handleDialogPassword}
            classes={classes}
          />
          <KontoeinstellungenCard
            icon={<TransferWithinAStation className={classes.icon} />}
            cardBody={
              'Dozenten, Kurse und Vorlesungen an einen anderen Studiengangsleiter übergeben'
            }
            btnDescription={'Transfer starten'}
            func={handleTransferData}
            classes={classes}
          />
        </Grid>
        <SnackBar isOpen={snackbarOpen} message={message} severity={severity} />
      </main>
    </div>
  );
};

export default KontoeinstellungenTable;
