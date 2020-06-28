import React from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Logo from '../../images/ExoPlanLogo_transparent.png';
import "./nav.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.secondary.dark
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /*
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    //window.location.href=links[index];
  };*/

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('ExoplanSessionToken');
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}> 
        <Toolbar>
          <img src={Logo} alt="ExoPlan Logo" className="NavBarLogo"></img>
          <div className={classes.toolbarButtons}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to='/kontoeinstellungen'>Einstellungen</MenuItem>
                <MenuItem onClick={handleLogout} component={Link} to='/'>Abmelden</MenuItem>            </Menu>
          </div>
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
          <ListItem button={true}
            divider={true}
            //selected={selectedIndex === 0} 
            //onClick={event => handleListItemClick(event, 0)}
            component={Link} to='/kurse'>
            <ListItemText>
              Vorlesungspläne
                        </ListItemText>
          </ListItem>
          <ListItem button={true}
            divider={true}
            //selected={selectedIndex === 1} 
            //onClick={event => handleLecturerLoad(event, 1)}
            component={Link} to='/dozenten'>
            <ListItemText>
              Dozenten
                        </ListItemText>
          </ListItem>
          <ListItem button={true}
            divider={true}
            //selected={selectedIndex === 2} 
            //onClick={event => handleListItemClick(event, 2)}
            component={Link} to='/modulkatalog'>
            <ListItemText>
              Modulkataloge
                        </ListItemText>
          </ListItem>
        </List>

      </Drawer>
    </div>
  );
}
