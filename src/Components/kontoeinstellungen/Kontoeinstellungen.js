import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, { useState } from 'react';
import Nav from '../nav/Nav';
import KontoeinstellungenCard from './KontoeinstellungenCard';
import SettingsChangeEmail from './SettingsChangeEmail';
import SettingsChangePassword from './SettingsChangePassword';
import SnackBar from '../Snackbar/Snackbar';

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
    height: 230,
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
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = (message, severity) => {
    console.log({ message });
    console.log({ severity });
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

  const handleClose = () => {
    setOpenMail(false);
    setOpenPassword(false);
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

        <Grid container className={classes.cardsGrid} alignContent='center' alignItems='center'>
          <KontoeinstellungenCard
            icon={<PersonIcon className={classes.icon} />}
            cardBody={'Ändern Sie hier die E-Mail Ihres Benutzerkontos'}
            btnDescription={'E-Mail ändern'}
            func={handleDialogMail}
            classes={classes}
          />
          <KontoeinstellungenCard
            icon={<VpnKeyIcon className={classes.icon} />}
            cardBody={'Ändern Sie hier Ihr Passwort'}
            btnDescription={'Passwort ändern'}
            func={handleDialogPassword}
            classes={classes}
          />
        </Grid>
        <SnackBar isOpen={snackbarOpen} message={message} severity={severity} />
      </main>
    </div>
  );
};

export default KontoeinstellungenTable;
