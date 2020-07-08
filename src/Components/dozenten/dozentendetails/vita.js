import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import SubmitFeedback from '../../kurse/addkurs/submitfeedback'
import Menu from '@material-ui/core/Menu';
import download from 'downloadjs'
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

//TODO: implement real functionality (needs to be discussed with backend)
export default function Vita(props) {
    const classes = useStyles();
    const [cvName, setCvName] = React.useState(props.data["cv"]);
    const [disabled, setDisabled] = React.useState(props.editDisabled);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [submit, setSubmit] = React.useState(true);
    const [submitText, setSubmitText] = React.useState(null);
    const [submitState, setSubmitState] = React.useState(null);
    const [cv, setCv] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [data, setData] = React.useState(props.data);

    useEffect(() => {
        if (data !== props.data) {
            setData(props.data)
            setCvName(props.data["cv"])
        }
    }, [props.data])

    useEffect(() => {
        if (disabled !== props.editDisabled) {
            setDisabled(props.editDisabled)
        }
    }, [props.editDisabled])

    var url = ""
    if (data !== null) {
        url = "lecturerCV?lecturerId=" + props.data["lecturer_id"]
    }

    const handleAdd = (event) => {
        setOpen(true)
    }
    const handleCloseMenu = () => {
        setOpen(false);
    };
    const handleCloseConfirm = () => {
        setOpen2(false);
    };

    const handleOpenEdit = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteCV = () => {
        axios.delete(url).then(res => {
            props.reloadData()
        })
    }

    const handleSubmitDelete = () => {
        deleteCV()
        setOpen2(false);
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setOpen2(true)
    };

    const handleSubmit = () => {
        const data = new FormData()
        data.append("cv", cv,)
        APICall('PUT', url, data).then(res => {
            setSubmitState(res.status)
            setSubmitText(res.statusText)
            setTimeout(() => { setSubmitState(null) }, 2000)
            setOpen(false);
            setAnchorEl(null);
            props.reloadData()
        }
        ).catch(err => {
            setSubmitState(err.response.status)
            setSubmitText(err.response.statusText)
            setTimeout(() => { setSubmitState(null) }, 3000)
            setOpen(false);
        }
        )
    };

    const handleUpload = event => {
        setCv(event.target.files[0])
    }

    const handleDownload = event => {
        axios.get(url, { responseType: 'blob' }).then(res => {
            const content = res.headers['content-type'];
            download(res.data, cvName, content)
        })
    }

    useEffect(() => {
        if (cv !== null) {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }, [cv])

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                {(cvName === "" || cvName === null) ?
                    <Grid key="add-cv-button" item>
                        <Button disabled={disabled} onClick={handleAdd} variant="contained" color="primary">
                            Lebenslauf hinzufügen
                        </Button>
                    </Grid> :
                    <React.Fragment>
                        <Grid item>
                            <Typography variant="h6">{cvName}</Typography>
                        </Grid>
                        <Grid item>
                            <Button disabled={disabled} onClick={handleOpenEdit} variant="outlined" color="primary">
                                Lebenslauf ändern
                            </Button>
                            <Menu
                                id={"edit-cv-menu"}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                keepMounted
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleAdd}>Bearbeiten</MenuItem>
                                <MenuItem onClick={handleDelete}>Löschen</MenuItem>
                            </Menu>
                            <Dialog
                                open={open2}
                            >
                                <DialogTitle id="delete-cv-title">{"Lebenslauf wirklich entfernen?"}</DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleCloseConfirm} color="primary" >
                                        abbrechen
                                    </Button>
                                    <Button onClick={handleSubmitDelete} color="primary" >
                                        löschen
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleDownload} color="primary">
                                Lebenslauf herunterladen
                            </Button>
                        </Grid>
                    </React.Fragment>
                }
            </Grid>
            <Dialog
                open={open}
            >
                <DialogTitle id="add-cv-title">{"Lebenslauf für Dozenten hinzufügen:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="add-cv-description">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormControl style={{ marginTop: 10 }} required className={classes.formControl}>
                                    <Input id="add-cv-input" type="file" name="cv" onChange={handleUpload} />
                                    <FormHelperText id="my-helper-text">Lebenslauf hochladen</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ padding: 20 }}>
                    <Button onClick={handleCloseMenu} color="primary" >
                        abbrechen
                    </Button>
                    <Button disabled={submit} onClick={handleSubmit} color="primary" >
                        hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
            <SubmitFeedback submit={submitState} text={submitText}></SubmitFeedback>
        </Paper>
    );
}
