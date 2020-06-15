import React from 'react'
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ExpansionPanels from './ExpansionPanels'
import { API } from '../../helper/Api';

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
    React.useEffect(() => {
        const fetch = async () => {
          let response1 = await API('/api/modulecatalog');
          console.log("API request: " + response1.statusText);
        }
        fetch();
      })

    const classes = useStyles();
    var studyName = props.match.params.name; //the selected course of study 
    return (
        <div className={classes.root} >
            <Nav></Nav>
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
                <ExpansionPanels studyName={studyName}/>
            </main>
        </div>

    )
}

export default ModulkatalogDetail

