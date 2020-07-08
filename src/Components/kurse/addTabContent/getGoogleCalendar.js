import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AddCalendar from './addCalendar'
import ApiHandler from '../../../helper/Api';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 0,
        minWidth: 150,
    },
}));

function GetGoogleCalendar(props){

    const [googleCalendar, setGoogleCalendar] = React.useState(null);

    function handleAPIresponse(response){
        if(response.status == 200){
           // if(response.data.payload.GoogleCalendar)
            setGoogleCalendar(response.data.payload.GoogleCalendar);
        }
    }
    
    if(googleCalendar !==null){
        return <AddCalendar {...props} calendar={googleCalendar}/>
    }else {
        return  <ApiHandler url='/api/googleCalendar' handleAPIresponse={handleAPIresponse}/>; 
    }
}

export default GetGoogleCalendar;
