import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import ApiHandler from '../../helper/Api';
import Nav from '../nav/Nav';
import AddKurs from './addkurs/addkurs';
import AddTabContent from './addTabContent/addTabContent';

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = ['ABC17DEF', 'Kurs Hinzufügen'];
  const finalTabLabels = [];
  const finalTabPanels = [];
  const finalPanelContent = [<AddTabContent></AddTabContent>, <AddKurs></AddKurs>];
  let tabIndex = 0;

  for (let tabLabel of tabLabels) {
    finalTabLabels.push(<Tab key={tabIndex} label={tabLabel} {...a11yProps({ tabIndex })} />);
    finalTabPanels.push(
      <TabPanel key={tabIndex} value={value} index={tabIndex}>
        {' '}
        {finalPanelContent[tabIndex]}{' '}
      </TabPanel>
    );
    tabIndex++;
  }

  const handleAPIresponse = (response) => {
    console.log('parent comp');
    console.log(response);
  };
  return (
    <div className={classes.root}>
      <Nav></Nav>
      <ApiHandler url='/api/courses' handleAPIresponse={handleAPIresponse}></ApiHandler>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {props.location.state !== undefined ? (
          <div className='alert alert-success alert-dismissible fadeOut' role='alert' id='success-alert'>
            <strong>{props.location.state.message}</strong>
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
      </main>
    </div>
  );
}
