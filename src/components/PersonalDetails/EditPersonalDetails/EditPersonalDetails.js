import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import { checkValidity } from 'shared/utility';
import { connect } from 'react-redux';
import { updateUserPersonal } from 'state/actions';
import { getUserPersonal } from 'state/actions';
import moment from 'moment';
import FormControlError from 'components/UI/FormControlError/FormControlError';
import Spinner from 'components/UI/Spinner/Spinner';

class EditPersonalDetails extends Component {

    state = {
        personalDetailsForm: {
            isValid: false,
            controls: [
                {
                    key: 'username',
                    elementType: 'paragraph',
                    elementConfig: {
                        type: 'text'
                    },
                    valid: true,
                    validation: {
                        required: false
                    },
                    touched: true,
                    canUpdate: false,
                    errors: []
                },
                {
                    key: 'firstName',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'First Name'
                    },
                    valid: false,
                    validation: {
                        required: true
                    },
                    touched: false,
                    canUpdate: true,
                    errors: []
                },
                {
                    key: 'lastName',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Last Name'
                    },
                    valid: false,
                    validation: {
                        required: true
                    },
                    touched: false,
                    canUpdate: true,
                    errors: []
                },
                {
                    key: 'email',
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email Address'
                    },
                    valid: false,
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    touched: false,
                    canUpdate: false,
                    errors: []
                },
                {
                    key: 'dateOfBirth',
                    elementType: 'input',
                    elementConfig: {
                        type: 'date',
                        placeholder: 'Date Of Birth'
                    },
                    valid: false,
                    validation: {
                        required: true
                    },
                    touched: false,
                    canUpdate: true,
                    errors: []
                }
            ],
            data: {
                id: null,
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: ''
            }
        }
    }

    componentWillMount() {
        this.props.onGetUserPersonal();
    }

    componentDidMount() {
        this.checkFormValidity();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.formData !== this.props.formData) {
            await this.updateLocalFormDataWithState(this.props, prevState);
            this.checkFormValidity();
        }
    }

    async updateLocalFormDataWithState(nextProps, prevState) {
        let userPersonalFormData = {
            ...prevState.personalDetailsForm.data,
            ...nextProps.formData
        };
        const userPersonalForm = {
            ...prevState.personalDetailsForm,
            data: userPersonalFormData
        }
        await this.setState({ personalDetailsForm: userPersonalForm });
    }

    checkFormValidity() {
        const updatedControls = [...this.state.personalDetailsForm.controls];
        let data = { ...this.state.personalDetailsForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            updatedControls[i] = {
                ...updatedControls[i],
                valid: checkValidity(data[updatedControls[i].key], updatedControls[i].validation, updatedControls[i].errors)
            };
        }

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => control.valid === true);

        const updatedPersonalDetailsForm = {
            ...this.state.personalDetailsForm,
            controls: updatedControls,
            isValid: isFormValid
        };

        this.setState({ personalDetailsForm: updatedPersonalDetailsForm });
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.personalDetailsForm.controls];
        let updatedDate = { ...this.state.personalDetailsForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            if (updatedControls[i].key === controlName) {
                updatedControls[i] = {
                    ...updatedControls[i],
                    valid: checkValidity(event.target.value, updatedControls[i].validation, updatedControls[i].errors),
                    touched: true
                };
                updatedDate = {
                    ...updatedDate,
                    [updatedControls[i].key]: event.target.value
                }
            }
        }

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => control.valid === true);

        const updatedPersonalDetailsForm = {
            ...this.state.personalDetailsForm,
            controls: updatedControls,
            isValid: isFormValid,
            data: updatedDate
        };
        this.setState({ personalDetailsForm: updatedPersonalDetailsForm });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.personalDetailsForm.controls
            .filter((control) => control.canUpdate)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.personalDetailsForm.data[control.key];
                return resultFormData;
            }, {});

        this.props.onUpdateUserPersonal(dataToSubmit);
    }

    render() {

        let form = null;

        form = (
            <Form className="form-horizontal">
                <FormGroup row>
                    <Col md="3">
                        <Label>Username</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p className="form-control-static">{this.state.personalDetailsForm.data[this.getPersonalDetailForm().controls[0].key]}</p>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">First Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="Text"
                            key={this.getPersonalDetailForm().controls[1].key}
                            value={this.state.personalDetailsForm.data[this.getPersonalDetailForm().controls[1].key]}
                            onChange={(event) => this.inputChangedHandler(event, this.getPersonalDetailForm().controls[1].key)} />
                    </Col>
                    <Col xs="12" md="12">
                        <FormControlError showErrorMessage={!this.getPersonalDetailForm().controls[1].valid &&
                            this.getPersonalDetailForm().controls[1].touched}
                            errors={this.getPersonalDetailForm().controls[1].errors}></FormControlError>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Last Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="Text"
                            key={this.getPersonalDetailForm().controls[2].key}
                            value={this.state.personalDetailsForm.data[this.getPersonalDetailForm().controls[2].key]}
                            onChange={(event) => this.inputChangedHandler(event, this.getPersonalDetailForm().controls[2].key)} />
                    </Col>
                    <Col xs="12" md="12">
                        <FormControlError showErrorMessage={!this.getPersonalDetailForm().controls[2].valid &&
                            this.getPersonalDetailForm().controls[2].touched}
                            errors={this.getPersonalDetailForm().controls[2].errors}></FormControlError>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="email" id="email-input" name="email-input" placeholder="Enter Email"
                            autoComplete="email" key={this.getPersonalDetailForm().controls[3].key}
                            disabled={!this.getPersonalDetailForm().controls[3].canUpdate}
                            value={this.state.personalDetailsForm.data[this.getPersonalDetailForm().controls[3].key]}
                            onChange={(event) => this.inputChangedHandler(event, this.getPersonalDetailForm().controls[3].key)} />
                    </Col>
                    <Col xs="12" md="12">
                        <FormControlError showErrorMessage={!this.getPersonalDetailForm().controls[3].valid &&
                            this.getPersonalDetailForm().controls[3].touched}
                            errors={this.getPersonalDetailForm().controls[3].errors}></FormControlError>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="date-input">Date Of Birth</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="date" id="date-input" name="date-input" placeholder="date"
                            key={this.getPersonalDetailForm().controls[4].key}
                            value={moment(this.state.personalDetailsForm.data[this.getPersonalDetailForm().controls[4].key]).format('YYYY-MM-DD')}
                            onChange={(event) => this.inputChangedHandler(event, this.getPersonalDetailForm().controls[4].key)} />
                    </Col>
                    <Col xs="12" md="12">
                        <FormControlError showErrorMessage={!this.getPersonalDetailForm().controls[4].valid &&
                            this.getPersonalDetailForm().controls[4].touched}
                            errors={this.getPersonalDetailForm().controls[4].errors}></FormControlError>
                    </Col>
                </FormGroup>
            </Form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <Card>
                <CardHeader>
                    <strong>Personal Details</strong>
                    <div className="card-header-actions">
                        <Button onClick={this.props.toggleEditMode} color="link" className="card-header-action btn-setting">View <i className="fa fa-eye"></i></Button>
                    </div>
                </CardHeader>
                <CardBody>
                    {form}
                </CardBody>
                {!this.props.loading ? <CardFooter>
                    <Button type="submit" size="sm" color="primary" disabled={!this.state.personalDetailsForm.isValid}
                        onClick={this.submitHandler} ><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter> : null}
            </Card>
        )
    }

    getPersonalDetailForm() {
        return this.state.personalDetailsForm;
    }
}

const mapPropsToState = state => {
    return {
        loading: state.app.user.userPersonal.loading,
        formData: state.app.user.userPersonal.formData
    }
}

const mapDispatchToState = dispatch => {
    return {
        onUpdateUserPersonal: (formData) => dispatch(updateUserPersonal(formData)),
        onGetUserPersonal: () => dispatch(getUserPersonal()),
    }
}

export default connect(mapPropsToState, mapDispatchToState)(EditPersonalDetails);