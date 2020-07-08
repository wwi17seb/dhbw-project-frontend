import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import SubmitFeedback from '../kurse/addkurs/submitfeedback'
import { APICall } from '../../helper/Api';

const useStyles = makeStyles(theme => ({
    textfield: {
        marginBottom: 10,
    },
    formControl: {
        minWidth: 120,
        width: 250
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    }
}));



export default function EditLecturer(props) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const classes = useStyles();
    const [salutation, setSalutation] = React.useState(props.data["salutation"]);
    const [extern, setExtern] = React.useState(props.data["is_extern"]);
    const [titel, setTitel] = React.useState(props.data["academic_title"]);
    const [vorname, setVorname] = React.useState(props.data["firstname"]);
    const [nachname, setNachname] = React.useState(props.data["lastname"]);
    const [email, setEmail] = React.useState(props.data["email"]);
    const [emailErr, setEmailErr] = React.useState(false);
    const [telnr, setTelnr] = React.useState(props.data["phonenumber"]);
    const [telnrErr, setTelnrErr] = React.useState(false);
    const [mainFocus, setMainFocus] = React.useState(null);
    const [mainFocuses, setMainFocuses] = React.useState(null);
    const [mainFocusList, setMainFocusList] = React.useState(null);
    const [submit, setSubmit] = React.useState(true);
    const [open, setOpen] = React.useState(props.open);
    const [open2, setOpen2] = React.useState(false);
    const [submitState, setSubmitState] = React.useState(null);
    const [submitText, setSubmitText] = React.useState(null);
    const [manipulation, setManipulation] = React.useState(props.data["allow_manipulation"]);

    const getCurrentMainFocuses = () => {
        var arr = []
        for (var i = 0; i < props.data["MainFocuses"].length; i++) {
            arr.push(props.data["MainFocuses"][i]["name"])
        }
        setMainFocus(arr)
    }

    if (mainFocus === null) {
        getCurrentMainFocuses()
    }

    const handleCloseMenu = () => {
        setOpen(false);
    };
    const handleCloseConfirm = () => {
        setOpen2(false);
    };

    useEffect(() => {
        if (props.open != open && props.open != false) {
            setOpen(props.open)
        }
    }, [props.open])

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePhoneNumber(number) {
        const isValidPhoneNumber = /^(((((((00|\+)49[ \-/]?)|0)[1-9][0-9]{1,4})[ \-/]?)|((((00|\+)49\()|\(0)[1-9][0-9]{1,4}\)[ \-/]?))[0-9]{1,7}([ \-/]?[0-9]{1,5})?)$/;
        return isValidPhoneNumber.test(number);
    }

    useEffect(() => {
        if (salutation != "" && vorname != "" && nachname != "" && email != "" && validateEmail(email)) {
            setSubmit(false)
        }
    })

    const handleSubmit = () => {
        var selectedIds = []
        for (var i = 0; i < mainFocuses.length; i++) {
            for (var j = 0; j < mainFocus.length; j++) {
                if (mainFocuses[i]["name"] === mainFocus[j]) {
                    selectedIds.push(mainFocuses[i]["mainFocus_id"])
                }
            }

        }
        var data = {
            "firstname": vorname,
            "lastname": nachname,
            "academic_title": titel,
            "email": email,
            "salutation": salutation,
            "phonenumber": telnr,
            "experience": "",
            "mainFocus_ids": selectedIds,
            "comment": props.data["comment"],
            "is_extern": extern,
            "allow_manipulation": true
        }
        const url = "lecturers?lecturerId=" + props.data["lecturer_id"]
        APICall('PUT', url, data).then(res => {
            setSubmitState(res.status)
            setSubmitText(res.statusText)
            setTimeout(() => { setSubmitState(null) }, 2000)
            setOpen2(false);
            setOpen(false);
            props.reloadLecturers()
        }
        ).catch(err => {
            setSubmitState(err.response.status)
            setSubmitText(err.response.statusText)
            setTimeout(() => { setSubmitState(null) }, 3000)
            setOpen2(false);
            setOpen(false);
        }
        )
    };

    const handleConfirm = (event) => {
        setOpen2(true);
    }

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
    const handleManipulation = (event) => {
        setManipulation(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
        if (validateEmail(event.target.value)) {
            setEmailErr(false)
        } else {
            setEmailErr(true)
        }

    };
    const handleTelnr = (event) => {
        setTelnr(event.target.value);
        if (validatePhoneNumber(event.target.value)) {
            setTelnrErr(false)
        } else {
            setTelnrErr(true)
        }
    };
    const handleMainFocus = (event) => {
        setMainFocus(event.target.value);
    };

    const getMainFocuses = () => {
        const url = "mainFocuses"

        APICall('GET', url).then(res => {
            var data = res.data.payload;
            var output = []

            for (var i = 0; i < data["MainFocuses"].length; i++) {
                output.push(
                    <MenuItem key={data["MainFocuses"][i]["mainFocus_id"]} value={data["MainFocuses"][i]["name"]}>
                        {data["MainFocuses"][i]["name"]}
                    </MenuItem>
                )
            }
            setMainFocuses(data["MainFocuses"])
            setMainFocusList(output)
        })
    }
    if (mainFocusList === null) {
        getMainFocuses()
    }


    return (
        <React.Fragment>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Dozenten bearbeiten:"}</DialogTitle>
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
                                        <MenuItem value={"Andere"}>Andere</MenuItem>
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
                                <TextField className={classes.textfield} error={emailErr} value={email} onChange={handleEmail} required label="E-Mail" ></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.textfield} error={telnrErr} value={telnr} onChange={handleTelnr} label="Telefonnummer"></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl style={{ width: 250 }} className={classes.formControl}>
                                    <InputLabel id="select-mainfocus-label">Schwerpunkte</InputLabel>
                                    <Select
                                        labelId="select-mainfocus-label"
                                        id="select-mainfocus"
                                        value={mainFocus}
                                        multiple
                                        onChange={handleMainFocus}
                                        label="MainFocus"
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip style={{ margin: 2 }} key={value} label={value} />
                                            ))}
                                        </div>}
                                        MenuProps={MenuProps}
                                    >
                                        {mainFocusList}
                                    </Select>
                                </FormControl>
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

                            <Grid item xs={6}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel id="allow-manupulation-label">Bearbeitung für andere erlauben?</InputLabel>
                                    <Select
                                        labelId="allow-manupulation-label"
                                        id="allow-manupulation"
                                        value={manipulation}
                                        onChange={handleManipulation}
                                        label="manipulation"
                                    >
                                        <MenuItem value={true}>Ja</MenuItem>
                                        <MenuItem value={false}>Nein</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMenu} color="primary" >
                        Abbrechen
                </Button>
                    <Button disabled={submit} onClick={handleConfirm} color="primary" >
                        Änderungen bestätigen
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Sind sie sich sicher?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirm} color="primary" >
                        Abbrechen
                </Button>
                    <Button disabled={submit} onClick={handleSubmit} color="primary" >
                        ja
                </Button>
                </DialogActions>
            </Dialog>
            <SubmitFeedback submit={submitState} text={submitText}></SubmitFeedback>
        </React.Fragment>




    );
}
