import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StudienrichtungAuswahl from './studienrichtungauswahl'

const useStyles = makeStyles(theme => ({
    formControl: {
        marginRight: 20,
        minWidth: 150,
    },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
export default function StudiengangAuswahl({ data }) {
    const classes = useStyles();

    //TODO: dynamisches anfragen der Studiengänge
    const studiengangAuswahl = []
    const [studiengang, setStudiengang] = React.useState('');
    const [state, setState] = React.useState(data);

    React.useEffect(() => {
        if (state !== data) {
            setState(data)
        }
    }, [state, setState, data]);

    const handleChange = event => {
        setStudiengang(event.target.value);
    };
    //hinzufügen der MenuItems anhand der List mit Studiengängen
    if (data !== null) {
        for (var i = 0; i < data["payload"]["FieldsOfStudy"].length; i++) {
            var gang = data["payload"]["FieldsOfStudy"][i]["name"]
            studiengangAuswahl.push(<MenuItem key={i} value={gang}>{gang}</MenuItem>);
        }
    }


    return (
        <React.Fragment>
            <FormControl required className={classes.formControl}>
                <InputLabel id="studiengang-label">Studiengang</InputLabel>
                <Select
                    labelId="studiengang-label"
                    id="studiengang-select"
                    value={studiengang}
                    onChange={handleChange}
                >
                    {studiengangAuswahl}
                </Select>
            </FormControl>
            <StudienrichtungAuswahl studiengang={studiengang} data={data}></StudienrichtungAuswahl>
        </React.Fragment>
    )
}
