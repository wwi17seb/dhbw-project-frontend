import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Nav from '../nav/Nav';



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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },toolbar: theme.mixins.toolbar,
  content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    }}));


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
    <div className={classes.root}>
      <Nav></Nav>
   <main className = {classes.content}>
              <div className = {classes.toolbar}/>   
<Paper>
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
        </Paper>
      {finalTabPanels}
      </main>
    </div>
  );
}