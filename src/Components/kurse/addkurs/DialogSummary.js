import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Kurszusammenfassung from './Kurszusammenfassung';

const DialogSummary = ({ open, handleClose, semesters, nameValue, handlePost }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>Kurs mit folgenden Daten hinzufügen?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Kurszusammenfassung semesters={semesters} nameValue={nameValue} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autoFocus>
          Nein
        </Button>
        <Button onClick={handlePost} color='primary' autoFocus>
          Ja
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSummary;
