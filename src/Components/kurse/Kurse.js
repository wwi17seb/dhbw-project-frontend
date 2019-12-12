import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './kurse.css'

class Kurse extends Component {
    render() {
        return (
            <Tabs>
                <TabList className="tabList">
                    <Tab>Übersicht</Tab>
                    <Tab>WWI 17 SEB</Tab>
                    <Tab>WWI 18 SEA</Tab>
                    <Tab>Kurs hinzufügen</Tab>
                </TabList>
                <TabPanel>
                    <h2>Google Calendar Einbindung mit allen Kursen</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Google Calendar nur mit Terminen von WWI 17 SEB</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Google Calendar nur mit Terminen von WWI 18 SEA</h2>
                </TabPanel>
                <TabPanel>
                </TabPanel>
            </Tabs>
        )
    }
}

export default Kurse
