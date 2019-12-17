import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = ["Übersicht", "WWI 17 SEB", "WWI 18 SEA", "Hinzufügen"];
  const finalTabLabels = [];
  const finalTabPanels = [];
  const finalPanelContent = ["Übersicht", "WWI 17 SEB", "WWI 18 SEA", "Hinzufügen"];
  let tabIndex = 0;

  for (let tabLabel of tabLabels) {
    finalTabLabels.push(<Tab label={tabLabel} {...a11yProps({tabIndex})} />);
    finalTabPanels.push(<TabPanel value={value} index={tabIndex}> {finalPanelContent[tabIndex]} </TabPanel>)
    tabIndex++;
  }

  return (
    <div className={classes.root}>´
      <AppBar style={{background: 'red'}} position="fixed" className={classes.appBar}>
      <Toolbar>
          <Typography variant="h6" noWrap>
            ExoPlan
          </Typography>
        </Toolbar>
        
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {finalTabLabels}
        </Tabs>
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
      {finalTabPanels}
      </div>
      
  );
}