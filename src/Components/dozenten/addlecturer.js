import axios from 'axios';
import React, { forwardRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as testdata from "./dozententestdata.json";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LecturerRow from "./lecturerrow"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
    textfield: {
        marginBottom: 10,
    },
    formControl: {
        minWidth: 120,
    },
}));

export default function AddLecturer(props) {
    const classes = useStyles();
    const [salutation, setSalutation] = React.useState('');
    const [extern, setExtern] = React.useState('');
    const [titel, setTitel] = React.useState('');
    const [vorname, setVorname] = React.useState('');
    const [nachname, setNachname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telnr, setTelnr] = React.useState('');
    const [mainFocus, setMainFocus] = React.useState('');
    const [cv, setCv] = React.useState(null);
    const [submit, setSubmit] = React.useState(true);
    const [open, setOpen] = React.useState(props.open);

    const handleCloseMenu = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (props.open != open && props.open != false) {
            setOpen(props.open)
        }
    }, [props.open])

    useEffect(() => {
        if (salutation != "" && extern != "" && vorname != "" && nachname != "" && email != "") {
            setSubmit(false)
        }
    })

    const handleSubmit = () => {
        var data = {
            "firstname": vorname,
            "lastname": nachname,
            "academic_title": titel,
            "email": email,
            "salutation": salutation,
            "phonenumber": telnr,
            "experience": "",
            "mainFocus_ids": [],
            "profile": "",
            "research": "",
            "cv": cv,
            "comment": "",
            "is_extern": extern
        }
        axios.post("api/lecturers", data)
    };
    const handleSalutation = (event) => {
        setSalutation(event.target.value);
    };
    const handleExtern = (event) => {
        setExtern(event.target.value);
    };
    const handleTitel = (event) => {
        setTitel(event.target.value);
    };
    const handleVorname = (event) => {
        setVorname(event.target.value);
    };
    const handleNachname = (event) => {
        setNachname(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleTelnr = (event) => {
        setTelnr(event.target.value);
    };
    const handleMainFocus = (event) => {
        setMainFocus(event.target.value);
    };
    const handleUpload = event => {
        setCv(event.target.files[0])
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Neuen Dozenten hinzufügen:"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="select-salutation-label">Anrede</InputLabel>
                                <Select
                                    labelId="select-salutation-label"
                                    id="select-salutation"
                                    value={salutation}
                                    onChange={handleSalutation}
                                    label="Salutation"
                                >
                                    <MenuItem value={"Herr"}>Herr</MenuItem>
                                    <MenuItem value={"Frau"}>Frau</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.textfield} value={titel} onChange={handleTitel} label="Akadem. Titel" ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.textfield} value={vorname} onChange={handleVorname} required label="Vorname" ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.textfield} value={nachname} onChange={handleNachname} required label="Nachname" ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.textfield} value={email} onChange={handleEmail} required label="E-Mail" ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.textfield} value={telnr} onChange={handleTelnr} label="Telefonnummer"></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.textfield} value={mainFocus} onChange={handleMainFocus} label="Schwerpunkte" ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="select-extern-label">Extern?</InputLabel>
                                <Select
                                    labelId="select-extern-label"
                                    id="select-extern"
                                    value={extern}
                                    onChange={handleExtern}
                                    label="extern"
                                >
                                    <MenuItem value={true}>Ja</MenuItem>
                                    <MenuItem value={false}>Nein</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required className={classes.formControl}>
                                <Input id="my-input" type="file" aria-describedby="my-helper-text" onChange={handleUpload} />
                                <FormHelperText id="my-helper-text">Upload Lebenslauf</FormHelperText>
                            </FormControl>

                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseMenu} color="primary" >
                    schließen
                </Button>
                <Button disabled={submit} onClick={handleSubmit} color="primary" >
                    hinzufügen
                </Button>
            </DialogActions>

        </Dialog>



    );
}
