import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
            <Form.Group as={Row} controlId='OldPW'>
              <Col>
                <Form.Control
                  type='password'
                  placeholder='Altes Passwort eingeben'
                  onChange={({ target: { value } }) => setOldPassword(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='Passwort'>
              <Col>
                <Form.Control
                  type='password'
                  placeholder='Neues Passwort eingeben'
                  onChange={({ target: { value } }) => setNewPassword(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='Passwort2'>
              <Col>
                <Form.Control
                  type='password'
                  placeholder='Neues Passwort wiederholen'
                  onChange={({ target: { value } }) => setPasswordRepeat(value)}
                />
              </Col>
            </Form.Group>
            <DialogActions>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button variant='outlined' color='primary' type='reset' onClick={handleClose}>
                    Abbrechen
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button variant='outlined' color='primary' type='submit'>
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
