import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StudiengangAuswahl from './studiengangauswahl'
import StudienrichtungAuswahl from './studienrichtungauswahl'
import SemesterAuswahl from './semesterauswahl'
import SubmitFeedback from './submitfeedback'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import axios from 'axios';

//css klassen, welche hier genutzt werden
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
    block: {
        paddingTop: 20,
    },
}));



export default function AddKurs() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [button, setButton] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [nameValue, setNameValue] = React.useState("")
    const [nametext, setNameText] = React.useState("")
    const [nameerror, setNameError] = React.useState(false)
    const [state, setState] = React.useState({});
    const [status, setStatus] = React.useState(null);
    const [statusText, setStatusText] = React.useState(null);



    //Event für submit button. gibt aktuell die Werte der Eingabefelder aus, wenn diese nicht leer sind
    //TODO: eingabeüberprüfung erweitern -> evtl leere Inputs markieren
    const ClickSubmit = () => {
        var kursname = document.getElementById("kursname-input").value
        var studiengang = document.getElementById("studiengang-select").innerHTML
        var studienrichtung = document.getElementById("studienrichtung-select").innerHTML
        if (kursname === "" || studiengang === "<span>​</span>" || studienrichtung === "<span>​</span>") {
            setStatusText("Nicht alles ausgefüllt")
            setStatus("Halt: ")
            setTimeout(() => { setStatus(null) }, 2000)
        } else {
            setOpen(true);
        }
    }

    const NeuerKurs = () => {
        var kursname = nameValue
        var studiengang = document.getElementById("studiengang-select").innerHTML
        var studienrichtung = document.getElementById("studienrichtung-select").innerHTML
        var semesterAnzahl
        if (checked) {
            semesterAnzahl = 7
        } else {
            semesterAnzahl = 6
        }
        var semesterlist = []

        for (var i = 1; i <= semesterAnzahl; i++) {

            var text = "Semester " + i + ": Von " + state["B" + i].toLocaleDateString('de-DE') + " Bis " + state["E" + i].toLocaleDateString('de-DE')
            semesterlist.push(
                <Typography>
                    {text}
                </Typography>

            )
        }

        return (
            <div>
                Kursname: {kursname}<br />
                Studiengang: {studiengang}<br />
                Studienrichtung: {studienrichtung}<br />
                Semesteranzahl: {semesterAnzahl}<br />
                {semesterlist}
            </div>
        )
    }

    const handleClose = () => {
        setOpen(false);
    };

    //returns array with semester objects
    const getSemesterList = () => {
        var anz
        var output = []
        if (checked) {
            anz = 7
        } else {
            anz = 6
        }

        for (var i = 1; i <= anz; i++) {
            var semName = ""
            var dateBegin = state["B" + i].getFullYear() + "-" + (state["B" + i].getMonth() + 1) + "-" + state["B" + i].getDate()
            var dateEnd = state["E" + i].getFullYear() + "-" + (state["E" + i].getMonth() + 1) + "-" + state["E" + i].getDate()
            if (state["B" + i].getMonth() > 6) {
                semName = "WS" + state["B" + i].getFullYear().toString().substring(2) + "/" + (state["B" + i].getFullYear() + 1).toString().substring(2)
            } else {
                semName = "SS" + state["B" + i].getFullYear().toString().substring(2)
            }

            output.push({
                name: semName,
                number: i,
                start_date: dateBegin,
                end_date: dateEnd
            })
        }
        return output
    }

    const handlePost = (event) => {
        event.preventDefault();
        setButton(true)
        var semesterList = getSemesterList()

        let data = {
            name: nameValue,
            majorSubject: document.getElementById("studiengang-select").innerHTML,
            fieldOfStudy: document.getElementById("studienrichtung-select").innerHTML,
            semesters: semesterList
        };
        axios.post('/api/courses', data)
            .then(res => {
                setStatusText(res.statusText)
                setStatus(res.status)
                setTimeout(() => { setStatus(null) }, 2000)
            })
            .catch(err => {
                if (err.response) {
                    setStatusText(err.response.statusText)
                    setStatus(err.response.status)
                    setTimeout(() => { setStatus(null) }, 3000)
                }
            });
        setButton(false)
        setOpen(false);
    };

    const NameOnChange = event => {
        var value = event.target.value
        var reg = new RegExp('^[a-zA-Z0-9]+$');
        var res = value.match(reg)
        setNameValue(value)
        if (res === null && value != "") {
            setNameError(true)
            setNameText("Keine Sonderzeichen")
        } else if (value === "") {
            setNameError(true)
            setNameText("Feld darf nicht leer sein")
        }
        else {
            setNameError(false)
            setNameText("")
        }
    }

    const checkOnChange = event => {
        if (checked === true) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }

    const handleValues = (state) => {
        setState(state)
    }

    //Gibt alle Eingabefelder für das hinzufügen eines Kurses zurück.
    return (
        <div className={classes.root}>
            <h2>Neuen Kurs Hinzufügen</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.block}>
                            <h5>Bitte geben Sie den Namen des Kurses an:</h5>
                            <TextField required value={nameValue} error={nameerror} onChange={NameOnChange} id="kursname-input" label="Kursname" variant="outlined" helperText={nametext} />
                        </div>
                        <div className={classes.block}>
                            <h5>Bitte geben Sie den Studiengang und Studienrichtung an:</h5>
                            <StudiengangAuswahl></StudiengangAuswahl>
                            <StudienrichtungAuswahl></StudienrichtungAuswahl>
                        </div>
                        <div className={classes.block}>
                            <h5>Bitte wählen Sie die Anzahl der Semester aus und geben Sie für jedes Semester die Zeiträume an:</h5>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Grid item>
                                    6 Semester
                                </Grid>
                                <Grid item>
                                    <Switch checked={checked} onChange={checkOnChange} name="selectSemesterCount" />
                                </Grid>
                                <Grid item>
                                    7 Semester
                                </Grid>
                            </Grid>
                            <SemesterAuswahl handleValues={handleValues} anzahlSemester={checked}></SemesterAuswahl>
                        </div>

                        <div className={classes.block}>
                            <Button onClick={ClickSubmit.bind(this)} disabled={button} id="submit-kurs" variant="contained" color="primary">
                                Submit
                        </Button>
                        </div>
                    </Paper>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Kurs mit folgenden Daten hinzufügen?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <NeuerKurs></NeuerKurs>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                Nein
                            </Button>
                            <Button onClick={handlePost} color="primary" autoFocus>
                                Ja
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
            <SubmitFeedback submit={status} text={statusText}></SubmitFeedback>
        </div>
    );
}
