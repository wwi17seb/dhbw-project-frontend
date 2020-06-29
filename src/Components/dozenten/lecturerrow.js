import axios from 'axios';
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import Link1 from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditLecturer from "./editlecturer"

export default function LecturerRow(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true)
    const [currentDirector, setCurrentDirector] = React.useState("")

    const handleCloseConfirm = () => {
        setOpen2(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setOpen(true)
        setInterval(function () { setOpen(false); }, 1000);
    };

    const deleteLecturer = () => {
        const url = "/api/lecturers?lecturerId=" + props.data["lecturer_id"] + "&token=" + localStorage.getItem("ExoplanSessionToken")
        axios.delete(url).then(res => {
            window.location.reload()
        })
    }

    const handleSubmit = () => {
        deleteLecturer()
    };

    const handleDelete = () => {
        setOpen2(true)
    };

    const loadDirector = () => {
        const url = "/api/directorOfStudies?token=" + localStorage.getItem("ExoplanSessionToken")
        axios.get(url).then(res => {
            setCurrentDirector(res.data.payload["DirectorOfStudies"]["username"])
        })
    }
    loadDirector()

    useEffect(() => {
        if (!props.data["allow_manipulation"]) {
            if (props.data["DirectorOfStudies"]["username"] === currentDirector) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else {
            setDisabled(false)
        }
    }, [currentDirector])

    var temp2 = []
    var title = props.data["academic_title"]
    var name = props.data["firstname"] + " " + props.data["lastname"]
    var mainFocus = props.data["MainFocuses"]
    var email = props.data["email"]
    var tel = props.data["phonenumber"]
    var id = props.data["lecturer_id"]
    var director = props.data["DirectorOfStudies"]["username"]
    var intext = props.data["is_extern"]

    if (title === null) {
        title = ""
    }

    const printIntExt = (intext) => {
        if (intext) {
            return ("extern")
        } else {
            return ("intern")
        }
    }

    for (var j = 0; j < mainFocus.length; j++) {
        temp2.push(
            <Typography variant="h6">{mainFocus[j]["name"]}</Typography>
        )
    }

    return (
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Link1 to={{ pathname: "/dozenten/" + id, state: { data: props.data, editDisabled: disabled } }} component={Link}>
                        <Typography variant="h6">{title + " " + name + " (" + printIntExt(intext) + ")"}</Typography>
                    </Link1>
                    <Typography variant="subtitle1">{"Tel.: " + tel}</Typography>
                    <Typography variant="subtitle1">{email}</Typography>
                </Grid>
                <Grid item xs={3}>
                    {temp2}
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6">{director}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button disabled={disabled} variant="outlined" color="primary" onClick={handleClick}>
                        Aktionen
                    </Button>
                    <Menu
                        id={"edit-lecturer-" + name}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleEdit}>Bearbeiten</MenuItem>
                        <MenuItem onClick={handleDelete}>Löschen</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <Dialog
                open={open2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Dozent wirklich für alle löschen?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirm} color="primary" >
                        abbrechen
                    </Button>
                    <Button onClick={handleSubmit} color="primary" >
                        löschen
                </Button>
                </DialogActions>
            </Dialog>
            <EditLecturer data={props.data} open={open}></EditLecturer>
            <Divider style={{ marginBottom: 10 }}></Divider>
        </Grid>
    );
}
