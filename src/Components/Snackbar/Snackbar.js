import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackBar = ({ message, severity, isOpen }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);

    return () => {
      handleClose();
    };
  }, [message, severity, isOpen]);

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity='error'>This is an error message!</Alert> */}
      {/* <Alert severity='warning'>This is a warning message!</Alert> */}
      {/* <Alert severity='info'>This is an information message!</Alert> */}
      {/* <Alert severity='success'>This is a success message!</Alert> */}
    </div>
  );
};

export default SnackBar;
