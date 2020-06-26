import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { checkValidity } from 'shared/utility';
import { resetForgotUserPassword } from 'state/actions';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'components';
import { connect } from 'react-redux';
import { FormControlError } from 'components';

class ForgotPassword extends Component {

  state = {

    resetPasswordForm: {
      isValid: false,
      controls: [
        {
          key: 'email',
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "E-Mail"
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false,
          errors: []
        }
      ]
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = [...this.state.resetPasswordForm.controls];
    for (let i = 0; i < updatedControls.length; i++) {
      if (updatedControls[i].key === controlName) {
        updatedControls[i] = {
          ...updatedControls[i],
          value: event.target.value,
          valid: checkValidity(event.target.value, updatedControls[i].validation, updatedControls[i].errors),
          touched: true
        }
      }
    }

    let isFormValid = false;
    isFormValid = updatedControls.every((control) => control.valid === true);

    const updatedresetPasswordForm = {
      ...this.state.resetPasswordForm,
      controls: updatedControls,
      isValid: isFormValid
    };

    this.setState({ resetPasswordForm: updatedresetPasswordForm });
  }

  submitHandler = (event) => {
    event.preventDefault();

    let formData = this.state.resetPasswordForm.controls.map((control) => {
      let formControl = {};
      formControl[control.key] = control.value;
      return formControl;
    }).reduce((resultFormData, formControl) => {
      for (const key in formControl) {
        resultFormData[key] = formControl[key]
      }
      return resultFormData;
    }, {});

    this.props.onResetPassword(formData);
  }

  render() {

    let form = null;
    form = (
      <Form>
        <h1>Password Reset</h1>
        <p className="text-muted">Enter your registered Email to reset password.</p>

        <InputGroup className="mb-3">

          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Email" autoComplete="email"
            value={this.state.resetPasswordForm.controls[0].value}
            onChange={(event) => this.inputChangedHandler(event, "email")} />
          <FormControlError showErrorMessage={!this.state.resetPasswordForm.controls[0].valid &&
            this.state.resetPasswordForm.controls[0].touched}
            errors={this.state.resetPasswordForm.controls[0].errors}></FormControlError>

        </InputGroup>

        <Button color="success" block disabled={!this.state.resetPasswordForm.isValid}
          onClick={this.submitHandler}>Reset Account Password</Button>
      </Form>
    );

    // Redirect User if Autheenticated
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />
    }

    if (this.props.loading === false && this.props.error === null) {
      authRedirect = <Redirect to="/login" />
    }

    // Show Spinner if loading Authentication Request
    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className="app flex-row align-items-center">
        {authRedirect}
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">

                  {form}

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    loading: state.auth.resetPassword.loading,
    error: state.auth.resetPassword.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToState = dispatch => {
  return {
    onResetPassword: (formData) => dispatch(resetForgotUserPassword(formData))
  }
}

export default connect(mapPropsToState, mapDispatchToState)(ForgotPassword);
