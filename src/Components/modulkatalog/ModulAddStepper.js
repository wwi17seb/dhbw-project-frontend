import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import { Input } from '@material-ui/core';
import { APICall } from '../../helper/Api';

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
    const STEPS = ['Modul', 'Modulinfo', 'Lehr- und Lerninhalte (Vorlesung)']
    const PRÜFUNGSLEISTUNGEN = ['Klausur', 'Seminararbeit', 'Mündliche Prüfung']
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [steps, setSteps] = React.useState(STEPS);
    const [data, setData] = React.useState({
        'wahlmodul': false,
        'prüfungsleistungen': ["Klausur"],
        'benotet': true
    });

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
        setData({
            'wahlmodul': false,
            'prüfungsleistungen': ["Klausur"],
            'benotet': true
        })
        setOpen(false)

    };

    const handleSend = () => {
        APICall("POST", "/moduleGroups", {
            "majorSubject_id": props.majorSubjectId,
            "name": data.Modul,
            "number_of_modules_to_attend": 0,
            "from_semester_number": data.semestervon,
            "to_semester_number": data.semesterbis,
            "Modules": [
                {
                    "name": "[NAME_DES_MODULS]",
                    "description": data.Beschreibung,
                    "ects": data.ECTS,
                    "catalog_id": data.KatalogID,
                    "academicRecord_ids": [ 0, 0 ],
                    "number_of_lectures_to_attend": 0,
                    "rated": true,
                    "requirements": "[ANFODERUNGEN]",
                    "Lectures": [
                        {
                            "name": "[NAME_DER_VORLESUNG]",
                            "workload_home": 0,
                            "workload_dhbw": 0,
                            "catalog_id": data.KatalogID,
                            "mainFocus_ids": [ 1, 2 ]
                        }
                    ]
                }
            ]
        }).then((res) => {
            console.log(res);
        });
    }

    const updateField = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
        console.log(data)
    }

    const updateSwitch = (e) => {
        console.log(e.target.checked)
        setData({ ...data, [e.target.id]: e.target.checked })
    }

    const updateSelect = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data)
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
        let semesters = [1,2,3,4,5,6];
        return ( (semesters).map((semester) => (
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
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="Gruppenname"
                        label="Gruppenname"
                        type="text"
                        fullWidth
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="Alternativ-Modul"
                        label="Alternativ-Modul"
                        type="text"
                        fullWidth
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
                            value={data.semestervon}
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
                            value={data.semesterbis}
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
                    />
                    <TextField
                        margin="dense"
                        id="KatalogID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
                    />
                </>)
        }
        else if (step === 2) {
            return (
                <>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Vorlesung"
                        label="Vorlesung"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="Präsenzzeit"
                        label="Präsenzzeit"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="Selbststudium"
                        label="Selbststudium"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="Katalog-ID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
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
                    />
                    <TextField
                        margin="dense"
                        id="Präsenzzeit"
                        label="Präsenzzeit"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="Selbststudium"
                        label="Selbststudium"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="Katalog-ID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
                    />
                </>)
        }
    }

}