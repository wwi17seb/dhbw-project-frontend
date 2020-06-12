import axios from 'axios';
import React, { forwardRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as testdata from "./dozententestdata.json";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LecturerRow from "./lecturerrow"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AddLecturer() {


    return (
        <React.Fragment>          
            <div>
                Vorname: 
                <TextField></TextField><br></br>
                Nachname: 
                <TextField></TextField><br></br>
                E-Mail: 
                <TextField></TextField><br></br>
                Telefonnummer: 
                <TextField></TextField><br></br>
                Schwerpunkte: 
                <TextField></TextField><br></br>
                Studiengangsleiter:
                <TextField></TextField><br></br>
                Lebenslauf:
                <Button>Upload Lebenslauf</Button><br></br>
                <TextField></TextField><br></br>
                Schwerpunkte: 
                <TextField></TextField><br></br>
                Studiengangsleiter:
                <TextField></TextField><br></br>
                Lebenslauf:
                <Button>Upload Lebenslauf</Button><br></br>
            </div>
       </React.Fragment>

    );
}
