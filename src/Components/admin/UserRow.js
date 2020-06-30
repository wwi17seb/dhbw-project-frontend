import { Grid, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { ControlPoint, RotateLeft } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react';
import { APICall } from '../../helper/Api';
import SnackBar from '../Snackbar/Snackbar';
import ChangePasswordDialog from './ChangePasswordDialog';

const UserRow = ({ user: { directorOfStudies_id, username, is_admin, password_change_required }, reloadData }) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setIsOpen(true);
  };

  const promoteToAdmin = async (directorOfStudies_id, username) => {
    APICall('PUT', `upgradeToAdmin?directorOfStudiesId=${directorOfStudies_id}`).then((res) => {
      const { status, data } = res;
      if (data && status === 200) {
        showSnackbar(`${username} wurde erfolgreich zum Admin ernannt.`, 'success');
        reloadData();
      } else {
        showSnackbar('Es ist ein Fehler aufgetreten. Versuche es erneut.', 'error');
      }
    });
  };

  const showChangePassword = () => {
    setOpenDialog(true)
  }
  const closeDialog = () => {
    setOpenDialog(false);
  };


  useEffect(() => {
    return () => {};
  }, [setIsOpen]);

  return (
    <Fragment>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            {directorOfStudies_id}
          </Grid>
          <Grid item xs={4}>
            {username}
          </Grid>
          <Grid item xs={4}>
            {is_admin ? (
              'Administator'
            ) : (
              <Fragment>
                <span>Benutzer</span>
                <Tooltip title='Zum Administrator ernennen'>
                  <ControlPoint
                    style={{ cursor: 'pointer' }}
                    onClick={() => promoteToAdmin(directorOfStudies_id, username)}
                  />
                </Tooltip>
              </Fragment>
            )}
          </Grid>
          <Grid item xs={3}>
            {!password_change_required ? (
              <span style={{ color: 'green' }}>OK</span>
            ) : (
              <span style={{ color: 'red' }}>Wechsel erforderlich</span>
            )}
            <Tooltip title='Password zurücksetzen'>
              <RotateLeft style={{ cursor: 'pointer' }} onClick={() => showChangePassword(directorOfStudies_id, username)} />
            </Tooltip>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: 10 }} />
      </Grid>
      <SnackBar message={message} severity={severity} isOpen={isOpen} />
      <ChangePasswordDialog openDialog={openDialog} handleClose={closeDialog} showSnackbar={showSnackbar} />
    </Fragment>
  );
};

export default UserRow;
