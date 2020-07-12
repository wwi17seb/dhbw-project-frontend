import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const DeleteEntityDialog = ({ deleteDialog, handleClose, labelSingular, onDelete, warningMessage }) => {
  return (
    <Dialog open={deleteDialog} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{`${labelSingular} löschen?`}</DialogTitle>
      <DialogContent>
        {warningMessage || 'Achtung! Beim Löschen können weitere, davon abhängende Daten gelöscht werden.'}
        <Form onSubmit={onDelete}>
          <DialogActions style={{ marginTop: '1rem' }}>
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
                  Löschen
                </Button>
              </Col>
            </Form.Group>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEntityDialog;
