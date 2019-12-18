import React, { Component } from 'react';
import Nav from '../nav/Nav';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      }}));



    export default function ModulkatalogTable() {
        const classes = useStyles();
        return (
            
            <div className = {classes.root} >
              <Nav></Nav> 
              <main className = {classes.content}>
              <div className = {classes.toolbar}/>
              <Typography variant="h1" noWrap>
                                <h1>Modulkatalog</h1>
                                </Typography>
           
            </main> 
            </div>
        )
    }


