import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FormGroup, Label } from 'reactstrap';
import { checkValidity } from 'shared/utility';
import { signup } from 'state/actions';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'components';
import { connect } from 'react-redux';
import { FormControlError } from 'components';

class Register extends Component {

  state = {
    registrationForm: {
      isValid: false,
      controls: [
        {
          key: 'firstName',
          elementType: 'input',
          displayLabel: 'First Name',
          elementConfig: {
            type: 'text',
            placeholder: 'First Name'
          },
          valid: false,
          value: '',
          validation: {
            required: true,
            minLength: 2,
            maxLength: 20
          },
          touched: false,
          canUpdate: true,
          errors: [],
          show: true
        },
        {
          key: 'lastName',
          elementType: 'input',
          displayLabel: 'Last Name',
          elementConfig: {
            type: 'text',
            placeholder: 'Last Name'
          },
          valid: false,
          value: '',
          validation: {
            required: true,
            minLength: 2,
            maxLength: 20
          },
          touched: false,
          canUpdate: true,
          errors: [],
          show: true
        },
        {
          key: 'username',
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Username"
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false,
          errors: []
        },
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
        },
        // {
        //   key: "password",
        //   elementType: "input",
        //   elementConfig: {
        //     type: "password",
        //     placeholder: "Password"
        //   },
        //   value: '',
        //   validation: {
        //     required: true,
        //     minLength: 6
        //   },
        //   valid: false,
        //   touched: false,
        //   errors: []
        // },
        {
          key: "accountType",
          elementType: "radioGroup",
          elementConfig: {
            options: [
              { value: "hire", displayValue: "Hire" },
              { value: "work", displayValue: "Work" }
            ],
            displayValue: "I want to"
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          errors: []
        }
      ]
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = [...this.state.registrationForm.controls];
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

    const updatedRegistrationForm = {
      ...this.state.registrationForm,
      controls: updatedControls,
      isValid: isFormValid
    };

    this.setState({ registrationForm: updatedRegistrationForm });
  }

  submitHandler = (event) => {
    event.preventDefault();

    let formData = this.state.registrationForm.controls.map((control) => {
      let formControl = {};
      formControl[control.key] = control.value;
      return formControl;
    }).reduce((resultFormData, formControl) => {
      for (const key in formControl) {
        resultFormData[key] = formControl[key]
      }
      return resultFormData;
    }, {});

    this.props.onSignup(formData);
  }

  render() {

    let form = null;
    form = (
      <Form>
        <h1>Register</h1>
        <p className="text-muted">Create your account</p>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="First Name" autoComplete="firstName"
            value={this.state.registrationForm.controls[0].value}
            onChange={(event) => this.inputChangedHandler(event, "firstName")} />
          <FormControlError showErrorMessage={!this.state.registrationForm.controls[0].valid &&
            this.state.registrationForm.controls[0].touched}
            errors={this.state.registrationForm.controls[0].errors}></FormControlError>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Last Name" autoComplete="lastName"
            value={this.state.registrationForm.controls[1].value}
            onChange={(event) => this.inputChangedHandler(event, "lastName")} />
          <FormControlError showErrorMessage={!this.state.registrationForm.controls[1].valid &&
            this.state.registrationForm.controls[1].touched}
            errors={this.state.registrationForm.controls[1].errors}></FormControlError>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Username" autoComplete="username"
            value={this.state.registrationForm.controls[2].value}
            onChange={(event) => this.inputChangedHandler(event, "username")} />
          <FormControlError showErrorMessage={!this.state.registrationForm.controls[2].valid &&
            this.state.registrationForm.controls[2].touched}
            errors={this.state.registrationForm.controls[2].errors}></FormControlError>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Email" autoComplete="email"
            value={this.state.registrationForm.controls[3].value}
            onChange={(event) => this.inputChangedHandler(event, "email")} />
          <FormControlError showErrorMessage={!this.state.registrationForm.controls[3].valid &&
            this.state.registrationForm.controls[3].touched}
            errors={this.state.registrationForm.controls[3].errors}></FormControlError>
        </InputGroup>
        {/* <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" placeholder="Password" autoComplete="new-password"
            value={this.state.registrationForm.controls[2].value}
            onChange={(event) => this.inputChangedHandler(event, "password")} />
          <FormControlError showErrorMessage={!this.state.registrationForm.controls[2].valid &&
            this.state.registrationForm.controls[2].touched}
            errors={this.state.registrationForm.controls[2].errors}></FormControlError>

        </InputGroup> */}

        <FormGroup row>
          <Col md="3">
            <Label>{this.state.registrationForm.controls[2].elementConfig.displayValue}</Label>
          </Col>
          <Col md="9">
            <FormGroup check inline>
              <Input className="form-check-input" type="radio" id="inline-radio_hire" name="inline-radios"
                checked={this.state.registrationForm.controls[4].value === this.state.registrationForm.controls[4].elementConfig.options[0].value}
                value={this.state.registrationForm.controls[4].elementConfig.options[0].value}
                onChange={(event) => this.inputChangedHandler(event, "accountType")} />
              <Label className="form-check-label" check htmlFor="inline-radio_hire">{this.state.registrationForm.controls[4].elementConfig.options[0].displayValue}</Label>
            </FormGroup>
            <FormGroup check inline>
              <Input className="form-check-input" type="radio" id="inline-radio_work" name="inline-radios"
                checked={this.state.registrationForm.controls[4].value === this.state.registrationForm.controls[4].elementConfig.options[1].value}
                value={this.state.registrationForm.controls[4].elementConfig.options[1].value}
                onChange={(event) => this.inputChangedHandler(event, "accountType")} />
              <Label className="form-check-label" check htmlFor="inline-radio_work">{this.state.registrationForm.controls[4].elementConfig.options[1].displayValue}</Label>
            </FormGroup>
          </Col>

          <Col md="12">
            <FormControlError showErrorMessage={!this.state.registrationForm.controls[4].valid &&
              this.state.registrationForm.controls[4].touched}
              errors={this.state.registrationForm.controls[4].errors}></FormControlError>
          </Col>

        </FormGroup>
        {/* <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" placeholder="Repeat password" autoComplete="new-password"
            value={this.state.controls["password"].value} 
            onChange={(event) => this.inputChangedHandler(event, "password")} />
        </InputGroup> */}
        <Button color="success" block disabled={!this.state.registrationForm.isValid}
          onClick={this.submitHandler}>Create Account</Button>
      </Form>
    );

    // Redirect User if Autheenticated
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />
    }

    if (this.props.signupSuccess) {
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
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    signupSuccess: state.auth.signupSuccess
  }
}

const mapDispatchToState = dispatch => {
  return {
    onSignup: (formData) => dispatch(signup(formData))
  }
}

export default connect(mapPropsToState, mapDispatchToState)(Register);
