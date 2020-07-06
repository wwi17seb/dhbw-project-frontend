import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Nav from '../nav/Nav';
import { Tabs } from '@material-ui/core';
import GeneralTab from './GeneralTab';

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

const DataTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const config = [
    {
      label: 'Studiengänge',
      labelSingular: 'Studiengang',
      route: 'fieldsOfStudy',
      idQueryName: 'fieldOfStudyId',
      idDbName: 'fieldOfStudy_id',
      payloadName: 'FieldsOfStudy',
      attributes: [{ db: 'name', name: 'Studiengang', namePlural: 'Studiengänge' }],
    },
    {
      label: 'Schwerpunkte',
      labelSingular: 'Schwerpunkt',
      route: 'mainFocuses',
      idQueryName: 'mainFocusId',
      idDbName: 'mainFocus_id',
      payloadName: 'MainFocuses',
      attributes: [{ db: 'name', name: 'Schwerpunkt', namePlural: 'Schwerpunkte' }],
    },
    {
      label: 'Prüfungsleistungen',
      labelSingular: 'Prüfungsleistung',
      route: 'academicRecords',
      idQueryName: 'academicRecordId',
      idDbName: 'academicRecord_id',
      payloadName: 'AcademicRecords',
      attributes: [
        { db: 'type', name: 'Prüfungsleistung', namePlural: 'Prüfungsleistungen' },
        { db: 'abbreviation', name: 'Abkürzung', namePlural: 'Abkürzungen' },
      ],
    },
  ];

  const finalTabLabels = [];
  const finalTabPanels = [];
  let tabIndex = 0;

  config.forEach((conf) => {
    finalTabLabels.push(<Tab key={tabIndex} label={conf.label} {...a11yProps({ tabIndex })} />);
    finalTabPanels.push(
      <TabPanel key={tabIndex} value={value} index={tabIndex}>
        {<GeneralTab {...conf} key={tabIndex} />}
      </TabPanel>
    );
    tabIndex++;
  });

  return (
    <div className={classes.root}>
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
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
      </main>
    </div>
  );
};

export default DataTabs;
