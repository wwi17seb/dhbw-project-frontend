import React from 'react'
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ExpansionPanels from './ExpansionPanels'
import ApiHandler from '../../helper/Api';
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

    const [moduleGroups, setModuleGroups] = React.useState([]);
    const [majorSubjectId, setMajorSubjectId] = React.useState(props.match.params.id); //the majorSubjectId is passed in the url 
    const [studyName, setStudyName] = React.useState('');


    const classes = useStyles();

    const handleAPIresponse = (response) => {
        var majorSubject = response.data.payload.MajorSubject;
        var fieldOfStudy = majorSubject.FieldOfStudy.name;
        setStudyName(`${fieldOfStudy} ${majorSubject.name} ab ${majorSubject.catalog_effective_from}`);
        if ("ModuleGroups" in response.data.payload && response.data.payload.ModuleGroups.length > 0) {
            var moduleGroups = response.data.payload.ModuleGroups;
            setModuleGroups(moduleGroups);
        }
    }

    return (
        <div className={classes.root} >
            <Nav></Nav>
            <ApiHandler url='/api/modulecatalog' handleAPIresponse={handleAPIresponse} params={{ majorSubjectId: majorSubjectId }}></ApiHandler>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Breadcrumbs style={{ marginBottom: 10 }}>
                    <Link color="inherit" href="/modulkatalog">
                        Modulkataloge
                    </Link>
                    <Typography color="textPrimary" href="/modulkatalog">
                        {studyName}
                    </Typography>
                </Breadcrumbs>
                <ExpansionPanels studyName={studyName} moduleGroups={moduleGroups} majorSubjectId={majorSubjectId} />
                <ModulAddStepper majorSubjectId={majorSubjectId} />
            </main>
        </div>

    )
}

export default ModulkatalogDetail

