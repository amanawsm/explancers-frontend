import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { checkValidity } from 'shared/utility';
import { connect } from 'react-redux';
import { authLogin } from 'state/actions';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'components';
import { FormControlError } from 'components';
import { FormGroup, Label } from 'reactstrap';

class Login extends Component {

  state = {
    loginForm: {
      isValid: false,
      controls: [
        {
          key: 'email',
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
          },
          value: '',
          valid: false,
          validation: {
            required: true,
            isEmail: true
          },
          touched: false,
          errors: []
        },
        {
          key: 'password',
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          valid: false,
          validation: {
            required: true,
            minLength: 6
          },
          touched: false,
          errors: []
        },
        {
          key: "accountType",
          elementType: "radioGroup",
          elementConfig: {
            options: [
              { value: "hire", displayValue: "Client" },
              { value: "work", displayValue: "Worker" }
            ],
            displayValue: "Login as"
          },
          value: "",
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

    const updatedControls = [...this.state.loginForm.controls];
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

    const updatedLoginForm = {
      ...this.state.loginForm,
      controls: updatedControls,
      isValid: isFormValid
    };

    this.setState({ loginForm: updatedLoginForm });
  }

  submitHandler = (event) => {
    event.preventDefault();

    let formData = this.state.loginForm.controls.map((control) => {
      let formControl = {};
      formControl[control.key] = control.value;
      return formControl;
    }).reduce((resultFormData, formControl) => {
      for (const key in formControl) {
        resultFormData[key] = formControl[key]
      }
      return resultFormData;
    }, {});

    this.props.onAuth(formData);
  }


  render() {

    // Redirect User if Autheenticated
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />
    }

    let loginHelperMessage = null;
    if (this.props.error && this.props.error.message === 'EMAIL_VERIFICATION_PENDING') {
      loginHelperMessage = (<p className="text-muted">Your Email Verification is Pending.
      You can't login without email activation.</p>);
    } else if (this.props.signupSuccess) {
      loginHelperMessage = (<p className="text-muted">Activate your account through activation link sent to your registered email.
      You can't login without email activation.</p>);
    } else {
      loginHelperMessage = <p className="text-muted">Sign In to your account</p>;
    }

    let form = null;

    form = (
      <Form>
        <h1>Login</h1>
        {loginHelperMessage}
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="email" placeholder="E-mail" autoComplete="email"
            key="email"
            value={this.state.loginForm.controls[0].value}
            onChange={(event) => this.inputChangedHandler(event, "email")} />
          <FormControlError showErrorMessage={!this.state.loginForm.controls[0].valid &&
            this.state.loginForm.controls[0].touched}
            errors={this.state.loginForm.controls[0].errors}></FormControlError>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" placeholder="Password" autoComplete="current-password"
            key="password"
            value={this.state.loginForm.controls[1].value}
            onChange={(event) => this.inputChangedHandler(event, "password")} />
          <FormControlError showErrorMessage={!this.state.loginForm.controls[1].valid &&
            this.state.loginForm.controls[1].touched}
            errors={this.state.loginForm.controls[1].errors}></FormControlError>
        </InputGroup>
        <FormGroup row>
          <Col md="3">
            <Label>{this.state.loginForm.controls[2].elementConfig.displayValue}</Label>
          </Col>
          <Col md="9">
            <FormGroup check inline>
              <Input className="form-check-input" type="radio" name="inline-accountType"
                checked={this.state.loginForm.controls[2].value === this.state.loginForm.controls[2].elementConfig.options[0].value}
                value={this.state.loginForm.controls[2].elementConfig.options[0].value}
                onChange={(event) => this.inputChangedHandler(event, "accountType")} />
              <Label className="form-check-label" check htmlFor="inline-radio_accountType">{this.state.loginForm.controls[2].elementConfig.options[0].displayValue}</Label>
            </FormGroup>
            <FormGroup check inline>
              <Input className="form-check-input" type="radio" name="inline-accountType"
                checked={this.state.loginForm.controls[2].value === this.state.loginForm.controls[2].elementConfig.options[1].value}
                value={this.state.loginForm.controls[2].elementConfig.options[1].value}
                onChange={(event) => this.inputChangedHandler(event, "accountType")} />
              <Label className="form-check-label" check htmlFor="inline-radio_accountType">{this.state.loginForm.controls[2].elementConfig.options[1].displayValue}</Label>
            </FormGroup>
          </Col>

          <Col md="12">
            <FormControlError showErrorMessage={!this.state.loginForm.controls[2].valid &&
              this.state.loginForm.controls[2].touched}
              errors={this.state.loginForm.controls[2].errors}></FormControlError>
          </Col>

        </FormGroup>
        <Row>
          <Col xs="6">
            <Button disabled={!this.state.loginForm.isValid}
              onClick={this.submitHandler}
              color="primary" className="px-4">Login</Button>
          </Col>
          <Col xs="6" className="text-right">
            <Link to="/account/reset/password">
              <Button onClick={(e) => e.preventDefault} color="link" className="px-0">Forgot password?</Button>
            </Link>

          </Col>
          <Col xs="12" className="text-center d-block d-md-block d-xl-none">
            <Link to="/register">
              <Button onClick={(e) => e.preventDefault} color="link" className="px-0">Sign Up</Button>
            </Link>
          </Col>

        </Row>
      </Form>
    );
    // Show Spinner if loading Authentication Request
    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className="app flex-row align-items-center">

        {authRedirect}

        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {form}
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Welcome to Explancers an online platform that enables you to find right price job for your skills.
                        We allow you to work from remote location anywhere in the world.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loginAccount.loading,
    error: state.auth.loginAccount.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    signupSuccess: state.auth.signupSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (formData) => dispatch(authLogin(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
