import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { APICall } from '../../helper/Api';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';

const SettingsChangePassword = ({ openPassword, classes, handleClose, showSnackbar }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== passwordRepeat) {
      showSnackbar('Fehler beim Ändern des Passworts.', SEVERITY.WARNING);
    } else {
      const passwordToSet = {
        oldPassword,
        newPassword,
      };

      try {
        var backend_login_response = JSON.parse(localStorage.getItem('backend-login-response'));
      } catch (e) {
        showSnackbar('Fehler beim Ändern des Passworts.', SEVERITY.WARNING);
        return;
      }
      APICall(
        'PUT',
        `changePassword?directorOfStudiesId=${backend_login_response.directorOfStudies_id}`,
        passwordToSet
      ).then((res) => {
        res.status === 200 && res.data
          ? showSnackbar('Passwort erfolgreich geändert!', SEVERITY.SUCCESS)
          : showSnackbar('Fehler beim Ändern des Passworts.', SEVERITY.ERROR);
        handleClose();
      });
    }
  };

  return (
    <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
      <Dialog open={openPassword} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Passwort ändern</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleChangePassword}>
            <TextField
              type='password'
              label='Altes Passwort'
              margin='dense'
              variant='outlined'
              fullWidth
              onChange={({ target: { value } }) => setOldPassword(value)}
            />

            <TextField
              type='password'
              label='Neues Passwort'
              margin='dense'
              variant='outlined'
              fullWidth
              onChange={({ target: { value } }) => setNewPassword(value)}
            />

            <TextField
              type='password'
              label='Neues Passwort (Wiederholung)'
              margin='dense'
              variant='outlined'
              fullWidth
              onChange={({ target: { value } }) => setPasswordRepeat(value)}
            />

            <DialogActions>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button color='primary' type='reset' onClick={handleClose}>
                    Abbrechen
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button color='primary' type='submit'>
                    Bestätigen
                  </Button>
                </Col>
              </Form.Group>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default SettingsChangePassword;
