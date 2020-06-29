import axios from 'axios';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, toolbar: theme.mixins.toolbar,
    paper: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 10
    },
    title: {
        marginBottom: 15
    }
}));

//TODO: implement comment posting (currently added comments are not saved)
export default function Notizen(props) {
    const classes = useStyles();

    const [state, setState] = React.useState(null)
    const [comment, setComment] = React.useState(null)
    const [disabled, setDisabled] = React.useState(true)

    const handleComment = (event) => {
        setComment(event.target.value)
    }

    useEffect(() => {

        if (comment !== props.data["comment"] && !props.editDisabled) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

    }, [comment])

    const updateComment = () => {
        const url = "/api/lecturers?lecturerId=" + props.data["lecturer_id"] + "&token=" + localStorage.getItem("ExoplanSessionToken")
        var data = props.data
        delete data["lecturer_id"]
        data["comment"] = comment
        axios.put(url, data).then(res => {
            window.location.reload()
        })
    }

    const handleButton = () => {
        updateComment()
    }

    if (comment === null) {
        setComment(props.data["comment"])
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="input-comment"
                                label="Kommentar"
                                multiline
                                variant="filled"
                                rows={4}
                                value={comment}
                                onChange={handleComment}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" disabled={disabled} color="primary" onClick={handleButton}>
                                Änderung bestätigen
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>

    );
}
