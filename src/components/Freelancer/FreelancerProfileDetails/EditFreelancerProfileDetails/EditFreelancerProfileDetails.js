import React, { Component, Fragment } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form } from 'reactstrap';
import { checkValidity } from 'shared/utility';
import { connect } from 'react-redux';
import { updateUserProfile, getUserProfile } from 'state/actions';
import Spinner from 'components/UI/Spinner/Spinner';
import Modal from 'components/UI/Modal/Modal';
import EditFreelancerEducation from 'components/Freelancer/FreelancerProfileDetails/EditFreelancerEducation/EditFreelancerEducation';
import { formGenerator } from 'shared/form-generator';
import { checkDependencyRule } from 'shared/utility';
import ViewEducationList from "components/Public/ViewEducationList/ViewEducationList";
import ViewPortfolioList from "components/Public/ViewPortfolioList/ViewPortfolioList";
import FormGeneratorService from "shared/form-generator.service";
import EditFreelancerPortfolio from 'components/Freelancer/FreelancerProfileDetails/EditFreelancerPortfolio/EditFreelancerPortfolio';

class EditFreelancerProfileDetails extends Component {

    actionMode = "EDIT";
    state = {
        profileDetailsForm: {
            isValid: false,
            controls: [
                {
                    key: 'title',
                    displayLabel: 'Title',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Professional Title'
                    },
                    valid: false,
                    validation: {
                        required: true,
                        minLength: 6,
                        maxLength: 70
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
                    key: 'aboutMe',
                    displayLabel: 'About Me',
                    elementType: 'input',
                    elementConfig: {
                        type: 'textarea',
                        placeholder: 'About Me'
                    },
                    valid: false,
                    validation: {
                        required: true,
                        minLength: 150,
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
                },
                {
                    key: 'categoryOfService',
                    displayLabel: 'Category of Services',
                    elementType: 'input',
                    elementConfig: {
                        type: 'multi-select',
                        multiple: true,
                        providers: 'categoryOfService',
                        options: [
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
                    displayLabel: 'Languages I know',
                    elementType: 'input',
                    elementConfig: {
                        type: 'multi-select',
                        multiple: true,
                        providers: 'languages',
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
                }
            ],
            data: {
                title: '',
                aboutMe: '',
                categoryOfService: [],
                languages: [],
                education: [],
                portfolio: []
            }
        },
        educationToEdit: null,
        showEducationModal: false,
        portfolioToEdit: null,
        showPortfolioModal: false
    }

    async componentWillMount() {
        let updatedFormDataResult = await FormGeneratorService.setControlsDataWithProviders(this.state.profileDetailsForm);
        // TODO: Check if error is true do something
        this.setState({ profileDetailsForm: updatedFormDataResult.updateForm });
        this.props.onGetUserProfile();
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

        let updatedprofileDetailsForm = {
            ...this.state.profileDetailsForm,
            controls: updatedControls,
            data: updatedDate
        };
        checkDependencyRule(updatedprofileDetailsForm);

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => control.valid === true);

        updatedprofileDetailsForm = {
            ...updatedprofileDetailsForm,
            isValid: isFormValid
        };

        this.setState({ profileDetailsForm: updatedprofileDetailsForm });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.profileDetailsForm.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.profileDetailsForm.data[control.key];
                return resultFormData;
            }, {});

        this.props.onUpdateUserProfile(dataToSubmit);
    }

    /**
     * Education Section - Start
     */
    updateEducationAndCloseModal = (closedWith = false, data = null) => {

        console.log(closedWith, data);
        if (!closedWith || !data) {
            this.toggleEducationModal();
            return;
        }

        let education = [...this.state.profileDetailsForm.data.education];

        if (!data.id) {
            education.push(data);
        } else {
            for (let index = 0; index < education.length; index++) {
                if (education[index].id === data.id) {
                    education[index] = { ...data };
                }
            }
        }

        let userProfileFormData = {
            ...this.state.profileDetailsForm.data,
            education: education
        };
        const userProfileForm = {
            ...this.state.profileDetailsForm,
            data: userProfileFormData
        }

        this.setState({ profileDetailsForm: userProfileForm });
        this.props.onUpdateUserProfile({ education });
        this.toggleEducationModal();
    }

    editEducationndOpenModal = (educationId) => {
        const education = [...this.state.profileDetailsForm.data.education];
        const educationToEdit = education.find((education) => education.id === educationId);
        this.setState({ educationToEdit: educationToEdit });
        this.toggleEducationModal();
    }

    deleteEducation = (educationId) => {       
        const education = [...this.state.profileDetailsForm.data.education];
        const educationAfterDelete = education.filter((education) => education.id !== educationId);
        this.props.onUpdateUserProfile({ education: educationAfterDelete });

        let userProfileFormData = {
            ...this.state.profileDetailsForm.data,
            education: educationAfterDelete
        };
        const userProfileForm = {
            ...this.state.profileDetailsForm,
            data: userProfileFormData
        }

        this.setState({ profileDetailsForm: userProfileForm });
    }

    addEducationModal = () => {
        this.setState({ educationToEdit: null, showEducationModal: true });
    }

    toggleEducationModal = () => {
        this.setState({ showEducationModal: !this.state.showEducationModal });
    }

    /**
     * Education Section - End
     */

    /**
     * Portfolio Section - Start
     */
    updatePortfolioAndCloseModal = (closedWith = false, data = null) => {

        console.log(closedWith, data);
        if (!closedWith || !data) {
            this.togglePortfolioModal();
            return;
        }

        let portfolio = [...this.state.profileDetailsForm.data.portfolio];

        if (!data.id) {
            portfolio.push(data);
        } else {
            for (let index = 0; index < portfolio.length; index++) {
                if (portfolio[index].id === data.id) {
                    portfolio[index] = { ...data };
                }
            }
        }

        let userProfileFormData = {
            ...this.state.profileDetailsForm.data,
            portfolio: portfolio
        };
        const userProfileForm = {
            ...this.state.profileDetailsForm,
            data: userProfileFormData
        }

        this.setState({ profileDetailsForm: userProfileForm });
        this.props.onUpdateUserProfile({ portfolio });
        this.togglePortfolioModal();
    }

    editPortfolioAndOpenModal = (portfolioId) => {
        const portfolio = [...this.state.profileDetailsForm.data.portfolio];
        const portfolioToEdit = portfolio.find((portfolio) => portfolio.id === portfolioId);
        this.setState({ portfolioToEdit: portfolioToEdit });        
        this.togglePortfolioModal();
    }

    deletePortfolio = (portfolioId) => {
        const portfolio = [...this.state.profileDetailsForm.data.portfolio];
        const portfolioAfterDelete = portfolio.filter((education) => education.id !== portfolioId);
        this.props.onUpdateUserProfile({ portfolio: portfolioAfterDelete });

        let userProfileFormData = {
            ...this.state.profileDetailsForm.data,
            portfolio: portfolioAfterDelete
        };
        const userProfileForm = {
            ...this.state.profileDetailsForm,
            data: userProfileFormData
        }

        this.setState({ profileDetailsForm: userProfileForm });
    }

    addPortfolioModal = () => {
        this.setState({ portfolioToEdit: null, showPortfolioModal: true });
    }

    togglePortfolioModal = () => {
        this.setState({ showPortfolioModal: !this.state.showPortfolioModal });
    }

    /**
     * Portfolio Section - End
     */
    render() {

        let form = null;

        form = (
            <Form className="form-horizontal">
                {formGenerator(this.state.profileDetailsForm, this.state.profileDetailsForm.data, this.inputChangedHandler)}
            </Form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <Fragment>
                {/* Public Details */}
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

                {/* Educational Details */}
                <Card>
                    <CardHeader>
                        <strong>Education</strong>
                        <div className="card-header-actions">
                            <Button onClick={this.addEducationModal} color="link" className="card-header-action btn-setting">Add <i className="fa fa-plus"></i></Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ViewEducationList educationList={this.state.profileDetailsForm.data.education}
                            editEducation={this.editEducationndOpenModal}
                            deleteEducation={this.deleteEducation}
                            actionMode={this.actionMode}
                        ></ViewEducationList>
                    </CardBody>
                </Card>

                {/* Portfolio Details */}
                <Card>
                    <CardHeader>
                        <strong>Portfolio</strong>
                        <div className="card-header-actions">
                            <Button onClick={this.addPortfolioModal} color="link" className="card-header-action btn-setting">Add Portfolio<i className="fa fa-plus"></i></Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ViewPortfolioList portfolioList={this.state.profileDetailsForm.data.portfolio}
                            editPortfolio={this.editPortfolioAndOpenModal}
                            deletePortfolio={this.deletePortfolio}
                            actionMode={this.actionMode}
                        ></ViewPortfolioList>
                    </CardBody>
                </Card>

                <Modal show={this.state.showEducationModal} modalClosed={() => this.updateEducationAndCloseModal()}>
                    <EditFreelancerEducation education={this.state.educationToEdit} modalClosed={this.updateEducationAndCloseModal}></EditFreelancerEducation>
                </Modal>

                <Modal show={this.state.showPortfolioModal} modalClosed={() => this.updatePortfolioAndCloseModal()}>
                    <EditFreelancerPortfolio portfolio={this.state.portfolioToEdit} modalClosed={this.updatePortfolioAndCloseModal}></EditFreelancerPortfolio>
                </Modal>
            </Fragment>
        )
    }

    getProfileDetailForm() {
        return this.state.profileDetailsForm;
    }
}

const mapPropsToState = state => {
    return {
        formData: state.app.user.userProfile.formData,
        loading: state.app.user.userProfile.loading
    }
}

const mapDispatchToState = dispatch => {
    return {
        onUpdateUserProfile: (formData) => dispatch(updateUserProfile(formData)),
        onGetUserProfile: () => dispatch(getUserProfile())
    }
}

export default connect(mapPropsToState, mapDispatchToState)(EditFreelancerProfileDetails);