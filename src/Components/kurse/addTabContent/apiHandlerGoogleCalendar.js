import GoogleCalendar from "../../admin/GCContent";
import { SEVERITY } from '../../Snackbar/SnackbarSeverity';

const creds = {
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
}

export async function syncGoogleCalendar(action, appointmentData, googleCalendar, gcID, handleResponse, showSnackbar) {
  const gapi = window.gapi ;
  gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: googleCalendar.apiKey,
        clientId: googleCalendar.clientId,
        discoveryDocs: creds.discoveryDocs,
        scope: creds.scope,
      })
      gapi.client.load('calendar', 'v3')


    if (action != "load") {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        handleAction(action, appointmentData, gapi, handleResponse, googleCalendar, gcID, showSnackbar);
      } else {
        gapi.auth2.getAuthInstance().signIn().then(function (response) {
          handleAction(action, appointmentData, gapi, handleResponse, googleCalendar, gcID, showSnackbar);
        }, function (error) {
          handleResponse();
        });

      }
    } else {
      handleAction(action, appointmentData, gapi, handleResponse, googleCalendar, gcID, showSnackbar);
    }
  })
}

function handleAction(action, appointmentData, gapi, handleResponse, googleCalendar, gcID, showSnackbar) {
  switch (action) {
    case "delete":
      handleAppointmentDelete(appointmentData, gapi, gcID, showSnackbar);
      break;
    case "change":
      handleAppointmentChange(appointmentData, gapi, gcID, showSnackbar);
      break;
    case "insert":
      handleAppointmentInsert(appointmentData, gapi, handleResponse, gcID, showSnackbar);
      break;
    case "load":
      handleAppointmentsLoad(gapi, handleResponse, googleCalendar, gcID, showSnackbar);
      break;
  }
}

function handleAppointmentsLoad(gapi, handleResponse, googleCalendar, gcID, showSnackbar) {
  let success = false; 

  const PUBLIC_KEY = googleCalendar.apiKey,//googleCalendar.apiKey,
    CALENDAR_ID = gcID;
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
        showSnackbar('Kalender erfolgreich geladen.', SEVERITY.SUCCESS);
        return (appointments.items);        
      }
    }, 600);
  })
}

function handleAppointmentDelete(deleteAppointmentId, gapi, gcID, showSnackbar) {

  var request = gapi.client.calendar.events.delete({
    'calendarId': gcID,
    'eventId': deleteAppointmentId
  });

  request.execute(function (response) {
    if (response.error || response == false) {
      showSnackbar('Löschen fehlgeschlagen. Neuladen der Seite erforderlich.', SEVERITY.ERROR);
    } else {
      showSnackbar('Vorlesung erfolgreich gelöscht.', SEVERITY.SUCCESS);
    }
  });
}

function handleAppointmentInsert(insertAppointmentData, gapi, handleResponse, gcID, showSnackbar) {
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
    'calendarId': gcID,
    'resource': event
  });

  request.execute(function (response) {
    if (response.error || response == false) {
      showSnackbar('Einfügen fehlgeschlagen. Neuladen der Seite erforderlich.', SEVERITY.ERROR);
    } else {
      showSnackbar('Vorlesung erfolgreich eingefügt.', SEVERITY.SUCCESS);
    }
  });
}

function handleAppointmentChange(changedAppointmentData, gapi, gcID, showSnackbar) {
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
    'calendarId': gcID,
    'eventId': changedAppointmentData.gcId,
    'resource': event1
  });

  request.execute(function (response) {
    if (response.error || response == false) {
      showSnackbar('Änderung fehlgeschlagen. Neuladen der Seite erforderlich.', SEVERITY.ERROR);
    } else {
      showSnackbar('Vorlesung erfolgreich geändert.', SEVERITY.SUCCESS);
    }
  });
}