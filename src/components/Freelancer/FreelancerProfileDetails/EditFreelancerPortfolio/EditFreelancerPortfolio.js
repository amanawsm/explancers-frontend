import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardHeader, Form, CardFooter, Button } from 'reactstrap';
import { checkValidity, checkDependencyRule } from 'shared/utility';
import { connect } from 'react-redux';
import Spinner from 'components/UI/Spinner/Spinner';
import { formGenerator } from 'shared/form-generator';

class EditFreelancerPortfolio extends Component {

    state = {
        portfolioForm: {
            isValid: false,
            controls: [
                {
                    key: 'title',
                    elementType: 'input',
                    displayLabel: 'Project Title',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Pitch your project in one short sentance'
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
                // {
                //     key: 'status',
                //     elementType: 'input',
                //     displayLabel: 'Status',
                //     elementConfig: {
                //         type: 'select',
                //         multiple: true,
                //         options: [
                //             { value: 'persuing', label: 'Persuing' },
                //             { value: 'completed', label: 'Completed' }
                //         ]
                //     },
                //     valid: false,
                //     validation: {
                //         required: true
                //     },
                //     style: {
                //         col: {
                //             md: "12",
                //             lg: "12"
                //         }
                //     },
                //     touched: false,
                //     canUpdate: true,
                //     errors: [],
                //     show: true
                // },
                {
                    key: 'displayImage',
                    elementType: 'input',
                    displayLabel: 'Displat Image',
                    elementConfig: {
                        type: 'file',
                        placeholder: 'Select the Portfolio Image'
                    },
                    valid: false,
                    validation: {
                        required: true,
                        mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']
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
                        placeholder: 'Description of your project {Optional)',
                        rows: 5
                    },
                    valid: false,
                    validation: {
                        required: false,
                        minLength: 10,
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
                    key: 'url',
                    elementType: 'input',
                    displayLabel: 'Project URL',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Project URL (Optional)'
                    },
                    valid: false,
                    validation: {
                        required: false
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
            ],
            data: {
                title: '',
                status: '',
                displayImage: '',
                description: '',
                url: ''
            }
        },
        requestToCreateJobSent: false
    }

    async componentWillMount() {
        const portfolioToEdit = {...this.props.portfolio};
        let portfolioForm = {
            ...this.state.portfolioForm,
            data: portfolioToEdit
        };
        await this.setState({portfolioForm: portfolioForm});
        this.checkFormValidity();
    }

    // Check validity of the form in the beginning
    checkFormValidity() {
        const updatedControls = [...this.state.portfolioForm.controls];
        let data = { ...this.state.portfolioForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            updatedControls[i] = {
                ...updatedControls[i],
                valid: checkValidity(data[updatedControls[i].key], updatedControls[i].validation, updatedControls[i].errors)
            };
        }

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => control.valid === true);

        const updatedForm = {
            ...this.state.portfolioForm,
            controls: updatedControls,
            isValid: isFormValid
        };

        this.setState({ portfolioForm: updatedForm });
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.portfolioForm.controls];
        let updatedDate = { ...this.state.portfolioForm.data };

        for (let i = 0; i < updatedControls.length; i++) {
            if (updatedControls[i].key === controlName) {

                let value = null;
                if (updatedControls[i].elementConfig.type === 'multi-select') {
                    value = event.map((option) => option.value);
                } else if (updatedControls[i].elementConfig.type === 'select') {
                    value = event.value;
                } else if (updatedControls[i].elementConfig.type === 'file') {
                    value = event.target.files[0];
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

        let updatedPortfolioForm = {
            ...this.state.portfolioForm,
            controls: updatedControls,
            data: updatedDate
        };

        checkDependencyRule(updatedPortfolioForm);

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => {
            if (control.show)
                return control.valid === true
            return true;
        });

        updatedPortfolioForm = {
            ...updatedPortfolioForm,
            isValid: isFormValid
        };

        this.setState({ portfolioForm: updatedPortfolioForm });
    }

    render() {

        let form = null;

        form = (
            <Form className="form-horizontal">
                {formGenerator(this.state.portfolioForm, this.state.portfolioForm.data, this.inputChangedHandler)}
            </Form>
        );

        let content = (
            <Fragment>
                <Card>
                    <CardHeader>
                        <strong>Portfolio</strong>
                    </CardHeader>
                    <CardBody>
                        {form}
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary" disabled={!this.state.portfolioForm.isValid}
                            onClick={() => this.props.modalClosed(true, this.state.portfolioForm.data)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
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

export default connect(mapPropsToState, mapDispatchToState)(EditFreelancerPortfolio);