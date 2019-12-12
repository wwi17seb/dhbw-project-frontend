import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import mail from '../../mail.svg';
import remove from '../../delete.svg';
import edit from '../../edit.svg';
import './dozenten.css';
import MaterialTable from 'material-table';
import { enumDeclaration } from '@babel/types';


export default function MaterialTableDemo() {
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