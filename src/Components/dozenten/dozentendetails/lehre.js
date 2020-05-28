import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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

function createData(modul, kurs, zeitraum, sws, shared) {
    return { modul, kurs, zeitraum, sws, shared };
}

const rows = [
    createData('Grundlagen BWL', "WWI17SEB", "18.11.2019-14.02.2020", 40, "Erika Musterfrau"),
    createData('VWL', "WWI16SEA", "18.11.2019-14.02.2020", 25, "-"),
];

export default function Lehre(props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Modul</TableCell>
                        <TableCell >Kurs</TableCell>
                        <TableCell >Zeitraum</TableCell>
                        <TableCell >SWS</TableCell>
                        <TableCell >Co-Dozent</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.modul}
                            </TableCell>
                            <TableCell >{row.kurs}</TableCell>
                            <TableCell >{row.zeitraum}</TableCell>
                            <TableCell >{row.sws}</TableCell>
                            <TableCell >{row.shared}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}
