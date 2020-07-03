import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ModulAddStepper from './ModulAddStepper'

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: '1rem'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
}));

function ModulAdd() {

    const classes = useStyles()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" size="medium" onClick={handleClickOpen} className={classes.button}>Modul hinzufügen</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <ModulAddStepper />
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button disabled>Modul hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default ModulAdd
