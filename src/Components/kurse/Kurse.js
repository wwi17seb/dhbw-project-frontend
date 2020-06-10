import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Nav from '../nav/Nav';
import AddKurs from './addkurs/addkurs'
import AddTabContent from './addTabContent/addTabContent'
import '../../helper/Api'
import { API, APIGet } from '../../helper/Api';
import axios from 'axios'



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
  }, toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  }
}));


export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = ["Übersicht", "ABC17DEF", "Kurs Hinzufügen"];
  const finalTabLabels = [];
  const finalTabPanels = [];
  const finalPanelContent = ["Übersicht", <AddTabContent></AddTabContent>, <AddKurs></AddKurs>];
  let tabIndex = 0;



  for (let tabLabel of tabLabels) {
    finalTabLabels.push(<Tab key={tabIndex} label={tabLabel} {...a11yProps({ tabIndex })} />);
    finalTabPanels.push(<TabPanel key={tabIndex} value={value} index={tabIndex}> {finalPanelContent[tabIndex]} </TabPanel>)
    tabIndex++;
  }
  /* useEffect(() => {
    console.log(document.getElementById('success-alert'));
    document.getElementById('success-alert').fadeTo(2000, 500).slideUp(500, function() {
      document.getElementById('success-alert').slideUp(500);
    });
  }); */

  useEffect(() => {



    const fetch = async () => {
      let response1 = await API('/api/courses');
      console.log("Res1:" + response1.toString());

    }
    fetch();

    // let res = API('get', '/api/courses')
    // console.log(res);
    // res.then((response) => {
    //   console.log(response);
    // })

    // async function fetch() {
    //   try {
    //     await API('get', '/api/courses')
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    // let res = fetch();
    // let method = 'get'
    // let url = 'api/courses'
    // let config = null
    // let params = {
    //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvam9Aam9qby5kZSIsImlhdCI6MTU5MTc4Mzg5OCwiZXhwIjoxNTkxODI3MDk4fQ.JI2OPU8_WvjdJmx9wPLffW4rYr6bDTHt_5eXY94fgZk'
    // }

    // axios({
    //   method: method,
    //   url: url,
    //   config: config,
    //   params: params
    // }).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   return err;
    // })
  })

  return (
    <div className={classes.root}>
      <Nav></Nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {props.location.state !== undefined ?
          <div className="alert alert-success alert-dismissible fadeOut" role="alert" id="success-alert">
            <strong>{props.location.state.message}</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> : null}

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
