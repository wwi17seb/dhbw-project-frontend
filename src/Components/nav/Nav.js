import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/ExoPlanLogo_transparent.png';
import { NAV_LINKS, NAV_ITEMS } from '../../shared/navConstants';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.secondary.dark,
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
  navBarLogo: {
    width: '8rem',
    height: 'auto',
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  try {
    var backend_login_response = JSON.parse(localStorage.getItem('backend-login-response'));
  } catch (e) {
    backend_login_response = {};
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.setItem('backend-login-response', JSON.stringify({}));
    localStorage.removeItem('ExoplanSessionToken');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Link to={NAV_ITEMS.COURSES.link}>
            <img src={Logo} alt='ExoPlan Logo' className={classes.navBarLogo} style={{ cursor: 'pointer' }} />
          </Link>
          <div className={classes.toolbarButtons}>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'>
              <AccountCircle fontSize='large' />
            </IconButton>
            <Menu
              id='menu-appbar'
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
              onClose={handleClose}>
              <MenuItem onClick={handleClose} component={Link} to='/kontoeinstellungen'>
                Einstellungen
              </MenuItem>
              <MenuItem onClick={handleLogout} component={Link} to='/'>
                Abmelden
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'>
        <div className={classes.toolbar} />
        <List>
          {NAV_LINKS.map((entry, index) => {
            if (!entry.showOnlyIfAdmin || (backend_login_response && backend_login_response.is_admin)) {
              return (
                <ListItem button={true} divider={true} component={Link} to={entry.link} key={index}>
                  <ListItemText>{entry.name}</ListItemText>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </Drawer>
    </div>
  );
}
