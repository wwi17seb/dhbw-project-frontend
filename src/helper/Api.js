import axios from 'axios'

import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getTokenFromStorage } from './tokenHelper';


export const APICall = async (method, url, data) => { //not in use
    return axios.request({
        data, method, url: "https://localhost:50969/api/" + url,
        params: {
            token: getTokenFromStorage(),
        }
    })
        .then(res => { return res })
        .catch(err => { return err })
}

function ApiHandler(props) {
    //THIS COMPONENT TAKES PROPS:
    //          params                  object of parameters for api request (excluding token)
    //          url                     the url of the api service route
    //          handleAPIresponse       function of the parent component to receive the data

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
                if (typeof props.params !== "undefined") {
                    for (let [key, value] of Object.entries(props.params)) {
                        params[key] = value;
                    }
                }
                await axios.get(props.url, { params }).then((response) => {
                    props.handleAPIresponse(response);

                }).catch((err) => {
                    console.log(err)
                    console.log(err.response)

                    if (typeof err.response !== "undefined") {
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
                    } else {
                        setError(err)
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
                        {errorMsg} Please redirect to Login and enter your credentials, e.g. User: jreichwald Password: pw
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