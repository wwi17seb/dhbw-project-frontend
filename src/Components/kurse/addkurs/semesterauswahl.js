import 'date-fns';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Typography } from '@material-ui/core';

//leider war es mir nicht möglich die Auswahlmenüs auf dynamische Art zu generieren, da auf dynamische Art der State eines einzelnen Auswahlmenüs
//nicht richtig geändert werden konnte. Ein dynamisches generieren wäre grundsätzlich wünschenswert um den Code klein zu halten und wiederzuverwenden.
//TODO für die Zukunft: Auswahlmenüs dynamisch entsprechend der Semesteranzahl generieren
export default function SemesterAuswahl({ handleValues, anzahlSemester }) {

    const [valueB1, setValueB1] = useState(new Date());
    const [valueB2, setValueB2] = useState(new Date());
    const [valueB3, setValueB3] = useState(new Date());
    const [valueB4, setValueB4] = useState(new Date());
    const [valueB5, setValueB5] = useState(new Date());
    const [valueB6, setValueB6] = useState(new Date());
    const [valueB7, setValueB7] = useState(new Date());
    const [valueE1, setValueE1] = useState(new Date());
    const [valueE2, setValueE2] = useState(new Date());
    const [valueE3, setValueE3] = useState(new Date());
    const [valueE4, setValueE4] = useState(new Date());
    const [valueE5, setValueE5] = useState(new Date());
    const [valueE6, setValueE6] = useState(new Date());
    const [valueE7, setValueE7] = useState(new Date());
    const handleB1 = data => { setValueB1(data) };
    const handleB2 = data => { setValueB2(data) };
    const handleB3 = data => { setValueB3(data) };
    const handleB4 = data => { setValueB4(data) };
    const handleB5 = data => { setValueB5(data) };
    const handleB6 = data => { setValueB6(data) };
    const handleB7 = data => { setValueB7(data) };
    const handleE1 = data => { setValueE1(data) };
    const handleE2 = data => { setValueE2(data) };
    const handleE3 = data => { setValueE3(data) };
    const handleE4 = data => { setValueE4(data) };
    const handleE5 = data => { setValueE5(data) };
    const handleE6 = data => { setValueE6(data) };
    const handleE7 = data => { setValueE7(data) };

    useEffect(() => {
        const state = generateState()
        handleValues(state)
    }, [valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueE1, valueE2, valueE3, valueE4, valueE5, valueE6, valueE7, anzahlSemester]);

    const generateState = () => {
        if (anzahlSemester === true) {
            return ({
                B1: valueB1,
                B2: valueB2,
                B3: valueB3,
                B4: valueB4,
                B5: valueB5,
                B6: valueB6,
                B7: valueB7,
                E1: valueE1,
                E2: valueE2,
                E3: valueE3,
                E4: valueE4,
                E5: valueE5,
                E6: valueE6,
                E7: valueE7,
            })
        } else {
            return ({
                B1: valueB1,
                B2: valueB2,
                B3: valueB3,
                B4: valueB4,
                B5: valueB5,
                B6: valueB6,
                E1: valueE1,
                E2: valueE2,
                E3: valueE3,
                E4: valueE4,
                E5: valueE5,
                E6: valueE6,
            })
        }

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle1">{"Semester 1:"}</Typography>
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerB1"
                                label="Beginn Semester 1"
                                value={valueB1}
                                onChange={handleB1}
                            />
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerE1"
                                label="Ende Semester 1"
                                value={valueE1}
                                onChange={handleE1}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle1">{"Semester 2:"}</Typography>
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerB2"
                                label="Beginn Semester 2"
                                value={valueB2}
                                onChange={handleB2}
                            />
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerE2"
                                label="Ende Semester 2"
                                value={valueE2}
                                onChange={handleE2}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle1">{"Semester 3:"}</Typography>
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerB3"
                                label="Beginn Semester 3"
                                value={valueB3}
                                onChange={handleB3}
                            />
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerE3"
                                label="Ende Semester 3"
                                value={valueE3}
                                onChange={handleE3}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle1">{"Semester 4:"}</Typography>
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerB4"
                                label="Beginn Semester 4"
                                value={valueB4}
                                onChange={handleB4}
                            />
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerE1"
                                label="Ende Semester 4"
                                value={valueE4}
                                onChange={handleE4}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle1">{"Semester 5:"}</Typography>
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerB5"
                                label="Beginn Semester 5"
                                value={valueB5}
                                onChange={handleB5}
                            />
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerE5"
                                label="Ende Semester 5"
                                value={valueE5}
                                onChange={handleE5}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle1">{"Semester 6:"}</Typography>
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerB6"
                                label="Beginn Semester 6"
                                value={valueB6}
                                onChange={handleB6}
                            />
                        </Grid>
                        <Grid item>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="datepickerE6"
                                label="Ende Semester 6"
                                value={valueE6}
                                onChange={handleE6}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            {anzahlSemester ?
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Typography variant="subtitle1">{"Semester 7:"}</Typography>
                            </Grid>
                            <Grid item>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd.MM.yyyy"
                                    margin="normal"
                                    id="datepickerB7"
                                    label="Beginn Semester 7"
                                    value={valueB7}
                                    onChange={handleB7}
                                />
                            </Grid>
                            <Grid item>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd.MM.yyyy"
                                    margin="normal"
                                    id="datepickerE7"
                                    label="Ende Semester 7"
                                    value={valueE7}
                                    onChange={handleE7}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid> : null}
        </Grid>
    );
}
