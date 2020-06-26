import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Label } from 'reactstrap';
import { checkValidity } from 'shared/utility';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getClientPublicProfile, updateClientPublicProfile } from 'state/actions';
import FormControlError from 'components/UI/FormControlError/FormControlError';
import Spinner from 'components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { VIEW_CLIENT_PROFILE_URL } from "routes/routeUrlConstants";

class EditClientPublicProfile extends Component {

    state = {
        profileDetailsForm: {
            isValid: false,
            controls: [
                {
                    key: 'languages',
                    elementType: 'input',
                    elementConfig: {
                        type: 'select',
                        multiple: true,
                        options: [
                            { value: "english", label: 'English' },
                            { value: "russian", label: 'Russian' },
                            { value: "hindi", label: 'Hindi' },
                            { value: "chinese", label: 'Chinese' },
                            { value: "arabic", label: 'Arabic' }
                        ]
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
                languages: []
            }
        },
        requestToSaveClientsPublicProfileSend: false
    }

    componentWillMount() {
        this.props.onGetClientPublicProfile();
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
        let userProfileFormData = {
            ...prevState.profileDetailsForm.data,
            ...nextProps.formData
        };
        const userProfileForm = {
            ...prevState.profileDetailsForm,
            data: userProfileFormData
        }
        await this.setState({ profileDetailsForm: userProfileForm });
    }

    checkFormValidity() {
        const updatedControls = [...this.state.profileDetailsForm.controls];
        let data = { ...this.state.profileDetailsForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            updatedControls[i] = {
                ...updatedControls[i],
                valid: checkValidity(data[updatedControls[i].key], updatedControls[i].validation, updatedControls[i].errors)
            };
        }

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => control.valid === true);

        const updatedprofileDetailsForm = {
            ...this.state.profileDetailsForm,
            controls: updatedControls,
            isValid: isFormValid
        };

        this.setState({ profileDetailsForm: updatedprofileDetailsForm });
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.profileDetailsForm.controls];
        let updatedDate = { ...this.state.profileDetailsForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            if (updatedControls[i].key === controlName) {

                let value = null;
                if (updatedControls[i].elementConfig.type === 'select') {
                    value = event.map((option) => option.value);
                } else {
                    value = event.target.value;
                }

                updatedControls[i] = {
                    ...updatedControls[i],
                    valid: checkValidity(value, updatedControls[i].validation, updatedControls[i].errors),
                    touched: true
                };
                updatedDate = {
                    ...updatedDate,
                    [updatedControls[i].key]: value
                }
            }
        }

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => control.valid === true);

        const updatedprofileDetailsForm = {
            ...this.state.profileDetailsForm,
            controls: updatedControls,
            isValid: isFormValid,
            data: updatedDate
        };

        this.setState({ profileDetailsForm: updatedprofileDetailsForm });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.profileDetailsForm.controls
            .filter((control) => control.canUpdate)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.profileDetailsForm.data[control.key];
                return resultFormData;
            }, {});

        this.props.onUpdateClientPublicProfile(dataToSubmit);
        this.setState({ requestToSaveClientsPublicProfileSend: true })
    }

    render() {

        let form = null;
        let content = null;

        form = (
            <Form className="form-horizontal">
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="multiple-select">Languages I know</Label>
                    </Col>
                    <Col md="9">
                        <Select isMulti options={this.getPublicProfileDetailForm().controls[0].elementConfig.options}
                            key={this.getPublicProfileDetailForm().controls[0].key}
                            value={
                                this.getPublicProfileDetailForm().data[this.getPublicProfileDetailForm().controls[0].key].map(selectedValue => {
                                    return this.getPublicProfileDetailForm().controls[0].elementConfig.options.find(option => option.value === selectedValue)
                                })
                            }
                            onChange={(event) => this.inputChangedHandler(event, this.getPublicProfileDetailForm().controls[0].key)} />
                    </Col>
                    <Col md="12">
                        <FormControlError showErrorMessage={!this.getPublicProfileDetailForm().controls[0].valid &&
                            this.getPublicProfileDetailForm().controls[0].touched}
                            errors={this.getPublicProfileDetailForm().controls[0].errors}></FormControlError>
                    </Col>
                </FormGroup>
            </Form>
        );

        content = (
            <Card>
                <CardHeader>
                    <strong>Profile Details</strong>
                    <div className="card-header-actions">
                        <Button onClick={this.props.toggleEditMode} color="link" className="card-header-action btn-setting">View <i className="fa fa-eye"></i></Button>
                    </div>
                </CardHeader>
                <CardBody>
                    {form}
                </CardBody>
                {!this.props.loading ? <CardFooter>
                    <Button type="submit" size="sm" color="primary" disabled={!this.state.profileDetailsForm.isValid}
                        onClick={this.submitHandler}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter> : null}
            </Card>
        );

        if (this.props.loading) {
            content = <Spinner />
        }

        if (!this.props.loading && this.state.requestToSaveClientsPublicProfileSend) {
            content = <Redirect to={VIEW_CLIENT_PROFILE_URL} />
        }

        return (
            content
        )
    }

    getPublicProfileDetailForm() {
        return this.state.profileDetailsForm;
    }
}

const mapPropsToState = state => {
    return {
        formData: state.client.publicProfile.formData,
        loading: state.client.publicProfile.loading
    }
}

const mapDispatchToState = dispatch => {
    return {
        onUpdateClientPublicProfile: (formData) => dispatch(updateClientPublicProfile(formData)),
        onGetClientPublicProfile: () => dispatch(getClientPublicProfile())
    }
}

export default connect(mapPropsToState, mapDispatchToState)(EditClientPublicProfile);