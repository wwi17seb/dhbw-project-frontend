import GoogleCalendar from "../../admin/GCContent";

const creds = {
  clientId: "696108575064-pqp0vf98bbrklbet30qbkka6mc3io6p5.apps.googleusercontent.com",
  apiKey: "AIzaSyA5OGAMBup2tHpeQvt7EA0w2zR-3ZCQ6-0",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  calenderID: 'iq90i34lq6v196rqs4986dp370@group.calendar.google.com' //"cefk6hvf4f82ltu9pnnr31rd1o@group.calendar.google.com" // '
}

export async function syncGoogleCalendar(action, appointmentData, googleCalender, handleResponse) {
  const gapi = window.gapi;
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: googleCalender.apiKey,
      clientId: googleCalender.clientId,
      discoveryDocs: creds.discoveryDocs,
      scope: creds.scope
    })
    gapi.client.load('calendar', 'v3')


    if (action != "load") {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        handleAction(action, appointmentData, gapi, handleResponse, googleCalender);
      } else {
        gapi.auth2.getAuthInstance().signIn().then(function (response) {

          handleAction(action, appointmentData, gapi, handleResponse, googleCalender);
        }, function (error) {
          handleResponse();
        });

      }
    } else {
      handleAction(action, appointmentData, gapi, handleResponse, googleCalender);
    }
  })
}

function handleAction(action, appointmentData, gapi, handleResponse, googleCalender) {
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
      handleAppointmentsLoad(gapi, handleResponse, googleCalender);
      break;
  }
}

function handleAppointmentsLoad(gapi, handleResponse, googleCalender) {

  const PUBLIC_KEY = googleCalender.apiKey,
    CALENDAR_ID = 'iq90i34lq6v196rqs4986dp370@group.calendar.google.com';
  const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
    CALENDAR_ID, '/events?key=', PUBLIC_KEY
  ].join('');

  fetch(dataUrl).then(
    (response) => response.json()
  ).then((appointments) => {
    setTimeout(() => {
      handleResponse(appointments.items);
      return (appointments.items)
    }, 600);
  })
}
/*
function handleAppointmentsLoad(gapi, handleResponse) {

  var request = gapi.client.calendar.events.list({
    'calendarId': creds.calenderID
  })

  request.execute(function (response) {
    if (response.error || response == false) {
      alert('Error');
      return "Error";
    } else {
      handleResponse(response.items);
      return response;
    }
  });

}
*/
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
      alert('Error');
    } else {
      handleResponse();
      alert('Success');
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