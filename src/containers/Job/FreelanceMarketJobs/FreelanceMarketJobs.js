import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { JobItemList } from 'components';
import { getFreelanceMarketJobs } from 'state/actions';
import { SUBMIT_JOB_PROPOSAL_URL } from "routes/routeUrlConstants";
import { Spinner } from 'components';
import { SearchFilterComponent } from 'components';
import { checkValidity } from 'shared/utility';
import { NoResultFoundForList } from 'components';
import { PaginationFilter } from 'components';
import { VIEW_FREELANCER_FULL_JOB_POST } from 'routes/routeUrlConstants';

class FreelanceMarketJobs extends Component {

    state = {
        showFilter: false,
        paginationFilter: {
            currentPage: 1,
            pageSize: 5
        },
        freelanceJobMarketSearchCriteria: {
            isValid: false,
            controls: [
                {
                    key: 'searchKeywordQuery',
                    elementType: 'input',
                    displayLabel: 'Search',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Search Keyword Query'
                    },
                    valid: false,
                    validation: {
                        minLength: 1,
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
                    key: "jobType",
                    elementType: "radioGroup",
                    displayLabel: 'Job Type',
                    elementConfig: {
                        options: [
                            { value: "", displayValue: "Any" },
                            { value: "fixed", displayValue: "Fixed" },
                            { value: "hourly", displayValue: "Hourly" }
                        ],
                        displayValue: "Job Type",
                        formGroupInput: {
                            check: true,
                            inline: false
                        }
                    },
                    style: {
                        col: {
                            md: "6",
                            lg: "6"
                        }
                    },
                    value: "",
                    validation: {
                    },
                    valid: false,
                    touched: false,
                    canUpdate: true,
                    errors: [],
                    show: true
                }
            ],
            data: {
                searchKeywordQuery: '',
                jobType: ''
            }
        },
        requestToLoadFreelanceMarketJobsSent: false
    }

    toggleShowFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    viewFullJobPost = (jobId) => {
        this.props.history.push(VIEW_FREELANCER_FULL_JOB_POST + jobId);
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.freelanceJobMarketSearchCriteria.controls];
        let updatedDate = { ...this.state.freelanceJobMarketSearchCriteria.data };

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

        let updatedpostSearchCriteriaForm = {
            ...this.state.freelanceJobMarketSearchCriteria,
            controls: updatedControls,
            data: updatedDate
        };

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => {
            if (control.show)
                return control.valid === true
            return true;
        });

        updatedpostSearchCriteriaForm = {
            ...updatedpostSearchCriteriaForm,
            isValid: isFormValid
        };

        this.setState({ freelanceJobMarketSearchCriteria: updatedpostSearchCriteriaForm });
    }

    submitSearchCriteriaHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.freelanceJobMarketSearchCriteria.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.freelanceJobMarketSearchCriteria.data[control.key];
                return resultFormData;
            }, {});

        this.props.onGetFreelanceMarketJobs(dataToSubmit, this.state.paginationFilter);
        // console.log(dataToSubmit);

        this.setState({ requestToLoadFreelanceMarketJobsSent: true });
    }

    componentWillMount() {
        this.props.onGetFreelanceMarketJobs({}, this.state.paginationFilter);
    }

    changePaginationPage = (pageNumber) => {
        const paginationFilter = {
            ...this.state.paginationFilter,
            currentPage: pageNumber
        };

        this.setState({ paginationFilter });

        let dataToSubmit = this.state.freelanceJobMarketSearchCriteria.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.freelanceJobMarketSearchCriteria.data[control.key];
                return resultFormData;
            }, {});

        this.props.onGetFreelanceMarketJobs(dataToSubmit, paginationFilter);
    }

    submitProposal = (jobId) => {
        this.props.history.push(SUBMIT_JOB_PROPOSAL_URL + jobId);
    }

    render() {
        let content = null;

        content = <JobItemList {...this.props}
            submitProposal={this.submitProposal}
            viewFullJobPost={this.viewFullJobPost}></JobItemList>;

        let paginationSection = (
            <Row className="justify-content-center">
                <Col md="8">
                    <PaginationFilter
                        changePaginationPage={this.changePaginationPage}
                        paginationDetails={this.props.paginationDetails}
                        paginationFilter={this.state.paginationFilter}></PaginationFilter>
                </Col>
            </Row>
        );
        // Show Spinner if loading Authentication Request
        if (this.props.loading) {
            content = <Spinner />
            paginationSection = null;
        }

        if (!this.props.loading && this.state.requestToLoadFreelanceMarketJobsSent && this.props.listOfJobs.length === 0) {
            content = <NoResultFoundForList message={"No Jobs Found in the Market"}></NoResultFoundForList>
        }

        let formForFilter = { ...this.state.freelanceJobMarketSearchCriteria };
        let formForFilterControls = formForFilter.controls.filter(control => control.key !== 'searchKeywordQuery');

        formForFilter = {
            ...formForFilter,
            controls: formForFilterControls
        }

        return (
            <Fragment>
                <Row className="justify-content-center">
                    <Col md="8">
                        <SearchFilterComponent
                            inputChangedHandler={this.inputChangedHandler}
                            submitHandler={this.submitSearchCriteriaHandler}
                            toggleShowFilter={this.toggleShowFilter}
                            showFilter={this.state.showFilter}
                            filtersFormDef={formForFilter}
                        ></SearchFilterComponent>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        {content}
                    </Col>
                </Row>
                {paginationSection}
            </Fragment>
        )
    }

}

const mapPropsToState = state => {
    return {
        loading: state.app.job.loading,
        listOfJobs: state.app.job.list,
        paginationDetails: state.app.job.paginationDetails
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetFreelanceMarketJobs: (freelanceJobMarketSearchCriteria, paginationFilter) => dispatch(getFreelanceMarketJobs(freelanceJobMarketSearchCriteria, paginationFilter))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(FreelanceMarketJobs);