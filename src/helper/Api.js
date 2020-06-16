import axios from 'axios'

import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const APICall = async (method, url) => { //not in use
    return axios.request({
        method: method,
        url: url,
        params: {
            token: localStorage.getItem('ExoplanSessionToken')
        }
    })
        .then(res => { return res })
        .catch(err => { return err })
}

function ApiHandler(props) {
    const [open, setOpen] = useState(false);
    const [errorMsg, setError] = useState("");
    const [initial, setInitial] = useState(true);
    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
        history.push({
            pathname: "/",
            //state: { message: "Successfully logged out!" }
        })
    };
    useEffect(() => {
        if (initial) {
            const fetch = async () => {
                let params = {
                    token: localStorage.getItem('ExoplanSessionToken')
                }
                await axios.get(props.url, { params }).then((response) => {
                    console.log(response);

                }).catch((err) => {
                    console.log(err.response)
                    setError(err.response.status)

                    switch (err.response.status) {
                        case 400:
                            //specific error handling
                            break;
                        case 500:
                            //specific error handling
                            break;
                        default:
                            break;
                    }
                    setOpen(true);
                })
            }
            fetch();
            setInitial(false);
        }
    })

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"You are logged out"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorMsg} Please redirect to Login and enter your credentials.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ApiHandler