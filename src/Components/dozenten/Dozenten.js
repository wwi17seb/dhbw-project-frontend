import React, { Component } from 'react';
import mail from '../../mail.svg';
import remove from '../../delete.svg';
import edit from '../../edit.svg';
import './dozenten.css';
import { enumDeclaration } from '@babel/types';

class Dozenten extends Component {
    render() {
        return (
            <table>
                <tr className="tableHeaderRow">
                    <td>Dozent/in</td>
                    <td>Schwerpunkt</td>
                    <td>Aktion</td>
                </tr>
                <tr>
                    <td>
                        Max Mustermann <br/>
                        Tel: 0176 53725528 <br/>
                        max.mustermann@dhbw-mannnheim.de
                    </td>
                    <td>
                        Software-Architektur
                    </td>
                    <td>
                        <img src={mail} alt="mail" height="25px" />
                        <img src={edit} alt="edit" height="25px" />
                        <img src={remove} alt="remove" height="25px" />
                    </td>
                </tr>
                <tr>
                <td>
                        Max Mustermann <br/>
                        Tel: 0176 53725528 <br/>
                        max.mustermann@dhbw-mannnheim.de
                    </td>
                    <td>
                        IT-Sicherheit
                    </td>
                    <td>
                        <img src={mail} alt="mail" height="25px" />
                        <img src={edit} alt="edit" height="25px" />
                        <img src={remove} alt="remove" height="25px" />
                    </td>
                </tr>
                <tr>
                <td>
                        Max Mustermann <br/>
                        Tel: 0176 53725528 <br/>
                        max.mustermann@dhbw-mannnheim.de
                    </td>
                    <td>
                        Plattformen & Frameworks
                    </td>
                    <td>
                        <img src={mail} alt="mail" height="25px" />
                        <img src={edit} alt="edit" height="25px" />
                        <img src={remove} alt="remove" height="25px" />
                    </td>
                </tr>
            </table>
        )
    }
}

export default Dozenten
