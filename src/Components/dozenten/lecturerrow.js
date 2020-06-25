import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import Link1 from '@material-ui/core/Link';

export default function LecturerRow(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
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
                    <Link1 to={{ pathname: "/dozenten/" + id, state: { data: props.data } }} component={Link}>
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
                    <Button variant="outlined" color="primary" onClick={handleClick}>
                        Aktionen
                </Button>
                    <Menu
                        id={"edit-lecturer-" + name}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Bearbeiten</MenuItem>
                        <MenuItem onClick={handleClose}>Löschen</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <Divider style={{ marginBottom: 10 }}></Divider>
        </Grid>
    );
}
