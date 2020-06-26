import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activateUserAccount } from 'state/actions';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FormControlError } from 'components';
import { checkValidity } from 'shared/utility';

class ActivateUserAccount extends Component {

    state = {
        activationToken: null,
        activateAccountForm: {
            isValid: false,
            controls: [
                {
                    key: "password",
                    elementType: "input",
                    elementConfig: {
                        type: "password",
                        placeholder: "Password"
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
                    key: "retypePassword",
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: "Retype Password"
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false,
                    errors: []
                }
            ]
        }
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        for (let param of searchParams.entries()) {
            if (param[0] === 'token') {
                this.setState({ activationToken: param[1] });
            }
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = [...this.state.activateAccountForm.controls];
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
        isFormValid = updatedControls.every((control) => control.valid === true) && updatedControls[0].value === updatedControls[1].value;

        const updatedActivateAccountForm = {
            ...this.state.activateAccountForm,
            controls: updatedControls,
            isValid: isFormValid
        };

        this.setState({ activateAccountForm: updatedActivateAccountForm });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let formData = this.state.activateAccountForm.controls.map((control) => {
            let formControl = {};
            formControl[control.key] = control.value;
            return formControl;
        }).reduce((resultFormData, formControl) => {
            for (const key in formControl) {
                resultFormData[key] = formControl[key]
            }
            return resultFormData;
        }, {});

        delete formData.retypePassword;
        this.props.onActivateUserAccount(this.state.activationToken, formData);
    }

    render() {

        let form = null;
        form = (
            <Form>
                <h1>Reset Password</h1>
                <p className="text-muted">Enter New Password</p>

                <InputGroup className="mb-3">

                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="icon-lock"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" autoComplete="new-password"
                        value={this.state.activateAccountForm.controls[0].value}
                        onChange={(event) => this.inputChangedHandler(event, "password")} />
                    <FormControlError showErrorMessage={!this.state.activateAccountForm.controls[0].valid &&
                        this.state.activateAccountForm.controls[0].touched}
                        errors={this.state.activateAccountForm.controls[0].errors}></FormControlError>

                </InputGroup>

                <InputGroup className="mb-4">

                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="icon-lock"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Repeat password" autoComplete="new-password"
                        value={this.state.activateAccountForm.controls[1].value}
                        onChange={(event) => this.inputChangedHandler(event, "retypePassword")} />
                    <FormControlError showErrorMessage={!this.state.activateAccountForm.controls[1].valid &&
                        this.state.activateAccountForm.controls[1].touched}
                        errors={this.state.activateAccountForm.controls[1].errors}></FormControlError>

                </InputGroup>
                <Button color="success" block disabled={!this.state.activateAccountForm.isValid}
                    onClick={this.submitHandler}>Reset</Button>
            </Form>
        );

        let authRedirect = null;
        if (!this.props.loading && !this.props.error && this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />
        }
        if (!this.props.loading && this.props.error && !this.props.isAuthenticated) {
            authRedirect = <h1>Invalid Authentication Token</h1>
        }

        let content = (
            <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                    {authRedirect ? authRedirect :
                        <Card className="mx-4">
                            <CardBody className="p-4">
                                {form}
                            </CardBody>
                        </Card>}
                </Col>
            </Row>
        );

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    {content}
                </Container>
            </div>
        );

    }
}

const mapPropsToState = state => {
    return {
        loading: state.auth.activateAccount.loading,
        error: state.auth.activateAccount.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToState = dispatch => {
    return {
        onActivateUserAccount: (activationToken, formData) => dispatch(activateUserAccount(activationToken, formData))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(ActivateUserAccount);