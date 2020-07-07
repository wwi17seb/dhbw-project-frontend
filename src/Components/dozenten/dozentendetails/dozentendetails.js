import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Profile from './profile';
import Lehre from './lehre';
import Vita from './vita';
import Notizen from './notizen';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link1 from '@material-ui/core/Link';
import { Link } from "react-router-dom";
import { APICall } from '../../../helper/Api';



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


export default function DozentenDetails() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(null);
    const [name, setName] = React.useState("Loading...");
    const [disabled, setDisabled] = React.useState(true)
    const [currentDirector, setCurrentDirector] = React.useState("")


    const loadDirector = () => {
        APICall('GET', 'directorOfStudies').then(res => {
            setCurrentDirector(res.data.payload["DirectorOfStudies"]["username"])
        })
    }


    useEffect(() => {
        if (data !== null) {
            if (!data["allow_manipulation"]) {
                if (data["DirectorOfStudies"]["username"] === currentDirector) {
                    setDisabled(false)
                } else {
                    setDisabled(true)
                }
            } else {
                setDisabled(false)
            }
        }
    }, [currentDirector, data])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const printIntExt = (intext) => {
        if (intext) {
            return ("extern")
        } else {
            return ("intern")
        }
    }

    const getCurrentIdFromURL = () => {
        const currentURL = window.location.href
        const splittedURL = currentURL.split("/")

        return (splittedURL[4])
    }

    const finalTabLabels = [];
    const finalTabPanels = [];
    const tabLabels = ["Profil", "Lehre", "Vita", "Notizen"];

    const loadData = () => {
        const id = getCurrentIdFromURL()

        APICall('GET', 'lecturers').then((res) => {
            for (var i = 0; i < res.data.payload.Lecturers.length; i++) {
                if (res.data.payload.Lecturers[i]["lecturer_id"] == id) {
                    setData(res.data.payload.Lecturers[i])
                    break;
                }
            }
            loadDirector()
        });
    }

    if (data === null) {
        loadData()
    }

    useEffect(() => {
        if (data !== null) {
            var title = data["academic_title"]
            if (title === null) {
                title = ""
            }
            setName(title + " " + data["firstname"] + " " + data["lastname"] + " (" + printIntExt(data["is_extern"]) + ")")
        }
    }, [data])

    const finalPanelContent = [<Profile data={data}></Profile>, <Lehre></Lehre>, <Vita data={data} editDisabled={disabled} ></ Vita>, <Notizen data={data} editDisabled={disabled}></Notizen>];
    let tabIndex = 0;

    for (let tabLabel of tabLabels) {
        finalTabLabels.push(<Tab key={tabIndex} label={tabLabel} {...a11yProps({ tabIndex })} />);
        finalTabPanels.push(<TabPanel style={{ paddingTop: 10 }} key={tabIndex} value={value} index={tabIndex}> {finalPanelContent[tabIndex]} </TabPanel>)
        tabIndex++;
    }

    return (
        <div>
            <Breadcrumbs style={{ marginBottom: 10 }}>
                <Link1 color="inherit" to="/dozenten" component={Link}>
                    Dozenten
                </Link1>
                <Typography color="textPrimary">{name}</Typography>
            </Breadcrumbs>
            <Typography variant="h4">{name}</Typography>
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
        </div >



    );
}
