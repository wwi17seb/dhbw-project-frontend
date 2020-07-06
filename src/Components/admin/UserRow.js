import { Grid, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { ControlPoint, RotateLeft } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';

import { APICall } from '../../helper/Api';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';
import ResetPasswordDialog from './ResetPasswordDialog';

const UserRow = ({
  user: { directorOfStudies_id, username, is_admin, password_change_required },
  reloadData,
  showSnackbar,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const promoteToAdmin = async (directorOfStudies_id, username) => {
    APICall('PUT', `upgradeToAdmin?directorOfStudiesId=${directorOfStudies_id}`).then((res) => {
      const { status, data } = res;
      if (data && status === 200) {
        showSnackbar(`${username} wurde erfolgreich zum Admin ernannt.`, SEVERITY.SUCCESS);
        reloadData();
      } else {
        showSnackbar('Es ist ein Fehler aufgetreten. Versuche es erneut.', SEVERITY.ERROR);
      }
    });
  };

  const showChangePassword = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  try {
    var backend_login_response = JSON.parse(localStorage.getItem('backend-login-response'));
  } catch (e) {
    backend_login_response = {};
  }

  const header = () => {
    return (
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
              'Administrator'
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
            {backend_login_response.directorOfStudies_id !== directorOfStudies_id ? (
              <Tooltip title='Password zurücksetzen'>
                <RotateLeft
                  style={{ cursor: 'pointer' }}
                  onClick={() => showChangePassword(directorOfStudies_id, username)}
                />
              </Tooltip>
            ) : null}
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: 10 }} />
      </Grid>
    );
  };

  return (
    <Fragment>
      {header()}
      <ResetPasswordDialog
        openDialog={openDialog}
        handleClose={closeDialog}
        showSnackbar={showSnackbar}
        directorOfStudies_id={directorOfStudies_id}
        reloadData={reloadData}
      />
    </Fragment>
  );
};

export default UserRow;
