import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '1rem',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    block: {
        margin: '2rem',
    },
    icon: {
        marginLeft: '0.5rem'
    }
}));

function ExpansionPanels(props) {
    const classes = useStyles();
    var studyName = props.studyName;
    var example = "";
    if (typeof props.content !== "undefined" && props.content !== null && props.content.length > 0) {
        example = Object.values(props.content[0]).toString();
    }
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Grundlagen in BWL</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item sm={12} md={6} lg={4}>
                            <div className={classes.block}>
                                <Typography variant='h6'>Modulinfos<CreateIcon className={classes.icon} /></Typography>
                                <Typography>Semester: <span>Data</span></Typography>
                                <Typography>Voraussetzung für Teilnahme: <span>Data</span></Typography>
                                <Typography>Modulart: ...</Typography>
                                <Typography>Prüfungsleistung: ...</Typography>
                                <Typography>Benotet: ...</Typography>
                                <Typography>ECTS-Punkte: ...</Typography>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <div className={classes.block}>
                                <Typography variant='h6'>Lehr- und Lerninhalte<CreateIcon className={classes.icon} /></Typography>
                                <Typography>1. Einführung in die BWL: <span>Data</span></Typography>
                                <Typography>Präsenzzeit:</Typography>
                                <Typography>Selbststudium: ...</Typography>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <div className={classes.block}>
                                <Typography variant='h6'>Workload<CreateIcon className={classes.icon} /></Typography>
                                <Typography>insgesamt: <span>Data</span></Typography>
                                <Typography>Präsenzzeit:</Typography>
                                <Typography>Selbststudium: ...</Typography>
                            </div>
                        </Grid>
                        <Grid item sm={12} xl={12}>
                            <Button variant="contained" color="primary" startIcon={<DeleteIcon />} size="small">Modul löschen</Button>
                            <Typography>
                                Backend Test: {studyName}
                            </Typography>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Grundlagen der Rechnungslegung</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item sm={12} md={6} lg={4}>
                            <div className={classes.block}>
                                <Typography variant='h6'>Modulinfos<CreateIcon className={classes.icon} /></Typography>
                                <Typography>Semester: <span>Data</span></Typography>
                                <Typography>Voraussetzung für Teilnahme: <span>Data</span></Typography>
                                <Typography>Modulart: ...</Typography>
                                <Typography>Prüfungsleistung: ...</Typography>
                                <Typography>Benotet: ...</Typography>
                                <Typography>ECTS-Punkte: ...</Typography>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <div className={classes.block}>
                                <Typography variant='h6'>Lehr- und Lerninhalte<CreateIcon className={classes.icon} /></Typography>
                                <Typography>1. Einführung in die BWL: <span>Data</span></Typography>
                                <Typography>Präsenzzeit:</Typography>
                                <Typography>Selbststudium: ...</Typography>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <div className={classes.block}>
                                <Typography variant='h6'>Workload<CreateIcon className={classes.icon} /></Typography>
                                <Typography>insgesamt: <span>Data</span></Typography>
                                <Typography>Präsenzzeit:</Typography>
                                <Typography>Selbststudium: ...</Typography>
                            </div>
                        </Grid>
                        <Grid item sm={12} xl={12}>
                            <Button variant="contained" color="primary" startIcon={<DeleteIcon />} size="small">Modul löschen</Button>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default ExpansionPanels
