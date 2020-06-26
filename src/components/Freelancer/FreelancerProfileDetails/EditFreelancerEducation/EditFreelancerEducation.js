import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardHeader, Form, CardFooter, Button } from 'reactstrap';
import { checkValidity, checkDependencyRule } from 'shared/utility';
import { connect } from 'react-redux';
import Spinner from 'components/UI/Spinner/Spinner';
import { formGenerator } from 'shared/form-generator';

class EditFreelancerEducation extends Component {

    state = {
        educationForm: {
            isValid: false,
            controls: [
                {
                    key: 'title',
                    elementType: 'input',
                    displayLabel: 'Education Title',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Education Degree or Course Title'
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
                    key: 'status',
                    elementType: 'input',
                    displayLabel: 'Status',
                    elementConfig: {
                        type: 'select',
                        multiple: true,
                        options: [
                            { value: 'persuing', label: 'Persuing' },
                            { value: 'completed', label: 'Completed' }
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
                    key: 'description',
                    elementType: 'input',
                    displayLabel: 'Description',
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
                }
            ],
            data: {
                title: '',
                status: '',
                description: ''
            }
        },
        requestToCreateJobSent: false
    }

    async componentWillMount() {
        const educationToEdit = {...this.props.education};
        let educationForm = {
            ...this.state.educationForm,
            data: educationToEdit
        };
        await this.setState({educationForm: educationForm});
        this.checkFormValidity();
    }

    checkFormValidity() {
        const updatedControls = [...this.state.educationForm.controls];
        let data = { ...this.state.educationForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            updatedControls[i] = {
                ...updatedControls[i],
                valid: checkValidity(data[updatedControls[i].key], updatedControls[i].validation, updatedControls[i].errors)
            };
        }

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => control.valid === true);

        const updatedForm = {
            ...this.state.educationForm,
            controls: updatedControls,
            isValid: isFormValid
        };

        this.setState({ educationForm: updatedForm });
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.educationForm.controls];
        let updatedDate = { ...this.state.educationForm.data };

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

        let updatededucationForm = {
            ...this.state.educationForm,
            controls: updatedControls,
            data: updatedDate
        };

        checkDependencyRule(updatededucationForm);

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => {
            if (control.show)
                return control.valid === true
            return true;
        });

        updatededucationForm = {
            ...updatededucationForm,
            isValid: isFormValid
        };

        this.setState({ educationForm: updatededucationForm });
    }

    render() {

        let form = null;

        form = (
            <Form className="form-horizontal">
                {formGenerator(this.state.educationForm, this.state.educationForm.data, this.inputChangedHandler)}
            </Form>
        );

        let content = (
            <Fragment>
                <Card>
                    <CardHeader>
                        <strong>Education</strong>
                    </CardHeader>
                    <CardBody>
                        {form}
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary" disabled={!this.state.educationForm.isValid}
                            onClick={() => this.props.modalClosed(true, this.state.educationForm.data)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </CardFooter>
                </Card>
            </Fragment>
        );

        if (this.props.loading) {
            content = <Spinner />
        }

        return (
            content
        )
    }

}

const mapPropsToState = state => {
    return {
    }
}

const mapDispatchToState = dispatch => {
    return {
    }
}

export default connect(mapPropsToState, mapDispatchToState)(EditFreelancerEducation);