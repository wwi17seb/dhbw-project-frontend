import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import ReceiptIcon from '@material-ui/icons/Receipt';
import TodayIcon from '@material-ui/icons/Today';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


    export default function ModulkatalogTable() {
        const classes = useStyles();
        return (
            <div className={classes.root}>
                <AppBar style={{background: 'red'}} position="fixed" className={classes.appBar}>
      
      <Toolbar>
          <Typography variant="h6" noWrap>
            ExoPlan
          </Typography>
        </Toolbar>
        </AppBar>
        <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
                   <ListItem>
                      <ListItemIcon>
                          <Link to='/kurse'><TodayIcon></TodayIcon></Link>
                      </ListItemIcon>
                      <ListItemText>
                          <Link to='kurse'>Kurse</Link>
                      </ListItemText>
                  </ListItem>
                  <ListItem>
                      <ListItemIcon>
                          <Link to='/dozenten'><GroupIcon></GroupIcon></Link>
                      </ListItemIcon>
                      <ListItemText>
                          <Link to='/dozenten'>Dozenten</Link>
                      </ListItemText>
                  </ListItem>
                  <ListItem>
                      <ListItemIcon>
                          <Link to='/modulkatalog'><ReceiptIcon></ReceiptIcon></Link>
                      </ListItemIcon>
                      <ListItemText>
                          <Link to='/modulkatalog'>Modulkatalog</Link>
                      </ListItemText>
                  </ListItem>
              </List>
      
    </Drawer>
                <h1>Modulkatalog</h1>
            </div>
        )
    }


