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



export default function ModulAddStepper() {
    const STEPS = ['Modul', 'Modulinfo', 'Lehr- und Lerninhalte (Vorlesung)']
    const PRÜFUNGSLEISTUNGEN = ['Klausur', 'Seminararbeit', 'Mündliche Prüfung']
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [steps, setSteps] = React.useState(STEPS);
    const [data, setData] = React.useState({
        'wahlmodul': false,
        'semestervon': '2020',
        'prüfungsleistungen': []
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
        setData({})
        setOpen(false)

    };

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
                    <Button disabled>Modul hinzufügen</Button>
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
                        variant="filled"
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
                        variant="filled"
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="Gruppenname"
                        label="Gruppenname"
                        type="text"
                        fullWidth
                        variant="filled"
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="Alternativ-Modul"
                        label="Alternativ-Modul"
                        type="text"
                        fullWidth
                        variant="filled"
                        onChange={updateField}
                    />
                    <TextField
                        disabled={data.wahlmodul === true ? false : true}
                        margin="dense"
                        id="Beschreibung"
                        label="Beschreibung"
                        type="text"
                        fullWidth
                        variant="filled"
                        onChange={updateField}
                    />
                </>)
        }
        else if (step === 1) {
            return (
                <>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="SemesterVon"
                        label="Von Semester"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="SemesterBis"
                        label="Bis Semester"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Voraussetzung"
                        label="Voraussetzung für Teilnahme"
                        type="text"
                        fullWidth
                        variant="filled"
                    />

                    <FormControl>
                        <InputLabel margin='dense' id="labelPrüfungsleistungen">Prüfungsleistung</InputLabel>
                        <Select
                            labelId="labelPrüfungsleistungen"
                            name='prüfungsleistungen'
                            multiple
                            margin='dense'
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
                        id="Benotet"
                        label="Benotet"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="ECTS"
                        label="ECTS"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Katalog-ID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Beschreibung"
                        label="Beschreibung"
                        type="text"
                        fullWidth
                        variant="filled"
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
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Präsenzzeit"
                        label="Präsenzzeit"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Selbststudium"
                        label="Selbststudium"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Katalog-ID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
                        variant="filled"
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
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Präsenzzeit"
                        label="Präsenzzeit"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Selbststudium"
                        label="Selbststudium"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="Katalog-ID"
                        label="Katalog-ID"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                </>)
        }
    }

}