//Von API wird Presentations benötigt, dort sind alle Informationen enthalten
import axios from 'axios';
import React, { forwardRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as testdata from "./SemesterContent.json"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, toolbar: theme.mixins.toolbar,
    paper: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

export default function CourseTableList() {
    const classes = useStyles();
    const [courseTable, setCourseTable] = React.useState(null)
    const [output, setOutput] = React.useState([])

    const loadData = () => {
        axios.get(`api/courseTable`).then(res => {
            setCourseTable(res.data);
        })
    }

    useEffect(() => {
        createCourseTableRow()
    }, [courseTable])

    const createCourseTableRow = () => {

        if (courseTable !== null) {
            var temp = []
            for (var i = 0; i < courseTable["default"]["payload"]["Presentations"].length; i++) {
                var lecture = courseTable["default"]["payload"]["Presentations"][i]["Lecture"]["name"]
                var sws = courseTable["default"]["payload"]["Presentations"][i]["Lecture"]["workload_dhbw"]
                var kursleistung = courseTable["default"]["payload"]["Presentations"][i]["Lecture"]["Module"]["AcademicRecords"]["abbreviation"]
                var academic_title = courseTable["default"]["payload"]["Presentations"][i]["lecturers"]["academic_title"]
                var lecturer_name = courseTable["default"]["payload"]["Presentations"][i]["lecturers"]["firstname"] + " " + courseTable["default"]["payload"]["Presentations"][i]["lecturers"]["lastname"]
                var status = courseTable["default"]["payload"]["Presentations"][i]["status"]
                temp.push(
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Typography variant="h6">{lecture}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">{sws}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">{kursleistung}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6">{academic_title + " " + lecturer_name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">{status}</Typography>
                            </Grid>
                        </Grid>
                        <Divider></Divider>
                    </Grid>
                )
            }
            setOutput(temp)
        }

        console.log(temp)

    }

    if (courseTable === null) {
        //loadData()
        setCourseTable(testdata)
    }

    console.log(courseTable)

    return (
        <React.Fragment>
            <Grid container spacing={0}>
                <Paper className={classes.paper}>
                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography variant="h5">Vorlesung</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h5">SWS</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h5">Kursleistung</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h5">Dozent</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h5">Status</Typography>
                            </Grid>
                        </Grid>
                        <Divider></Divider>
                    </Grid>
                    {output}
                </Paper>

            </Grid>
        </React.Fragment>
    );
}