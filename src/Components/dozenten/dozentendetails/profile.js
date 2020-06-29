import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';


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


export default function Profile(props) {
    const classes = useStyles();
    var temp = []
    for (var i = 0; i < props.data["MainFocuses"].length; i++) {
        temp.push(
            <Typography variant="subtitle1"> {"- " + props.data["MainFocuses"][i]["name"]}</Typography>
        )
    }
    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Typography className={classes.title} variant="h6">Tel.: </Typography>
                </Grid>
                <Grid item xs={10}>
                    {props.data["phonenumber"]}
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.title} variant="h6">Email: </Typography>
                </Grid>
                <Grid item xs={10}>
                    {props.data["email"]}
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.title} variant="h6">Studiengangsleiter: </Typography>
                </Grid>
                <Grid item xs={10}>
                    {props.data["DirectorOfStudies"]["username"]}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Schwerpunkte: </Typography>
                </Grid>
                <Grid item xs={12}>
                    {temp}
                </Grid>
            </Grid>

        </Paper>
    );
}
