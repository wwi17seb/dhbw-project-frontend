import React, { forwardRef } from 'react';
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


export default function DozentenTable() {
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
    )
}