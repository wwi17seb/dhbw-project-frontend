const creds = {
  clientId: "696108575064-pqp0vf98bbrklbet30qbkka6mc3io6p5.apps.googleusercontent.com",
  apiKey: "AIzaSyA5OGAMBup2tHpeQvt7EA0w2zR-3ZCQ6-0",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  secret: "p0p2e1o0qTZg7TQq_plsDl4V",
  calenderID: "iq90i34lq6v196rqs4986dp370@group.calendar.google.com"
}

export async function syncGoogleCalendar(action, appointmentData) {
  const gapi = window.gapi;
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: creds.apiKey,
      clientId: creds.clientId,
      discoveryDocs: creds.discoveryDocs,
      scope: creds.scope
    })
    gapi.client.load('calendar', 'v3', () => console.log('syncGoogleCalendar'))

    //Check if already logged in
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      handleAction(action, appointmentData, gapi);
    } else { //If not logged in yet -> login
      gapi.auth2.getAuthInstance().signIn().then(
        () => {
           handleAction(action, appointmentData, gapi);
        }
      )
    }
  })
}

function handleAction(action, appointmentData, gapi) {
  switch (action) {
    case "delete":
      handleAppointmentDelete(appointmentData, gapi);
      break;
    case "change":
      handleAppointmentChange(appointmentData, gapi);
      break;
    case "insert":
      handleAppointmentInsert(appointmentData, gapi);
      break;
    default:
      console.log("Wont happen")
  }
}

function handleAppointmentDelete(deleteAppointmentId, gapi) {

  var request = gapi.client.calendar.events.delete({
    'calendarId': creds.calenderID,
    'eventId': deleteAppointmentId
  });
  console.log(deleteAppointmentId);

  request.execute(function (response) {
    if (response.error || response == false) {
      alert('Error');
    } else {
      alert('Success');
    }
  });
}

function handleAppointmentInsert(insertAppointmentData, gapi) {
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