import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { TodayButton, DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {syncGoogleCalendar, handleAppointmentsLoad} from './apiHandlerGoogleCalendar';
import AppointmentFormContainerBasic from './gcAppointmentForm';

 let appointments = [];

function formatData(calendarData) {
  appointments = [];

  for (let i = 0; i < calendarData.length; i++) {
    let appointment = {
      title: 'No title given',
      startDate: undefined,
      endDate: undefined,
      location: 'No location given',
      id: i,
      gcId: 'test',
    };

    if (calendarData[i].location) {
      appointment.location = calendarData[i].location;
    }

    if (calendarData[i].summary) {
      appointment.title = calendarData[i].summary;
    }

    if (calendarData[i].id) {
      appointment.gcId = calendarData[i].id;
    }

    let startDateString = calendarData[i].start.dateTime;
    appointment.startDate = new Date(startDateString);

    let endDateString = calendarData[i].end.dateTime;
    appointment.endDate = new Date(endDateString);

    appointments.push(appointment);
  }
  return appointments;
}

const containerStyles = (theme) => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
});

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(
  AppointmentFormContainerBasic
);

const styles = (theme) => ({
  addButton: {
    float: 'right',
    marginTop: '1vh',
  },
});


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '-' + dd + '-' + yyyy;

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#5c6971",
      borderRadius: "8px"
    }}
  >
    {children}
  </Appointments.Appointment>
);

/* eslint-disable-next-line react/no-multi-comp */
class GoogleCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: today,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
      dataReady: false,
      googleCalender: props.calendar               // get those 2 to apihandlerGoogleClaendar as creds
      //gcId: props.selectedCourse.google_calendar_id get those 2 to apihandlerGoogleClaendar as creds
    };
    this.loadData = this.loadData.bind(this);
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      this.currentDateChange = (currentDate) => {
        this.setState({ currentDate });
      };

      const currentAppointment =
        data.filter((appointment) => editingAppointment && appointment.id === editingAppointment.id)[0] ||
        addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }
  componentDidMount(){
    this.loadData(); 
  }

  handleResponse = (response) => {
    this.setState({
      data : formatData(response),
      dataReady: true
    })
  }

  loadData() {
    syncGoogleCalendar("load", " ", this.state.googleCalender, this.handleResponse); 
  }

  componentDidUpdate() {
    this.appointmentForm.update();
    console.log(this.appointmentForm)
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter((appointment) => appointment.id !== deletedAppointmentId);
      /** Google Calendar Delete */
      syncGoogleCalendar('delete', data[deletedAppointmentId].gcId, this.state.googleCalender);
      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        syncGoogleCalendar('insert', added, this.state.googleCalender);
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );

        if (changed[state.editingAppointment.id].title === undefined) {
          data[state.editingAppointment.id].startDate = changed[state.editingAppointment.id].startDate;
          data[state.editingAppointment.id].endDate = changed[state.editingAppointment.id].endDate;
          syncGoogleCalendar('change', data[state.editingAppointment.id], this.state.googleCalender);
        } else {
          syncGoogleCalendar('change', changed[state.editingAppointment.id], this.state.googleCalender);
        }
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      dataReady,
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;

    if (!dataReady) {
      return <p>Loading...</p>;
    } else {
      return (
        <Paper>
          <Scheduler
            data={data}
            height={700}
            firstDayOfWeek={1}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <EditingState
              onCommitChanges={this.commitChanges}
              onEditingAppointmentChange={this.onEditingAppointmentChange}
              onAddedAppointmentChange={this.onAddedAppointmentChange}
            />
            <WeekView
              startDayHour={startDayHour}
              endDayHour={endDayHour}
            />
            <MonthView />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              showOpenButton
              showCloseButton
              showDeleteButton
            />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <TodayButton />
            <AppointmentForm
              overlayComponent={this.appointmentForm}
              visible={editingFormVisible}
              onVisibilityChange={this.toggleEditingFormVisibility}
            />
            <DragDropProvider />
          </Scheduler>

          <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogContent>
              <DialogContentText>Are you sure you want to delete this appointment?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleConfirmationVisible} color='primary' variant='outlined'>
                Cancel
              </Button>
              <Button onClick={this.commitDeletedAppointment} color='secondary' variant='outlined'>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => {
              this.setState({ editingFormVisible: true });
              this.onEditingAppointmentChange(undefined);
              this.onAddedAppointmentChange({
                startDate: new Date(currentDate).setHours(startDayHour),
                endDate: new Date(currentDate).setHours(startDayHour + 1),
              });
            }}
          >
            Vorlesung im Kalender eintragen
          </Button>
        </Paper>
      );
    }
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(GoogleCalendar);
