import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './dozenten.css';
import Nav from '../nav/Nav';
import LecturerList from './lecturerlist'
import DozentenDetails from './dozentendetails/dozentendetails'
import { Route, BrowserRouter as Router } from 'react-router-dom'


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

export default function DozentenTable() {
    const classes = useStyles();
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
        Mail: forwardRef((props, ref) => <MailOutlineIcon {...props} ref={ref} />)
    }
    const [state, setState] = React.useState({
        columns: [
            { title: 'Vorname', field: 'firstname' },
            { title: 'Nachname', field: 'lastname' },
            { title: 'Schwerpunkt', field: 'experience' },
            { title: 'Kontaktdaten', field: 'email' },
            {
                title: 'Dozentennummer',
                field: 'lecturer_id',
                lookup: { 1: '12345', 2: '67890', 3: '13579' },
            },
        ],
        data: [
            {
                lecturer_id: '1',
                firstname: 'Michael',
                lastname: 'Binzen',
                academic_title: '',
                email: 'michael.binzen@deutschebahn.de',
                salutation: 'Herr',
                phonenumber: '017653725528',
                experience: 'Software Engineering',
                comment: '',
                is_extern: ''
            },
            {
                lecturer_id: '2',
                firstname: 'Henning',
                lastname: 'Pagnia',
                academic_title: '',
                email: 'henning.pagnia@dhbw-mannheim.de',
                salutation: 'Herr',
                phonenumber: '017653725528',
                experience: 'IT-Security',
                comment: '',
                is_extern: ''
            },
            {
                lecturer_id: '3',
                firstname: 'Michael',
                lastname: 'Spengler',
                academic_title: '',
                email: 'michael.spengler@sap.com',
                salutation: 'Herr',
                phonenumber: '017653725528',
                experience: 'Plattformen und Frameworks',
                comment: '',
                is_extern: ''
            }
        ],
    });
    return (

        <div className={classes.root}>
            <Nav></Nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path="/dozenten" component={LecturerList} />
                <Route path="/dozenten/details" component={DozentenDetails} />
            </main>
        </div>
    )
}
