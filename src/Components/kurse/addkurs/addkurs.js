import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StudiengangAuswahl from './studiengangauswahl'
import { APICall } from '../../../helper/Api';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import * as testdata from "./fieldOfStudiesTestData.json"
import SnackBar from '../../Snackbar/Snackbar';
import { SEVERITY } from '../../Snackbar/SnackbarSeverity';

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
    const [nameValue, setNameValue] = React.useState("");
    const [gcId, setGCId] = React.useState("");
    const [nametext, setNameText] = React.useState("")
    const [nameerror, setNameError] = React.useState(false)
    const [state, setState] = React.useState({});
    const [status, setStatus] = React.useState(null);
    const [statusText, setStatusText] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [subjectData, setSubjectData] = React.useState(null);

    const loadSubjects = () => {
        APICall("GET", 'fieldsOfStudy?withMajorSubjects=true').then(res => {
            var data = res.data
            setSubjectData(data)
        })
    }

    if (subjectData === null) {
        loadSubjects()
        //setSubjectData(testdata)
    }
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
            if (state["B" + i].getFullYear() !== state["E" + i].getFullYear()) {
                semName = "WS" + state["B" + i].getFullYear().toString().substring(2) + "/" + (state["E" + i].getFullYear()).toString().substring(2)
            } else {
                semName = "SS" + state["B" + i].getFullYear().toString().substring(2)
            }

            output.push({
                name: semName,
                number: i - 1,
                start_date: dateBegin,
                end_date: dateEnd
            })
        }
        return output
    }

    const getMajorSubjectId = (name) => {
        if (subjectData !== null) {
            var id = null
            for (var i = 0; i < subjectData["payload"]["FieldsOfStudy"].length; i++) {
                var richtungen = subjectData["payload"]["FieldsOfStudy"][i]["MajorSubjects"]
                for (var j = 0; j < richtungen.length; j++) {
                    if (name == richtungen[j]["name"]) {
                        id = richtungen[j]["majorSubject_id"]
                        break;
                    }
                }
            }

            return (id)
        }
    }

    const handlePost = (event) => {
        event.preventDefault();
        if (loading === null) {
            setLoading(<LinearProgress />)
        }
        setButton(true)
        var semesterList = getSemesterList()

        let data = {
            name: nameValue,
            google_calendar_id: gcId,
            majorSubject_id: getMajorSubjectId(document.getElementById("studienrichtung-select").innerHTML),
            Semesters: semesterList
        };

        APICall("POST", 'courses', data).then((res) => {
            if (res.data && (res.status === 200 || res.status === 201)) {
                setStatusText(res.statusText)
                setStatus(res.status)
                setTimeout(() => { setStatus(null) }, 2000)
                setLoading(null)
                setButton(false)
                window.location.reload()
            } else {
                setStatusText("Kurs konnte nicht hinzugefügt werden")
                setStatus(400)
                setTimeout(() => { setStatus(null) }, 3000)
                setLoading(null)
                setButton(false)
            }
        });
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

    const GCIdOnChange = event => {
        var value = event.target.value;
        setGCId(value);
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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.block}>
                            <Typography variant='h6'>Bitte geben Sie den Namen des Kurses an:</Typography>
                            <TextField required value={nameValue} error={nameerror} onChange={NameOnChange} id="kursname-input" label="Kursname" variant="outlined" helperText={nametext} />
                        </div>
                        <div className={classes.block}>
                            <Typography variant='h6'>Bitte geben Sie den Studiengang und Studienrichtung an:</Typography>
                            <StudiengangAuswahl data={subjectData}></StudiengangAuswahl>
                        </div>
                        <div className={classes.block}>
                            <Typography variant='h6'>Bitte wählen Sie die Anzahl der Semester aus und geben Sie für jedes Semester die Zeiträume an:</Typography>
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
                            <Typography variant='h6'>Bitte geben Sie die Google Calendar ID an:</Typography>
                            <TextField required value={gcId} onChange={GCIdOnChange} id="gcId-input" label="Google Calendar ID" variant="outlined" />
                        </div>
                        <div className={classes.block}>
                            <Button onClick={ClickSubmit.bind(this)} disabled={button} id="submit-kurs" variant="contained" color="primary">
                                Kurs hinzufügen
                        </Button>
                            {loading}
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
