import React from 'react';
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


export default function Notizen(props) {
    const classes = useStyles();

    const [state, setState] = React.useState(null)
    const [commentList, setCommentList] = React.useState([])
    const [topic, setTopic] = React.useState("")
    const [comment, setComment] = React.useState("")

    const createCommentSection = (topic, comment) => {
        var currentList = commentList
        console.log(currentList)
        currentList.push({ "topic": topic, "comment": comment })
        console.log(currentList)
        setCommentList(currentList)

        var output = []
        for (var i = 0; i < commentList.length; i++) {
            output.push(
                <Paper className={classes.paper} key={topic + i}>
                    <Typography variant="h6">{"Kommentar " + i + ": " + commentList[i]["topic"]}</Typography>
                    <Typography>{commentList[i]["comment"]}</Typography>
                </Paper>
            )
        }
        setState(output)
    }
    console.log(commentList)
    const handleTopic = (event) => {
        setTopic(event.target.value)
    }
    const handleComment = (event) => {
        setComment(event.target.value)
    }

    const handleButton = () => {
        createCommentSection(topic, comment)
        setTopic("")
        setComment("")
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField id="input-topic" fullWidth label="Thema" value={topic} onChange={handleTopic}></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="input-comment"
                                label="Kommentar"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={handleComment}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleButton}>
                                Kommentar senden
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
            {state}
        </div>

    );
}
