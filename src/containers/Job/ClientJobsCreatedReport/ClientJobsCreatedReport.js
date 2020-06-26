import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { ClientJobsCreatedList } from 'components';
import { getClientJobsCreatedReport } from 'state/actions';
import { VIEW_CLIENT_JOBS_CREATED_REPORT_URL, SINGLE_PROPOSAL_URL } from 'routes/routeUrlConstants';
import { Spinner } from 'components';
import { SearchFilterComponent } from 'components';
import { NoResultFoundForList } from 'components';
import { PaginationFilter } from 'components';
import { checkValidity } from 'shared/utility';

class ClientJobsCreatedReport extends Component {

    state = {
        showFilter: false,
        paginationFilter: {
            currentPage: 1,
            pageSize: 5
        },
        clientJobsCreatedReportSearchCriteria: {
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
        requestToLoadClientJobsCreatedReportSent: false
    }

    toggleShowFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.clientJobsCreatedReportSearchCriteria.controls];
        let updatedDate = { ...this.state.clientJobsCreatedReportSearchCriteria.data };

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
            ...this.state.clientJobsCreatedReportSearchCriteria,
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

        this.setState({ clientJobsCreatedReportSearchCriteria: updatedpostSearchCriteriaForm });
    }

    submitSearchCriteriaHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.clientJobsCreatedReportSearchCriteria.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.clientJobsCreatedReportSearchCriteria.data[control.key];
                return resultFormData;
            }, {});

        this.props.onGetClientJobsCreatedReport(dataToSubmit, this.state.paginationFilter);
        // console.log(dataToSubmit);

        this.setState({ requestToLoadClientJobsCreatedReportSent: true });
    }

    changePaginationPage = (pageNumber) => {
        const paginationFilter = {
            ...this.state.paginationFilter,
            currentPage: pageNumber
        };

        this.setState({ paginationFilter });

        let dataToSubmit = this.state.clientJobsCreatedReportSearchCriteria.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.clientJobsCreatedReportSearchCriteria.data[control.key];
                return resultFormData;
            }, {});

        this.props.onGetClientJobsCreatedReport(dataToSubmit, paginationFilter);
    }

    componentWillMount() {
        this.props.onGetClientJobsCreatedReport({}, this.state.paginationFilter);
    }

    viewProposalsReceived = (jobId) => {
        this.props.history.push(VIEW_CLIENT_JOBS_CREATED_REPORT_URL + jobId + SINGLE_PROPOSAL_URL);
    }

    viewFullJobPost = (jobId) => {
        this.props.history.push(VIEW_CLIENT_JOBS_CREATED_REPORT_URL + jobId);
    }

    render() {

        let listComponent = (
            <ClientJobsCreatedList {...this.props}
                viewProposalsReceived={this.viewProposalsReceived}
                viewFullJobPost={this.viewFullJobPost}></ClientJobsCreatedList>
        );

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
            listComponent = <Spinner />
            paginationSection = null;
        }

        if (!this.props.loading && this.state.requestToLoadClientJobsCreatedReportSent && this.props.listOfJobs.length === 0) {
            listComponent = <NoResultFoundForList message={"No Reports Found"}></NoResultFoundForList>
        }

        let formForFilter = { ...this.state.clientJobsCreatedReportSearchCriteria };
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
                        {listComponent}
                    </Col>
                </Row>
                {paginationSection}
            </Fragment>
        )
    }
}

const mapPropsToState = state => {
    return {
        loading: state.app.job.clientJobsReport.loading,
        listOfJobs: state.app.job.clientJobsReport.list,
        paginationDetails: state.app.job.clientJobsReport.paginationDetails
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetClientJobsCreatedReport: (searchCriteria, paginationFilter) => dispatch(getClientJobsCreatedReport(searchCriteria, paginationFilter))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(ClientJobsCreatedReport);