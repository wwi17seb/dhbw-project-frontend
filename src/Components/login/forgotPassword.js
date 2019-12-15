/*
Folgende packages installieren:
npm i react-loader
npm i react-bootstrap-button-loader
npm i prop-types
npm install react-bootstrap --save
npm install semantic-ui-react
*/
import React, { Component } from "react";
//import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from "react-bootstrap/FormControl";
import { Icon, Label } from 'semantic-ui-react'
//import ControlLabel from "react-bootstrap/ControlLabel";
import ButtonLoader from 'react-bootstrap-button-loader';
import "./forgotPassword.css";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false
    };
  }

  validateCodeForm() {
    return this.state.email.length > 0;
  }

  validateResetForm() {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSendCodeClick = async event => {
    event.preventDefault();

    this.setState({ isSendingCode: true });

    try {
      //await Auth.forgotPassword(this.state.email);
      this.setState({ codeSent: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isSendingCode: false });
    }
  };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      /*await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      );*/
      this.setState({ confirmed: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isConfirming: false });
    }
  };

  renderRequestCodeForm() {
    return (
      <form onSubmit={this.handleSendCodeClick}>
        <FormGroup bssize="large" controlId="email">
          <Label>Email</Label>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <ButtonLoader
          block
          type="submit"
          bssize="large"
          loadingtext="Sending…"
          text="Send Confirmation"
          isloading={this.state.isSendingCode}
          disabled={!this.validateCodeForm()}>
            Bestätigung senden
        </ButtonLoader>
      </form>
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmClick}>
        <FormGroup bssize="large" controlId="code">
          <Label>Confirmation Code</Label>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <p class="help-block">
            Please check your email ({this.state.email}) for the confirmation
            code.
          </p>
        </FormGroup>
        <hr />
        <FormGroup bssize="large" controlId="password">
          <Label>New Password</Label>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup bssize="large" controlId="confirmPassword">
          <Label>Confirm Password</Label>
          <FormControl
            type="password"
            onChange={this.handleChange}
            value={this.state.confirmPassword}
          />
        </FormGroup>
        <ButtonLoader
          block
          type="submit"
          bssize="large"
          text="Confirm"
          loadingText="Confirm…"
          isLoading={this.state.isConfirming}
          disabled={!this.validateResetForm()}>
            Bestätigen
        </ButtonLoader>
      </form>
    );
  }

  renderSuccessMessage() {
    return (
      <div className="success">
        <Icon glyph="ok" />
        <p>Your password has been reset.</p>
        <p>
          <Link to="/">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="ResetPassword">
        {!this.state.codeSent
          ? this.renderRequestCodeForm()
          : !this.state.confirmed
            ? this.renderConfirmationForm()
            : this.renderSuccessMessage()}
      </div>
    );
  }
}