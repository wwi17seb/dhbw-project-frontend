import React from 'react'
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ExpansionPanels from './ExpansionPanels'
import ApiHandler from '../../helper/Api';
import ModulAdd from './ModulAdd'
import ModulAddStepper from './ModulAddStepper';

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

function ModulkatalogDetail(props) {

    const [payload, setPayload] = React.useState([]);
    const [moduleName, setModuleName] = React.useState('');
    const [lectureSample, setLectureSample] = React.useState([]);


    const classes = useStyles();
    var studyName = props.match.params.name; //the selected course of study 

    const handleAPIresponse = (response) => {
        setPayload(response.data.payload);
        console.log(response.data.payload);
        if (typeof response.data.payload.FieldsOfStudy !== "undefined" && response.data.payload.FieldsOfStudy.length > 0) {
            setLectureSample(response.data.payload.FieldsOfStudy[0].Modules[0].Lectures);
        }
    }

    return (
        <div className={classes.root} >
            <Nav></Nav>
            <ApiHandler url='/api/modulecatalog' handleAPIresponse={handleAPIresponse} params={{ majorSubjectId: 4 }}></ApiHandler>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/modulkatalog">
                        Modulkataloge
                    </Link>
                    <Typography color="inherit" href="/modulkatalog">
                        {studyName}
                    </Typography>
                </Breadcrumbs>
                <ExpansionPanels studyName={studyName} content={lectureSample} />
                <ModulAddStepper />
            </main>
        </div>

    )
}

export default ModulkatalogDetail

