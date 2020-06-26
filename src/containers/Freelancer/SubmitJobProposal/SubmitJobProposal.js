import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitProposalForJob, getJobDataToSubmitProposal } from 'state/actions';
import { checkValidity, checkDependencyRule } from 'shared/utility';
import { SubmitJobProposalFormDetails } from 'components';
import { Spinner } from 'components';
import { Redirect } from 'react-router-dom';
import { VIEW_FREELANCER_MARKET_JOBS } from 'routes/routeUrlConstants';

class SubmitJobProposal extends Component {

    state = {
        submitJobProposalForm: {
            isValid: false,
            controls: [
            ],
            data: {
                coverLetter: '',
                proposedHourlyRate: 0,
                proposedHixedPrice: 0
            }
        },
        requestToSubmitProposalSent: false
    }

    componentWillMount() {
        const jobId = this.props.match.params.id;
        this.props.onGetJobDataToSubmitProposal(jobId);
    }

    componentDidUpdate(prevProps) {
        //Typical usage, don't forget to compare the props
        if (this.props.formData !== prevProps.formData) {
            this.setState({
                submitJobProposalForm: {
                    ...this.state.submitJobProposalForm,
                    controls: this.prepareFormControlsDefinition(this.props.formData)
                }
            });
        }
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.submitJobProposalForm.controls];
        let updatedDate = { ...this.state.submitJobProposalForm.data };

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

        let updatedsubmitJobProposalForm = {
            ...this.state.submitJobProposalForm,
            controls: updatedControls,
            data: updatedDate
        };

        checkDependencyRule(updatedsubmitJobProposalForm);

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => {
            if (control.show)
                return control.valid === true
            return true;
        });

        updatedsubmitJobProposalForm = {
            ...updatedsubmitJobProposalForm,
            isValid: isFormValid
        };

        this.setState({ submitJobProposalForm: updatedsubmitJobProposalForm });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.submitJobProposalForm.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.submitJobProposalForm.data[control.key];
                return resultFormData;
            }, {});

        dataToSubmit["job"] = this.props.formData.id;

        this.props.onSubmitProposalForJob(dataToSubmit);
        this.setState({ requestToSubmitProposalSent: true });
    }

    prepareFormControlsDefinition = (formData) => {
        let controls = [];

        if (!formData)
            return controls;

        controls.push({
            key: 'coverLetter',
            elementType: 'input',
            displayLabel: 'Cover Letter',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Requirement',
                rows: 5
            },
            valid: false,
            validation: {
                required: true,
                minLength: 50,
                maxLength: 1000
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
        });

        if (formData.type === "hourly") {
            controls.push({
                key: 'proposedHourlyRate',
                elementType: 'input',
                displayLabel: 'Your Proposed Hourly Rate',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Hourly Rate'
                },
                valid: false,
                validation: {
                    required: true,
                    minValue: formData.hourlyRate,
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
                show: true
            });
        }

        if (formData.type === "fixed") {
            controls.push({
                key: 'proposedFixedPrice',
                elementType: 'input',
                displayLabel: 'Your Proposed Fixed Price',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Fixed Price'
                },
                valid: false,
                validation: {
                    required: true,
                    minValue: formData.fixedPrice,
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
                show: true
            });
        }

        return controls;
    }

    render() {

        let content = (
            <SubmitJobProposalFormDetails
                form={this.state.submitJobProposalForm}
                inputChangedHandler={this.inputChangedHandler}
                submitHandler={this.submitHandler}
                loading={this.props.loading}
            ></SubmitJobProposalFormDetails>
        );

        const { formData } = this.props;
        const isProposalSent = formData && formData.freelancerJobProposal && formData.freelancerJobProposal.isSent;

        if (isProposalSent) {
            content = <h1>Proposal Sent Already</h1>
        }
        // Show Spinner if loading Authentication Request
        if (this.props.loading) {
            content = <Spinner />
        }

        if (!this.props.loading && this.state.requestToSubmitProposalSent) {
            content = <Redirect to={VIEW_FREELANCER_MARKET_JOBS} />
        }

        return (
            content
        )
    }
}

const mapPropsToState = state => {
    return {
        loading: state.app.job.jobToSubmitProposal.loading,
        formData: state.app.job.jobToSubmitProposal.formData
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetJobDataToSubmitProposal: (jobId) => dispatch(getJobDataToSubmitProposal(jobId)),
        onSubmitProposalForJob: (formData) => dispatch(submitProposalForJob(formData))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(SubmitJobProposal);
