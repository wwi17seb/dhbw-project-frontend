import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';


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

//TODO: implement real functionality (needs to be discussed with backend)
export default function Vita(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h6">Lebenslauf_Max_Mustermann.pdf</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Download Vita
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Edit Vita
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
