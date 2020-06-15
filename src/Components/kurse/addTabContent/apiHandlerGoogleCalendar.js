const creds = {
    clientId: "696108575064-pqp0vf98bbrklbet30qbkka6mc3io6p5.apps.googleusercontent.com",
    apiKey: "AIzaSyA5OGAMBup2tHpeQvt7EA0w2zR-3ZCQ6-0",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    secret: "p0p2e1o0qTZg7TQq_plsDl4V",
    calenderID: "iq90i34lq6v196rqs4986dp370@group.calendar.google.com"
  }

 export async function handleAddedEvent() {
    const gapi = window.gapi;
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: creds.apiKey,
            clientId: creds.clientId,
            discoveryDocs: creds.discoveryDocs,
            scope: creds.scope
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('penis'))
  
        gapi.auth2.getAuthInstance().signIn().then(
            () => {
  
              var event = {
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                  'dateTime': '2020-05-28T09:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': '2020-05-28T17:00:00-08:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=1'
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              };
  
              var request = gapi.client.calendar.events.insert({
                'calendarId': creds.calenderID,
                'resource': event
              });
              
              request.execute(function(event) {
                console.log("Events wurden angelegt");
              });
  
            }
        )
    })
  }