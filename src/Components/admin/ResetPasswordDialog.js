import { TextField } from '@material-ui/core';
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

const ResetPasswordDialog = ({ openDialog, handleClose, showSnackbar, directorOfStudies_id, reloadData }) => {
  const [password, setPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    APICall('PUT', `resetPassword?directorOfStudiesId=${directorOfStudies_id}`, { newPassword: password }).then(
      (res) => {
        const { status, data } = res;
        if (status === 200 && data) {
          showSnackbar('Passwort erfolgreich zurückgesetzt.', 'success');
          reloadData();
        } else {
          showSnackbar('Es ist ein Fehler aufgetreten. Versuche es erneut.', 'error');
        }
        handleClose();
      }
    );
  };

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Passwort ändern</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleChangePassword}>
          <Form.Group as={Row} controlId='newPassword'>
            <Col>
              <TextField
                type='password'
                label='Passwort'
                value={password}
                placeholder='Neues Passwort eingeben'
                onChange={({ target: { value } }) => setPassword(value)}
                variant='outlined'
                required
                minLength='1'
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
  );
};

export default ResetPasswordDialog;
