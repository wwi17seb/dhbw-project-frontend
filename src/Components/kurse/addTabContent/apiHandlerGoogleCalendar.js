import GoogleCalendar from "../../admin/GCContent";
import showSnackbar from "./addCalendar";

const creds = {
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  calenderID: 'iq90i34lq6v196rqs4986dp370@group.calendar.google.com' //"cefk6hvf4f82ltu9pnnr31rd1o@group.calendar.google.com" // '
}

export async function syncGoogleCalendar(action, appointmentData, googleCalendar, handleResponse) {
  const gapi = window.gapi ;
  gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: googleCalendar.apiKey,
        clientId: googleCalendar.clientId,
        discoveryDocs: creds.discoveryDocs,
        scope: creds.scope
      })
      gapi.client.load('calendar', 'v3')


    if (action != "load") {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        handleAction(action, appointmentData, gapi, handleResponse, googleCalendar);
      } else {
        gapi.auth2.getAuthInstance().signIn().then(function (response) {
          handleAction(action, appointmentData, gapi, handleResponse, googleCalendar);
        }, function (error) {
          handleResponse();
        });

      }
    } else {
      handleAction(action, appointmentData, gapi, handleResponse, googleCalendar);
    }
  })
}

function handleAction(action, appointmentData, gapi, handleResponse, googleCalendar) {
  
  console.log("testtest",action);
  switch (action) {
    case "delete":
      handleAppointmentDelete(appointmentData, gapi);
      break;
    case "change":
      handleAppointmentChange(appointmentData, gapi);
      break;
    case "insert":
      handleAppointmentInsert(appointmentData, gapi, handleResponse);
      break;
    case "load":
      handleAppointmentsLoad(gapi, handleResponse, googleCalendar);
      break;
  }
}

function handleAppointmentsLoad(gapi, handleResponse, googleCalendar) {
  let success = false; 

  const PUBLIC_KEY = googleCalendar.apiKey,//googleCalendar.apiKey,
    CALENDAR_ID = 'iq90i34lq6v196rqs4986dp370@group.calendar.google.com';
  const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
    CALENDAR_ID, '/events?key=', PUBLIC_KEY
  ].join('');

  fetch(dataUrl).then(
    (response) => {
      if(response.status !== 200){
        handleResponse("failedLoad");
        success = false;
        return response.json();  
      }else{
        success = true; 
        return response.json();
      }
    }).then((appointments) => {
    setTimeout(() => {
      if(success === true){
        handleResponse(appointments.items);
        return (appointments.items);        
      }
    }, 600);
  })
}

function handleAppointmentDelete(deleteAppointmentId, gapi) {

  var request = gapi.client.calendar.events.delete({
    'calendarId': creds.calenderID,
    'eventId': deleteAppointmentId
  });

  request.execute(function (response) {
    if (response.error || response == false) {
      alert('Error');
    } else {
      alert('Success');
    }
  });
}

function handleAppointmentInsert(insertAppointmentData, gapi, handleResponse) {
  let event = {
    'summary': insertAppointmentData.title,
    'location': insertAppointmentData.location,
    'description': insertAppointmentData.notes,
    'start': {
      'dateTime': new Date(insertAppointmentData.startDate),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'end': {
      'dateTime': new Date(insertAppointmentData.endDate),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
  }

  var request = gapi.client.calendar.events.insert({
    'calendarId': creds.calenderID,
    'resource': event
  });

  request.execute(function (response) {
    if (response.error || response == false) {
      handleResponse("errorSnackbar");
    } else {
      handleResponse();
      handleResponse("successSnackbar");
    }
  });
}

function handleAppointmentChange(changedAppointmentData, gapi) {
  var event1 = {
    'summary': changedAppointmentData.title,
    'location': changedAppointmentData.location,
    'description': changedAppointmentData.notes,
    'start': {
      'dateTime': new Date(changedAppointmentData.startDate),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'end': {
      'dateTime': new Date(changedAppointmentData.endDate),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
  }

  var request = gapi.client.calendar.events.update({
    'calendarId': creds.calenderID,
    'eventId': changedAppointmentData.gcId,
    'resource': event1
  });

  request.execute(function (response) {
    if (response.error || response == false) {
      alert('Error');
    } else {
      alert('Success');
    }
  });
}