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
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
//import {handleAppointmentDelete, handleAppointmentInsert, handleAppointmentChange} from './apiHandlerGoogleCalendar';
import { syncGoogleCalendar } from './apiHandlerGoogleCalendar';

let appointments = [];

function formatData(calendarData) {
  appointments = [];

  for (let i = 0; i < calendarData.length; i++) {
    //let test = new Appointment("No title given", undefined, undefined, undefined, "No location given");
    let test = {
      title: 'No title given',
      startDate: undefined,
      endDate: undefined,
      location: 'No location given',
      id: i,
      gcId: 'test',
    };

    if (calendarData[i].location) {
      test.location = calendarData[i].location;
    }

    if (calendarData[i].summary) {
      test.title = calendarData[i].summary;
    }

    if (calendarData[i].id) {
      test.gcId = calendarData[i].id;
    }
    //test.id = calendarData[i].id;

    let startDateString = calendarData[i].start.dateTime;
    test.startDate = new Date(startDateString);

    let endDateString = calendarData[i].end.dateTime;
    test.endDate = new Date(endDateString);

    appointments.push(test);
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

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const { classes, visible, visibleChange, appointmentData, cancelAppointment, target, onHide } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    /*aktuelles Appointment
        console.log(appointmentData)*/
    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const textEditorProps = (field) => ({
      variant: 'outlined',
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value,
        }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = (field) => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
        }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay visible={visible} target={target} fullSize onHide={onHide}>
        <div>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges}>
              <Close color='action' />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color='action' />
              <TextField {...textEditorProps('title')} />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color='action' />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker label='Start Date' {...pickerEditorProps('startDate')} />
                <KeyboardDateTimePicker label='End Date' {...pickerEditorProps('endDate')} />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color='action' />
              <TextField {...textEditorProps('location')} />
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color='action' />
              <TextField {...textEditorProps('notes')} multiline rows='6' />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant='outlined'
                color='secondary'
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}>
                Delete
              </Button>
            )}
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}>
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

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

/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent {
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

  /* componentDidMount() {
    const PUBLIC_KEY = 'AIzaSyCJrp1GqmuLYSGdv_z-ZVSe2Sl2tLvY8LA',
      CALENDAR_ID = 'iq90i34lq6v196rqs4986dp370@group.calendar.google.com';
    const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

    fetch(dataUrl).then(
      (response) => response.json()
    ).then((appointments) => {
      let {data} = this.state;
      debugger; 
      data.splice(0, data.length); 
      data.push.apply(data, formatData(appointments.items));
      this.setState({ dataReady: true}) //, data: formatData(appointments.items)
      console.log(formatData(appointments.items));
    });
  } */

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const PUBLIC_KEY = 'AIzaSyA5OGAMBup2tHpeQvt7EA0w2zR-3ZCQ6-0', //'AIzaSyDW9fNZ9R0VhCkBf8KtOqpsTdPAtp6sbD4',
      CALENDAR_ID = 'iq90i34lq6v196rqs4986dp370@group.calendar.google.com';
    const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/', CALENDAR_ID, '/events?key=', PUBLIC_KEY].join(
      ''
    );

    fetch(dataUrl)
      .then((response) => response.json())
      .then((appointments) => {
        setTimeout(() => {
          if (appointments.items) {
            this.setState({
              data: formatData(appointments.items),
              dataReady: true,
            });
          }
        }, 600);
        console.log(this.state.data);
        console.log(appointments.items);
      })
      .catch(() => this.setState({ dataReady: true }));
  }

  componentDidUpdate() {
    this.appointmentForm.update();
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
      syncGoogleCalendar('delete', data[deletedAppointmentId].gcId);
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
        syncGoogleCalendar('insert', added);
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );

        if (changed[state.editingAppointment.id].title === undefined) {
          data[state.editingAppointment.id].startDate = changed[state.editingAppointment.id].startDate;
          data[state.editingAppointment.id].endDate = changed[state.editingAppointment.id].endDate;
          syncGoogleCalendar('change', data[state.editingAppointment.id]);
        } else {
          syncGoogleCalendar('change', changed[state.editingAppointment.id]);
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
          <Scheduler data={data} height={700}>
            <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange} />
            <EditingState
              onCommitChanges={this.commitChanges}
              onEditingAppointmentChange={this.onEditingAppointmentChange}
              onAddedAppointmentChange={this.onAddedAppointmentChange}
            />
            <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
            <MonthView />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <Appointments />
            <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
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

export default withStyles(styles, { name: 'EditingDemo' })(Demo);
