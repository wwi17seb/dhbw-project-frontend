import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StudiengangAuswahl from './studiengangauswahl'
import StudienrichtungAuswahl from './studienrichtungauswahl'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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



export default function CenteredGrid() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);


    //Event für submit button. gibt aktuell die Werte der Eingabefelder aus, wenn diese nicht leer sind
    //TODO: eingabeüberprüfung erweitern -> evtl leere Inputs markieren
    const ClickSubmit = () => {
        var kursname = document.getElementById("kursname-input").value
        var jahrgang = document.getElementById("jahrgang-input").value
        var studiengang = document.getElementById("studiengang-select").innerHTML
        var studienrichtung = document.getElementById("studienrichtung-select").innerHTML
        if (kursname === "" || studiengang === "<span>​</span>" || studienrichtung === "<span>​</span>" || jahrgang === "") {
            console.log("Nicht alles ausgefüllt")
        } else {
            console.log("Neuer Kurs angelegt mit Werten:")
            console.log("Kursname: " + kursname)
            console.log("Studiengang: " + studiengang)
            console.log("Studienrichtung: " + studienrichtung)
            console.log("Jahrgang: " + jahrgang)
            setOpen(true);
        }
    }

    const NeuerKurs = () => {
        var kursname = document.getElementById("kursname-input").value
        var jahrgang = document.getElementById("jahrgang-input").value
        var studiengang = document.getElementById("studiengang-select").innerHTML
        var studienrichtung = document.getElementById("studienrichtung-select").innerHTML

        return (
            <div>
                Kursname: {kursname}<br />
                Jahrgang: {jahrgang}<br />
                Studiengang: {studiengang}<br />
                Studienrichtung: {studienrichtung}
            </div>
        )
    }

    const handleClose = () => {
        setOpen(false);
    };

    const [yeartext, setYearText] = React.useState("")
    const [yearerror, setYearError] = React.useState(false)
    const YearOnChange = event => {
        var value = event.target.value
        var reg = new RegExp('^\\d{4}$');
        var res = value.match(reg)
        if (res === null) {
            setYearError(true)
            setYearText("Wert muss vierstellige Zahl sein")
        } else {
            setYearError(false)
            setYearText("")
        }
    }

    const [nametext, setNameText] = React.useState("")
    const [nameerror, setNameError] = React.useState(false)
    const NameOnChange = event => {
        var value = event.target.value
        var reg = new RegExp('^[a-zA-Z0-9]+$');
        var res = value.match(reg)
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

    //Gibt alle Eingabefelder für das hinzufügen eines Kurses zurück.
    return (
        <div className={classes.root}>
            <h2>Neuen Kurs Hinzufügen</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.block}>
                            <h5>Bitte geben Sie den Namen des Kurses an:</h5>
                            <TextField required error={nameerror} onChange={NameOnChange} id="kursname-input" label="Kursname" defaultValue="Kursname" variant="outlined" helperText={nametext} />
                        </div>
                        <div className={classes.block}>
                            <h5>Bitte geben Sie den Jahrgang des Kurses an:</h5>
                            <TextField required error={yearerror} onChange={YearOnChange} id="jahrgang-input" label="Jahrgang" defaultValue="2020" variant="outlined" helperText={yeartext} />
                        </div>
                        <div className={classes.block}>
                            <h5>Bitte geben Sie den Studiengang und Studienrichtung an:</h5>
                            <StudiengangAuswahl></StudiengangAuswahl>
                            <StudienrichtungAuswahl></StudienrichtungAuswahl>
                        </div>

                        <div className={classes.block}>
                            <Button onClick={ClickSubmit.bind(this)} id="submit-kurs" variant="contained" color="primary">
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
                        <DialogTitle id="alert-dialog-title">{"Neuer Kurs hinzugefügt:"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <NeuerKurs></NeuerKurs>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </div>
    );
}
