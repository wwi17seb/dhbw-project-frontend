import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" size="large" onClick={handleClickOpen}>Modulkatalog hinzufügen</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Neuen Modulkatalog hinzufügen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="jahr"
                        label="Jahr"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="studienrichtung"
                        label="Studienrichtung"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Spezifikation"
                        label="Spezifikation"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Abbrechen
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Hinzufügen
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}