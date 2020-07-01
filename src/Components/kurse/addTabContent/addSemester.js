import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AddSemesterContent from '../addSemesterContent/addSemesterContent';

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
      {value === index && <Box p={0}>{children}</Box>}
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

export default function ScrollableTabsButtonAuto(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { Semesters } = props.selectedCourse;
  Semesters.sort((sem1, sem2) => {
    return new Date(sem1.start_date).getTime() - new Date(sem2.start_date).getTime();
  });

  const finalTabLabels = [];
  const finalTabPanels = [];
  const finalPanelContent = [];

  Semesters.forEach((sem, index) => {
    finalPanelContent.push(<AddSemesterContent semester={sem} {...props} />);
    finalTabLabels.push(<Tab key={index} label={sem.name} {...a11yProps({ index })} />);
    finalTabPanels.push(
      <TabPanel key={index} value={value} index={index}>
        {finalPanelContent[index]}
      </TabPanel>
    );
  });

  return (
    <Fragment>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
          style={{ marginBottom: '1.5rem' }}>
          {finalTabLabels}
        </Tabs>
      </Paper>
      {finalTabPanels}
    </Fragment>
  );
}
