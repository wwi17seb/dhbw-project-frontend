import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, MenuItem, InputLabel, makeStyles } from '@material-ui/core';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl'
import { APICall } from '../../helper/Api';
import { useHistory } from "react-router-dom";

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [fieldOfStudy, setFieldOfStudy] = React.useState("");
    const [majorSubject, setMajorSubject] = React.useState("");
    const [year, setYear] = React.useState();

    let history = useHistory()

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        dialogActions: {
            paddingRight: "16px",
            paddingBottom: "10px"
        }
    }));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddClick = () => {
        APICall("POST", "/fieldsOfStudy", {
            "name": fieldOfStudy
        }).then((res) => {
            APICall("POST", "/majorSubjects", {
                "fieldOfStudy_id": res.data.payload.fieldOfStudy_id,
                "name": majorSubject,
                "catalog_effective_from": year.toString()
            }).then((res) => {
                let id = res.data.payload.majorSubject_id
                history.push("/modulkatalog/details/" + id);
            }).catch((err) => {

            })
        }).catch((err) => {

        })

        setOpen(false);
    };

    const handleFieldOfStudyChange = (event) => {
        setFieldOfStudy(event.target.value);
    };
    const handleMajorSubjectChange = (event) => {
        setMajorSubject(event.target.value);
    };
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const getMenuItems_forYearSelect = () => {
        let year = moment().year();
        let years = [year - 5, year - 4, year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3, year + 4, year + 5];
        return ((years).map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
        ))
        );
    }

    const classes = useStyles();

    return (
        <div>
            <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>Modulkatalog hinzufügen</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Neuen Modulkatalog hinzufügen</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="study-label">Studiengang</InputLabel>
                        <Select
                            id="study-select"
                            labelId="study-label"
                            value={fieldOfStudy}
                            onChange={handleFieldOfStudyChange}
                        >
                            <MenuItem value={"BWL"}>BWL</MenuItem>
                            <MenuItem value={"Digitale Medien"}>Digitale Medien</MenuItem>
                            <MenuItem value={"Wirtschaftsinformatik"}>Wirtschaftsinformatik</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="year-label">Gültig ab</InputLabel>
                        <Select
                            id="year-select"
                            labelId="year-label"
                            value={year}
                            onChange={handleYearChange}
                        >
                            {getMenuItems_forYearSelect()}
                        </Select>
                    </FormControl>
                    <br></br>
                    <FormControl className={classes.formControl}>
                        <TextField
                            margin="dense"
                            id="studienrichtung"
                            label="Studienrichtung"
                            type="text"
                            fullWidth
                            value={majorSubject}
                            onChange={handleMajorSubjectChange}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleClose} color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleAddClick} color="primary">
                        Hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}