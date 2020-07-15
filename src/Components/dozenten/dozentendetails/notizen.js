import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { APICall } from '../../../helper/Api';


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

    const [comment, setComment] = React.useState(null)
    const [disabled, setDisabled] = React.useState(true)
    const [data, setData] = React.useState(props.data);

    useEffect(() => {
        if (data !== props.data) {
            setData(props.data)
        }
    }, [props.data])

    const handleComment = (event) => {
        setComment(event.target.value)
    }

    useEffect(() => {

        if (comment !== data["comment"] && !props.editDisabled) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

    }, [comment, data])

    const updateComment = () => {
        const url = "lecturers?lecturerId=" + props.data["lecturer_id"]
        var data = props.data
        delete data["lecturer_id"]
        data["comment"] = comment
        APICall('PUT', url, data).then(res => {
            props.reloadData()
        })
    }

    const handleButton = () => {
        updateComment()
    }

    if (comment === null && data !== null) {
        setComment(data["comment"])
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
