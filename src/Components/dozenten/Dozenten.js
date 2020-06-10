import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './dozenten.css';
import Nav from '../nav/Nav';
import LecturerList from './lecturerlist'
<<<<<<< HEAD
//import DozentenDetails from './dozentendetails/dozentendetails'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Grid, Card, CardContent } from '@material-ui/core';
=======
import DozentenDetails from './dozentendetails/dozentendetails'
import { Route, BrowserRouter as Router } from 'react-router-dom'

>>>>>>> UI13

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }, toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    }
}));

export default function DozentenTable() {
    const classes = useStyles();
    return (

        <div className={classes.root}>
            <Nav></Nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h5" noWrap>
                    Dozenten
                </Typography>
                <div className="btn_align">
                    <button className="btn btn_dhbw">Dozenten hinzufügen</button>
                </div>
                {/*
                <form className={classes.searchForm}>
                <Typography variant='h6'>
                     Suchen für Dozenten: </Typography>
                 <Grid container spacing={4}>
                 <Grid item md={5} sm={12}>
              <input type="text" className="form-control" id="inputDozent" />
            </Grid>
            </Grid>
            </form>
            */}
                <Route path="/dozenten" component={LecturerList} />
                <Route path="/dozenten/details" component={DozentenDetails} />
            </main>
        </div>
    )
}
