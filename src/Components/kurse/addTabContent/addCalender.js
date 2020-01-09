import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomStore from 'devextreme/data/custom_store';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, MonthView, Appointments, ViewSwitcher, Toolbar, DayView, WeekView, AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 0,
        minWidth: 150,
    },
}));

function getData(_, requestOptions) {
    const PUBLIC_KEY = 'AIzaSyCJrp1GqmuLYSGdv_z-ZVSe2Sl2tLvY8LA',
      CALENDAR_ID = 'iq90i34lq6v196rqs4986dp370@group.calendar.google.com';
    const dataUrl = [ 'https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');
  
    return fetch(dataUrl, requestOptions).then(
      (response) => response.json()
    ).then((data) => data.items);
  }
  
  const dataSource = new CustomStore({
    load: (options) => getData(options, { showDeleted: false })
  });
const currentDate = new Date(2019, 11, 23);
const views = ['day', 'workWeek', 'month'];

const AddCalender = () => {
    const classes = useStyles();
    return (
      <Paper>
        <Scheduler
          data={[
            { startDate: '2020-1-9 7:00', endDate: '2020-1-9 8:00', title: 'Test' },
            { startDate: '2020-1-9 5:00', endDate: '2020-1-9 6:30', title: 'Go to a gym' },
            ]}
          views={views}
          defaultCurrentView="workWeek"
          defaultCurrentDate={currentDate}
          height={500}
          startDayHour={7}
          editing={true}
          showAllDayPanel={false}
          startDateExpr="start.dateTime"
          endDateExpr="end.dateTime"
          textExpr="summary"
          timeZone="Europe/Berlin">
          <ViewState
            defaultCurrentDate="2020-01-09"
            defaultCurrentViewName="Month"/>
          <DayView
            startDayHour={9}
            endDayHour={18}/>
          <WeekView
            startDayHour={9}
            endDayHour={19}/>
          <MonthView
            startDayHour={9}
            endDayHour={19}/>
          <Appointments />
          <AppointmentTooltip />
          <Toolbar />
          <ViewSwitcher />
        </Scheduler>
        </Paper>
    )
}

export default AddCalender
