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
import MaterialTable from 'material-table';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import ReceiptIcon from '@material-ui/icons/Receipt';
import TodayIcon from '@material-ui/icons/Today';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
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
            { title: 'Vorname', field: 'vorname' },
            { title: 'Nachname', field: 'nachname' },
            { title: 'Schwerpunkt', field: 'schwerpunkt' },
            { title: 'Kontaktdaten', field: 'mail' },
            {
                title: 'Dozentennummer',
                field: 'id',
                lookup: { 1: '12345', 2: '67890', 3: '13579' },
            },
        ],
        data: [
            {
                vorname: 'Michael',
                nachname: 'Binzen',
                schwerpunkt: 'Software-Architektur',
                phone: '017653725528',
                mail: 'michael.binzen@deutschebahn.de',
                id: 1,
            },
            {
                vorname: 'Henning',
                nachname: 'Pagnia',
                schwerpunkt: 'IT-Sicherheit',
                phone: '017653725528',
                mail: 'henning.pagnia@dhbw-mannheim.de',
                id: 2,
            },
            {
                vorname: 'Michael',
                nachname: 'Spengler',
                schwerpunkt: 'Plattformen & Frameworks',
                phone: '017653725528',
                mail: 'michael.spengler@sap.com',
                id: 3,
            },
        ],
    });
    return (
    
      <div className={classes.root}>
        <AppBar style={{background: 'red'}} position="fixed" className={classes.appBar}>
      
      <Toolbar>
          <Typography variant="h6" noWrap>
            ExoPlan
          </Typography>
        </Toolbar>
        </AppBar>
        <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
                   <ListItem>
                      <ListItemIcon>
                          <Link to='/kurse'><TodayIcon></TodayIcon></Link>
                      </ListItemIcon>
                      <ListItemText>
                          <Link to='kurse'>Kurse</Link>
                      </ListItemText>
                  </ListItem>
                  <ListItem>
                      <ListItemIcon>
                          <Link to='/dozenten'><GroupIcon></GroupIcon></Link>
                      </ListItemIcon>
                      <ListItemText>
                          <Link to='/dozenten'>Dozenten</Link>
                      </ListItemText>
                  </ListItem>
                  <ListItem>
                      <ListItemIcon>
                          <Link to='/modulkatalog'><ReceiptIcon></ReceiptIcon></Link>
                      </ListItemIcon>
                      <ListItemText>
                          <Link to='/modulkatalog'>Modulkatalog</Link>
                      </ListItemText>
                  </ListItem>
              </List>
      
    </Drawer>
        <MaterialTable
            actions={[
                {
                    icon: tableIcons.Mail,
                    tooltip: 'Send Mail',
                    onClick: (event, rowData) => window.location.href = "mailto:" + rowData.mail
                }
            ]}
            icons={tableIcons}
            title="Dozenten"
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
       
       
        </div>
    )
}