import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { APICall } from '../../helper/Api';
import ApiHandler from '../../helper/Api';
import Nav from '../nav/Nav';
import SnackBar from '../Snackbar/Snackbar';
import AddKurs from './addkurs/addkurs';
import AddTabContent from './addTabContent/addTabContent';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [courses, setCourses] = useState([]);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const courseNames = courses.map((course) => course.name);
  const tabLabels = courseNames.concat(['Kurs Hinzufügen']);
  const finalTabLabels = [];
  const finalTabPanels = [];
  const finalPanelContent = courses
    .map((course) => <AddTabContent selectedCourse={course} showSnackbar={showSnackbar} />)
    .concat([<AddKurs />]);
  let tabIndex = 0;

  for (let tabLabel of tabLabels) {
    finalTabLabels.push(<Tab key={tabIndex} label={tabLabel} {...a11yProps({ tabIndex })} />);
    finalTabPanels.push(
      <TabPanel key={tabIndex} value={value} index={tabIndex} style={{ paddingLeft: 15, paddingRight: 15 }}>
        {finalPanelContent[tabIndex]}
      </TabPanel>
    );
    tabIndex++;
  }

  useEffect(() => {
    APICall('GET', 'courses').then((res) => {
      if (res.data && res.status === 200) {
        setCourses(res.data.payload.Courses);
      } else {
        showSnackbar('Kurse konnten nicht geladen werden!', SEVERITY.ERROR);
      }
    });
    return () => {};
  }, []);

  const handleAPIresponse = async (response) => {
    const { Courses } = response.data.payload;
    setCourses(Courses);
  };

  const getMessage = (props) => {
    if (props.location && props.location.state) {
      return props.location.state.message;
    }
  };

  return (
    <div className={classes.root}>
      <Nav />
      <ApiHandler url='/api/courses' handleAPIresponse={handleAPIresponse} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {(props.location && props.location.state) !== undefined ? (
          <div className='alert alert-success alert-dismissible fadeOut' role='alert' id='success-alert'>
            <strong>{getMessage(props)}</strong>
            <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        ) : null}

        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'>
            {finalTabLabels}
          </Tabs>
        </Paper>
        {finalTabPanels}
        <SnackBar isOpen={snackbarOpen} message={message} severity={severity} closeSnackbar={closeSnackbar} />
      </main>
    </div>
  );
}
