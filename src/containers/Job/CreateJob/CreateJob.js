import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardHeader, Form, CardFooter, Button } from 'reactstrap';
import { checkValidity, checkDependencyRule } from 'shared/utility';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import { formGenerator } from 'shared/form-generator';
import { postJob } from 'state/actions';
import { Redirect } from 'react-router-dom';
import { VIEW_CLIENT_JOBS_CREATED_REPORT_URL } from 'routes/routeUrlConstants';

class CreateJob extends Component {

    state = {
        postJobForm: {
            isValid: false,
            controls: [
                {
                    key: 'title',
                    elementType: 'input',
                    displayLabel: 'Job Title',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Job Title'
                    },
                    valid: false,
                    validation: {
                        required: true,
                        minLength: 6,
                        maxLength: 100
                    },
                    style: {
                        col: {
                            md: "12",
                            lg: "12"
                        }
                    },
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    show: true
                },
                {
                    key: 'requirement',
                    elementType: 'input',
                    displayLabel: 'Requirements',
                    elementConfig: {
                        type: 'textarea',
                        placeholder: 'Requirement',
                        rows: 5
                    },
                    valid: false,
                    validation: {
                        required: true,
                        minLength: 100,
                        maxLength: 4000
                    },
                    style: {
                        col: {
                            md: "12",
                            lg: "12"
                        }
                    },
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    show: true
                },
                {
                    key: 'categoryOfService',
                    elementType: 'input',
                    displayLabel: 'Category of Freelancers Needed',
                    elementConfig: {
                        type: 'multi-select',
                        multiple: true,
                        options: [
                            { value: 'webAndSoftwareDevelopment', label: 'Web & Software Development' },
                            { value: 'mobileDevelopment', label: 'Mobile Development' },
                            { value: 'uiUxDesigner', label: 'UI/UX Designer' },
                        ]
                    },
                    valid: false,
                    validation: {
                        required: true
                    },
                    style: {
                        col: {
                            md: "12",
                            lg: "12"
                        }
                    },
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    show: true
                },
                {
                    key: 'languages',
                    elementType: 'input',
                    displayLabel: 'Languages',
                    elementConfig: {
                        type: 'multi-select',
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
                    style: {
                        col: {
                            md: "12",
                            lg: "12"
                        }
                    },
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    show: true
                },
                {
                    key: 'type',
                    elementType: 'input',
                    displayLabel: 'Billing Type',
                    elementConfig: {
                        type: 'select',
                        multiple: true,
                        options: [
                            { value: "hourly", label: 'Hourly' },
                            { value: "fixed", label: 'Fixed' }
                        ]
                    },
                    valid: false,
                    validation: {
                        required: true
                    },
                    style: {
                        col: {
                            md: "12",
                            lg: "12"
                        }
                    },
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    show: true
                },
                {
                    key: 'hourlyRate',
                    elementType: 'input',
                    displayLabel: 'Hourly Rate',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Hourly Rate'
                    },
                    valid: false,
                    validation: {
                        required: true,
                        minValue: 20,
                        isNumeric: true
                    },
                    style: {
                        col: {
                            md: "12",
                            lg: "12"
                        }
                    },
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    rule: {
                        effect: "SHOW",
                        dependencyType: "AND",
                        dependencyConditions: [
                            {
                                key: "type",
                                value: "hourly",
                                condition: 'equalTo'
                            }
                        ]
                    },
                    show: false
                },
                {
                    key: 'fixedPrice',
                    elementType: 'input',
                    displayLabel: 'Fixed Price',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Fixed Price'
                    },
                    valid: false,
                    validation: {
                        required: true,
                        minValue: 500,
                        isNumeric: true
                    },
                    style: {
                        col: {
                            md: "12",
                            lg: "12"
                        }
                    },
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    show: false,
                    rule: {
                        effect: "SHOW",
                        dependencyType: "AND",
                        dependencyConditions: [
                            {
                                key: "type",
                                value: "fixed",
                                condition: 'equalTo'
                            }
                        ]
                    }
                }
            ],
            data: {
                title: '',
                requirement: '',
                categoryOfService: [],
                languages: [],
                type: '',
                hourlyRate: 0,
                fixedPrice: 0
            }
        },
        requestToCreateJobSent: false
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.postJobForm.controls];
        let updatedDate = { ...this.state.postJobForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            if (updatedControls[i].key === controlName) {

                let value = null;
                if (updatedControls[i].elementConfig.type === 'multi-select') {
                    value = event.map((option) => option.value);
                } else if (updatedControls[i].elementConfig.type === 'select') {
                    value = event.value;
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

        let updatedpostJobForm = {
            ...this.state.postJobForm,
            controls: updatedControls,
            data: updatedDate
        };

        checkDependencyRule(updatedpostJobForm);

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => {
            if (control.show)
                return control.valid === true
            return true;
        });

        updatedpostJobForm = {
            ...updatedpostJobForm,
            isValid: isFormValid
        };

        this.setState({ postJobForm: updatedpostJobForm });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.postJobForm.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.postJobForm.data[control.key];
                return resultFormData;
            }, {});

        this.props.onPostJob(dataToSubmit);
        this.setState({ requestToCreateJobSent: true });
    }

    render() {

        let form = null;

        form = (
            <Form className="form-horizontal">
                {formGenerator(this.state.postJobForm, this.state.postJobForm.data, this.inputChangedHandler)}
            </Form>
        );

        let content = (
            <Fragment>
                <Card>
                    <CardHeader>
                        <strong>Post a Job</strong>
                        <div className="card-header-actions">
                            <Button onClick={this.props.toggleEditMode} color="link" className="card-header-action btn-setting">View <i className="fa fa-eye"></i></Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {form}
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary" disabled={!this.state.postJobForm.isValid}
                            onClick={this.submitHandler}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </CardFooter>
                </Card>
            </Fragment>
        );

        if (this.props.loading) {
            content = <Spinner />
        }

        if (!this.props.loading && this.state.requestToCreateJobSent) {
            content = <Redirect to={VIEW_CLIENT_JOBS_CREATED_REPORT_URL} />
        }

        return (
            content
        )
    }

}

const mapPropsToState = state => {
    return {
        loading: state.app.job.postJob.loading,
        success: state.app.job.postJob.success,
    }
}

const mapDispatchToState = dispatch => {
    return {
        onPostJob: (jobData) => dispatch(postJob(jobData))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(CreateJob);