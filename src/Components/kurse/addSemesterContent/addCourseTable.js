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
import MaterialTable from 'material-table';
import Nav from '../../nav/Nav';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 0,
        minWidth: 150,
    },
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
            { title: 'Module', field: 'Module', lookup: {1: 'Grundlagen der BWL', 2: 'Plattformen & Frameworks', 3: 'Projekt'} },
            { title: 'SWS', field: 'SWS', type: 'numeric'},
            { title: 'Kursleistung', field: 'Kursleistung' },
            { title: 'Dozent', field: 'lecturer' },
            { title: 'Status', field: 'Status' },
        ],
      data: [
            {
            Module: 1,
            SWS: '40',
            Kursleistung: 'K oder SE',
            lecturer: 'Max Mustermann',
            Status: 'angeschrieben',
        },
        {
            Module: 2,
            SWS: '35',
            Kursleistung: 'K oder SE',
            lecturer: 'Erika Musterfrau',
            Status: 'Termine eingetragen',
        },
        {
            Module: 3,
            SWS: '25',
            Kursleistung: 'P',
            lecturer: 'Dozent suchen ',
            Status: 'bestätigt',
        }
        ], 
    });
    return (
    
      <div className={classes.root}>
          <Nav></Nav>
          <main className = {classes.content}>
          <div className = {classes.toolbar}/>
        <MaterialTable
            actions={[
                {
                    icon: tableIcons.Mail,
                    tooltip: 'Send Mail',
                    onClick: (event, rowData) => window.location.href = "mailto:" + rowData.mail
                }
            ]}
            icons={tableIcons}
            title=""
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
       
       </main>
        </div>
    )
}
/*
handleLecturerLoad = (event) => {
    event.preventDefault();
    

    axios.get('/lecturers', data)
        .then(res => {
            onRowAdd: newData =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    });
                }, 600);
            })
        })
        .catch(err => {
            this.setState({ error: err.response.data.message })
        });
}
*/