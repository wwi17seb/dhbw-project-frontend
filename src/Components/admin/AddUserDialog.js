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

const AddUserDialog = ({ openAddUserDialog, handleClose, showSnackbar, reloadData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addUser = (e) => {
    e.preventDefault();

    const userToCreate = {
      username,
      password,
    };

    APICall('POST', 'createUser', userToCreate).then((res) => {
      res.status === 201 && res.data
        ? showSnackbar('Der Nutzer wurdeerfolgreich zangelegt', SEVERITY.SUCCESS)
        : showSnackbar('Es ist ein Fehler aufgetreten.', SEVERITY.WARNING);
      handleClose();
      reloadData();
    });
  };

  return (
    <Dialog open={openAddUserDialog} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Neuer Studiengangsleiter anlegen</DialogTitle>
      <DialogContent>
        <Form onSubmit={addUser}>
          <Form.Group as={Row} controlId='Nutzer'>
            <Col>
              <Form.Control
                type='name'
                placeholder='E-Mail eingeben'
                onChange={({ target: { value } }) => setUsername(value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='Passwort'>
            <Col>
              <Form.Control
                type='password'
                placeholder='Passwort eingeben'
                onChange={({ target: { value } }) => setPassword(value)}
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
                  Erstellen
                </Button>
              </Col>
            </Form.Group>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
