import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SubmitFeedback(props) {
    const [submit, setsubmit] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const [open1, setOpen1] = React.useState(true);
    const [output, setOutput] = React.useState(null);
    const [change, setChange] = React.useState(false);

    useEffect(() => {
        if (submit !== props.submit) {
            setChange(true)
            setOpen(true)
            setOpen1(true)
            setsubmit(props.submit)
        }
    }, [submit, setsubmit, props.submit]);

    const handleClose = (event, reason) => {

        setOpen(false);
    };
    const handleClose1 = (event, reason) => {
        setOpen1(false);
    };

    const snack = (submit) => {
        if (submit === 200 || submit === 201) {
            setOutput(
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {props.text}
                    </Alert>
                </Snackbar>)
        } else if (submit != null) {
            setOutput(
                <Snackbar open={open1} autoHideDuration={3000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="error">
                        {props.text}
                    </Alert>
                </Snackbar>
            )
        } else {
            setOutput(null)
        }
        setChange(false)
    }

    if (change === true) {
        snack(submit)
    }

    return (
        <React.Fragment>
            {output}
        </React.Fragment>
    )

}
