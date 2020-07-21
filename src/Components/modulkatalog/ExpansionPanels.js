import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { APICall } from '../../helper/Api';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    const onDelete = (event) => {
        let id = event.currentTarget.id
        APICall("DELETE", "/moduleGroups", {}, { 'moduleGroupId': id }).then(
            history.push("/modulkatalog") //details/
        )
    }
    return (
        <div className={classes.root}>
            {(props.moduleGroups).map((moduleGroup, i) =>

                <ExpansionPanel key={i}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{moduleGroup.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {moduleGroup.Modules.map((module, j) =>
                            <Grid container key={i + ":" + j}>
                                <Grid item sm={12} md={6} lg={4}>
                                    <div className={classes.block}>
                                        <Typography variant='h6'>Modulinfos</Typography>
                                        <Typography>Semester: <span>{moduleGroup.from_semester_number} bis {moduleGroup.to_semester_number}</span></Typography>
                                        <Typography>Voraussetzung für Teilnahme:
                                    <span> {module.requirements} </span>
                                        </Typography>
                                        <Typography>Modulart: <span> {moduleGroup.number_of_modules_to_attend < moduleGroup.Modules.length ? "Wahlmodul" : "Pflichtmodul"} </span></Typography>
                                        <Typography>Prüfungsleistung: {(module.AcademicRecords).map((acRec, a) => <span key={i + ":" + j + ":" + a}>{acRec.type}{a + 1 < module.AcademicRecords.length ? ", " : ""} </span>)}</Typography>
                                        <Typography>Benotet: <span>{module.rated === true ? "Ja" : "Nein"}</span></Typography>
                                        <Typography>ECTS-Punkte: <span> {module.ects} </span> </Typography>
                                    </div>
                                </Grid>
                                <Grid item sm={12} md={6} lg={4}>
                                    <div className={classes.block}>
                                        <Typography variant='h6'>Lehr- und Lerninhalte </Typography>

                                        {(module.Lectures).map((lecture, k) => <div key={i + ":" + j + ":" + k}>
                                            <Typography>{k + 1}. {lecture.name}:</Typography>
                                            <Typography style={{ textIndent: '1.2em' }}>Präsenzzeit: <span> {lecture.workload_dhbw} </span></Typography>
                                            <Typography style={{ textIndent: '1.2em' }}> Selbststudium: <span> {lecture.workload_home} </span></Typography>
                                        </div>)}
                                    </div>
                                </Grid>
                                <Grid item sm={12} md={6} lg={4}>
                                    <div className={classes.block}>
                                        <Typography variant='h6'>Workload </Typography>
                                        <Typography>Gesamt: <span>{
                                            module.Lectures.reduce((a, b) => a + (parseInt(b["workload_dhbw"]) || 0), 0) +
                                            module.Lectures.reduce((a, b) => a + (parseInt(b["workload_home"]) || 0), 0)
                                        }h</span></Typography>
                                        <Typography style={{ textIndent: '1.2em' }}>Präsenzzeit: {
                                            module.Lectures.reduce((a, b) => a + (parseInt(b["workload_dhbw"]) || 0), 0)
                                        }h</Typography>
                                        <Typography style={{ textIndent: '1.2em' }}>Selbststudium: {
                                            module.Lectures.reduce((a, b) => a + (parseInt(b["workload_home"]) || 0), 0)
                                        }h</Typography>
                                    </div>
                                </Grid>
                                <Grid item sm={12} xl={12}>
                                    <Button onClick={onDelete} id={moduleGroup.moduleGroup_id} variant="contained" color="primary" startIcon={<DeleteIcon />} size="small">Modul löschen</Button>
                                </Grid>
                            </Grid>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>


            )}
        </div>
    )
}

export default ExpansionPanels
