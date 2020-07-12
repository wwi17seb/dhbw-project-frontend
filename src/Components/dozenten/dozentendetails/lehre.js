import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { APICall } from '../../../helper/Api';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, toolbar: theme.mixins.toolbar,
    paper: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        marginBottom: 15
    }
}));

const printPeriod = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var output = startDate.toLocaleString("de-DE", options) + " - " + endDate.toLocaleString("de-DE", options)

    return output

}

function createDataRow(data) {
    var module = ""
    var course = ""
    var period = ""
    var sws = ""
    var shared = ""

    module = data.Lecture.name
    course = data.Course.name
    sws = data.Lecture.workload_dhbw
    period = printPeriod(data.Semester.start_date, data.Semester.end_date)

    for (var i = 0; i < data.CoLecturers.length; i++) {
        shared += data.CoLecturers[i].academic_title + " " + data.CoLecturers[i].firstname + " " + data.CoLecturers[i].lastname + "; "
    }

    return { module, course, period, sws, shared };
}

export default function Lehre() {
    const classes = useStyles();
    const [rows, setRows] = React.useState([]);

    const getCurrentIdFromURL = () => {
        const currentURL = window.location.href
        const splittedURL = currentURL.split("/")

        return (splittedURL[4])
    }

    const loadLectures = () => {
        const id = getCurrentIdFromURL()
        const url = 'presentations?getCoLecturers=true&lecturerId=' + id
        var temp = []

        APICall('GET', url).then((res) => {
            for (var i = 0; i < res.data.payload.Presentations.length; i++) {
                temp.push(createDataRow(res.data.payload.Presentations[i]))
            }
            setRows(temp)
        });
    }

    if (rows.length === 0) {
        loadLectures()
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{"font-weight": "bold"}}>Modul</TableCell>
                        <TableCell style={{"font-weight": "bold"}}>Kurs</TableCell>
                        <TableCell style={{"font-weight": "bold"}}>Zeitraum</TableCell>
                        <TableCell style={{"font-weight": "bold"}}>SWS</TableCell>
                        <TableCell style={{"font-weight": "bold"}}>Co-Dozent</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={"tablerow-" + row.module + "-" + row.period}>
                            <TableCell component="th" scope="row">
                                {row.module}
                            </TableCell>
                            <TableCell >{row.course}</TableCell>
                            <TableCell >{row.period}</TableCell>
                            <TableCell >{row.sws}</TableCell>
                            <TableCell >{row.shared}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}
