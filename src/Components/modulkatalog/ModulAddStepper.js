import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import { APICall } from '../../helper/Api';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    input: {
        minWidth: '6rem'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));



export default function ModulAddStepper(props) {
    const history = useHistory();
    const STEPS = ['Modul', 'Modulinfo', 'Lehr- und Lerninhalte (Vorlesung)']
    const PRÜFUNGSLEISTUNGEN = ['Klausur', 'Seminararbeit', 'Mündliche Prüfung']
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [activeStep, setActiveStep] = React.useState(0);
    const [steps, setSteps] = React.useState(STEPS);
    const [vorlesungen, setVorlesungen] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const initialData = {
        'wahlmodul': false,
        'prüfungsleistungen': ["Klausur"],
        'Modul': "",
        'benotet': true,
        'Beschreibung': "",
        'semesterBis': "",
        'semesterVon': "",
    }
    const [data, setData] = React.useState(initialData);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setActiveStep(0)
        setSteps(STEPS)
        setData(initialData)
        setOpen(false)
        setError('')
        setMessage('')
        setAlertOpen(false)

    };

    const handleSend = () => {
        APICall("POST", "/moduleGroups", {
            "majorSubject_id": props.majorSubjectId,
            "name": data.Modul,
            "number_of_modules_to_attend": 1,
            "from_semester_number": data.semesterVon,
            "to_semester_number": data.semesterBis,
            "Modules": [
                {
                    "name": data.wahlmodul ? data.Gruppenname : data.Modul,
                    "description": data.Beschreibung,
                    "ects": data.ECTS,
                    "catalog_id": data.ModulKatalogID,
                    "academicRecord_ids": [1, 2], //this is static right now -> Klausur, Seminararbeit
                    "number_of_lectures_to_attend": vorlesungen.length,
                    "rated": data.benotet,
                    "requirements": data.Voraussetzung,
                    "Lectures": vorlesungen.map((vorlesung) => {
                        return {
                            "name": vorlesung.Vorlesung,
                            "workload_home": vorlesung.Selbststudium,
                            "workload_dhbw": vorlesung.Präsenzzeit,
                            "catalog_id": vorlesung.VorlesungKatalogID,
                            "mainFocus_ids": []
                        }
                    })

                }
            ]
        }).then((res) => {
            console.log(res);
            if (res.data && res.status === 201) {
                setAlertOpen(true)
                setMessage('Modul wurde erfolgreich hinzugefügt')
                setTimeout(() => {
                    handleClose()
                }, 2000)

            } else {
                setAlertOpen(true)
                setError('Modul konnte nicht erfolgreich hinzugefügt werden. Fehler: ' + res.data.message)
            }


        })
    }

    const updateField = (e) => {
        setAlertOpen(false)
        setData({ ...data, [e.target.id]: e.target.value })
    }
    const updateVorlesungen = (index, key, value) => {
        let arr = vorlesungen;
        if (typeof arr[index] !== 'undefined') {
            arr[index][key] = value;
        }
        else {
            arr = vorlesungen;
            arr.push({ [key]: value })
        }
        setVorlesungen(arr)
    }
    const handleVorlesungen = (e, step) => {
        setAlertOpen(false)
        updateVorlesungen(step - 1, e.target.id, e.target.value);
        if (allFieldsFilled()) {
            setDisabled(false)
        }
    }
    const allFieldsFilled = () => {
        for (let prop in data) {
            if (data[prop] === "") return false
        }
        /* if (vorlesungen.length == 0 || vorlesungen[0] == undefined ) return false
        if (vorlesungen[0].keys().length < 4) return false */

        return true;
    }

    const updateSwitch = (e) => {
        setAlertOpen(false)
        setData({ ...data, [e.target.id]: e.target.checked })
    }

    const updateSelect = (e) => {
        setAlertOpen(false)
        setData({ ...data, [e.target.name]: e.target.value })
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleAddLecture = () => {
        let newLecture = `Lehr- und Lerninhalte (Vorlesung ${steps.length - 1})`
        setSteps([...steps, newLecture])
        setActiveStep(steps.length);
    }

    const getSemesterInterval = () => {
        let semesters = [1, 2, 3, 4, 5, 6];
        return ((semesters).map((semester) => (
            <MenuItem key={semester} value={semester}>{semester}</MenuItem>
        ))
        );
    }

    return (
        <div className={classes.root}>
            <Button variant="contained" size="medium" onClick={handleClickOpen} className={classes.button}>Modul hinzufügen</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel><Typography variant='h5'>{label}</Typography></StepLabel>
                            <StepContent>
                                <div>{getStepContent(index)}</div>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        {activeStep !== 0 ?
                                            <Button onClick={handleBack} variant='contained' color='primary' className={classes.button}>
                                                zurück
                                        </Button> : null
                                        }
                                        {activeStep === steps.length - 1 ? <Button onClick={handleAddLecture} variant='contained' color='primary' className={classes.button}>
                                            Weitere Vorlesung hinzufügen
                                        </Button> : null}
                                        {activeStep !== steps.length - 1 ?
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                Weiter
                                        </Button> : null}
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {/* Alert error message */}
                {error !== "" ?
                    <div className={classes.root}>
                        <Collapse in={alertOpen}>
                            <Alert severity="error" action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setAlertOpen(false)}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>
                                {error}
                            </Alert>
                        </Collapse>
                    </div> : null}
                {/* Alert success message */}
                {message !== "" ?
                    <div className={classes.root}>
                        <Collapse in={alertOpen}>
                            <Alert action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setAlertOpen(false)}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }>
                                {message}
                            </Alert>
                        </Collapse>
                    </div> : null}
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button onClick={handleSend} disabled={disabled}>Modul hinzufügen</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    function getStepContent(step) {
        if (step === 0) {
            return (
                <>
                    <FormControlLabel
                        label="Wahlmodul"
                        control={
                            <Switch
                                id='wahlmodul'
                                checked={data.wahlmodul}
                                value={data.wahlmodul}
                                onChange={updateSwitch}
                                name="checkedB"
                                color="primary"
                            />
                        }
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Modul"
                        label="Modul"
                        type="text"
                        fullWidth
                        value={data.Modul == undefined ? "" : data.Modul}
                        onChange={updateField}
                    />
                    <TextField
                        margin="dense"
                        id="Beschreibung"
                        label="Beschreibung"
                        type="text"
                        fullWidth
                        rows={6}
                        multiline
                        value={data.Beschreibung == undefined ? "" : data.Beschreibung}
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="Gruppenname"
                        label="Gruppenname"
                        type="text"
                        fullWidth
                        value={data.Gruppenname == undefined ? "" : data.Gruppenname}
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="AlternativModul"
                        label="Alternativ-Modul"
                        type="text"
                        fullWidth
                        value={data.AlternativModul == undefined ? "" : data.AlternativModul}
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="BeschreibungWahl"
                        label="Beschreibung"
                        type="text"
                        rows={6}
                        multiline
                        fullWidth
                        value={data.BeschreibungWahl == undefined ? "" : data.BeschreibungWahl}
                        onChange={updateField}
                    />
                </>)
        }
        else if (step === 1) {
            return (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="semesterVon-label">von Semester</InputLabel>
                        <Select
                            id="semesterVon-select"
                            name="semesterVon"
                            labelId="semesterVon-label"
                            value={data.semesterVon}
                            onChange={updateSelect}
                        >
                            {getSemesterInterval()}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="semesterBis-label">bis Semester</InputLabel>
                        <Select
                            id="semesterBis-select"
                            name="semesterBis"
                            labelId="semesterBis-label"
                            value={data.semesterBis}
                            onChange={updateSelect}
                        >
                            {getSemesterInterval()}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="Voraussetzung"
                        label="Voraussetzung für Teilnahme"
                        type="text"
                        fullWidth
                        value={data.Voraussetzung == undefined ? "" : data.Voraussetzung}
                        onChange={updateField}
                    />

                    <FormControl className={classes.formControl}>
                        <FormControlLabel
                            label="Benotet"
                            control={
                                <Switch
                                    id='Benotet'
                                    checked={data.benotet}
                                    onChange={updateSwitch}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                        />
                    </FormControl>
                    <br></br>
                    <FormControl>
                        <InputLabel margin='dense' id="labelPrüfungsleistungen">Prüfungsleistung</InputLabel>
                        <Select
                            labelId="labelPrüfungsleistungen"
                            name='prüfungsleistungen'
                            multiple
                            margin='dense'
                            fullWidth
                            placeholder="mehrfach auswählen"
                            value={data.prüfungsleistungen}
                            onChange={updateSelect}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >{PRÜFUNGSLEISTUNGEN.map((name) => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        id="ECTS"
                        label="ECTS"
                        type="text"
                        fullWidth
                        value={data.ECTS == undefined ? "" : data.ECTS}
                        onChange={updateField}
                    />
                    <TextField
                        margin="dense"
                        id="ModulKatalogID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
                        value={data.ModulKatalogID == undefined ? "" : data.ModulKatalogID}
                        onChange={updateField}
                    />
                </>)
        }
        else {
            return (
                <>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Vorlesung"
                        label="Vorlesung"
                        type="text"
                        fullWidth
                        onChange={(e) => handleVorlesungen(e, step - 1)}
                    />
                    <TextField
                        margin="dense"
                        id="Präsenzzeit"
                        label="Präsenzzeit"
                        type="text"
                        fullWidth
                        onChange={(e) => handleVorlesungen(e, step - 1)}
                    />
                    <TextField
                        margin="dense"
                        id="Selbststudium"
                        label="Selbststudium"
                        type="text"
                        fullWidth
                        onChange={(e) => handleVorlesungen(e, step - 1)}
                    />
                    <TextField
                        margin="dense"
                        id="VorlesungKatalogID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
                        onChange={(e) => handleVorlesungen(e, step - 1)}
                    />
                </>)
        }
    }

}