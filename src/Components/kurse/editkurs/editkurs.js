import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StudiengangAuswahl from '../addkurs/studiengangauswahl'
import { APICall } from '../../../helper/Api';
import SubmitFeedback from '../addkurs/submitfeedback'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Grid } from '@material-ui/core';

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
    },
    dialogActions: {
        paddingRight: "16px",
        paddingBottom: "10px"
    }
}));



export default function EditKurs(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const [open2, setOpen2] = React.useState(false);
    const [nameValue, setNameValue] = React.useState(props.selectedCourse.name);
    const [gcId, setGCId] = React.useState(props.selectedCourse.google_calendar_id);
    const [nametext, setNameText] = React.useState("")
    const [nameerror, setNameError] = React.useState(false)
    const [status, setStatus] = React.useState(null);
    const [statusText, setStatusText] = React.useState(null);
    const [subjectData, setSubjectData] = React.useState(null);

    const loadSubjects = () => {
        APICall("GET", 'fieldsOfStudy?withMajorSubjects=true').then(res => {
            var data = res.data
            setSubjectData(data)
        })
    }

    useEffect(() => {
        if (props.open != open && props.open != false) {
            setOpen(props.open)
        }
    }, [props.open])

    if (subjectData === null) {
        loadSubjects()
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
            handlePut();
        }
    }

    const getMajorSubjectId = (name) => {
        var values = name.split("-")

        if (subjectData !== null) {
            var id = null
            for (var i = 0; i < subjectData["payload"]["FieldsOfStudy"].length; i++) {
                var richtungen = subjectData["payload"]["FieldsOfStudy"][i]["MajorSubjects"]
                for (var j = 0; j < richtungen.length; j++) {
                    if (values[0] == richtungen[j]["name"] && values[1] == richtungen[j]["catalog_effective_from"]) {
                        id = richtungen[j]["majorSubject_id"]
                        break;
                    }
                }
            }
            return (id)
        }
    }

    const handlePut = (event) => {

        let data = {
            name: nameValue,
            google_calendar_id: gcId,
            majorSubject_id: getMajorSubjectId(document.getElementById("studienrichtung-select").innerHTML),
        };

        var url = 'courses?courseId=' + props.selectedCourse.course_id
        APICall("PUT", url, data).then((res) => {
            if (res.data && (res.status === 200 || res.status === 201)) {
                setStatusText(res.statusText)
                setStatus(res.status)
                setTimeout(() => { setStatus(null) }, 2000)
                window.location.reload()
            } else {
                setStatusText("Kurs konnte nicht hinzugefügt werden")
                setStatus(400)
                setTimeout(() => { setStatus(null) }, 3000)
            }
        });
        setOpen(false);
        setOpen2(false);
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
    const handleCloseMenu = () => {
        setOpen(false);
    };
    const handleCloseConfirm = () => {
        setOpen2(false);
    };
    const handleConfirm = (event) => {
        setOpen2(true);
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Kurs bearbeiten"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h7'>Bitte geben Sie den Namen des Kurses an:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required value={nameValue} error={nameerror} onChange={NameOnChange} id="kursname-input" label="Kursname" variant="outlined"  margin="dense" helperText={nametext} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h7'>Bitte geben Sie den Studiengang und Studienrichtung an:</Typography>
                            </Grid>
                            <Grid item xs={12} style={{"padding-top": 0, "padding-bottom": "26px"}}>
                                <StudiengangAuswahl data={subjectData}></StudiengangAuswahl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h7'>Bitte geben Sie die Google Calendar ID an:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required value={gcId} onChange={GCIdOnChange} id="gcId-input" label="Google Calendar ID" variant="outlined" margin="dense"/>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleCloseMenu} color="primary" >
                        Abbrechen
                    </Button>
                    <Button onClick={handleConfirm} color="primary" >
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
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleCloseConfirm} color="primary" >
                        Abbrechen
                </Button>
                    <Button onClick={ClickSubmit} color="primary" >
                        ja
                    </Button>
                </DialogActions>
            </Dialog>
            <SubmitFeedback submit={status} text={statusText}></SubmitFeedback>
        </React.Fragment>
    );
}
