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
import {syncGoogleCalendar, handleAppointmentsLoad} from './apiHandlerGoogleCalendar';


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

  export default AppointmentFormContainerBasic;
