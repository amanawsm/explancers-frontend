import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { ViewSubmittedProposalsListDummy } from 'components';
import { getJobProposalsSubmittedByFreelancers } from 'state/actions';
import { SINGLE_PROPOSAL_URL } from "routes/routeUrlConstants";
import { Spinner } from 'components';
import { SearchFilterComponent } from 'components';
import { checkValidity } from 'shared/utility';
import { NoResultFoundForList } from 'components';
import { PaginationFilter } from 'components';

class ViewSubmittedProposals extends Component {

    state = {
        showFilter: false,
        paginationFilter: {
            currentPage: 1,
            pageSize: 5
        },
        searchCriteria: {
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
        requestToLoadSubmittedProposalsSent: false
    }

    toggleShowFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    viewFullProposal = (proposalId) => {
        this.props.history.push(SINGLE_PROPOSAL_URL + proposalId);
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.searchCriteria.controls];
        let updatedDate = { ...this.state.searchCriteria.data };

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
            ...this.state.searchCriteria,
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

        this.setState({ searchCriteria: updatedpostSearchCriteriaForm });
    }

    submitSearchCriteriaHandler = (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.searchCriteria.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.searchCriteria.data[control.key];
                return resultFormData;
            }, {});

        this.props.onGetJobProposalsSubmittedByFreelancers(dataToSubmit, this.state.paginationFilter);
        // console.log(dataToSubmit);

        this.setState({ requestToLoadSubmittedProposalsSent: true });
    }

    componentWillMount() {
        this.setState({ requestToLoadSubmittedProposalsSent: true });
        this.props.onGetJobProposalsSubmittedByFreelancers({}, this.state.paginationFilter);
    }

    changePaginationPage = (pageNumber) => {
        const paginationFilter = {
            ...this.state.paginationFilter,
            currentPage: pageNumber
        };

        this.setState({ paginationFilter });

        let dataToSubmit = this.state.searchCriteria.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.searchCriteria.data[control.key];
                return resultFormData;
            }, {});

        this.props.onGetJobProposalsSubmittedByFreelancers(dataToSubmit, paginationFilter);
    }

    render() {
        let content = null;

        content = <ViewSubmittedProposalsListDummy {...this.props}
            viewFullProposal={this.viewFullProposal}></ViewSubmittedProposalsListDummy>;

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

        if (!this.props.loading && this.state.requestToLoadSubmittedProposalsSent && this.props.listOfProposals.length === 0) {
            content = <NoResultFoundForList message={"You have sent no proposals on any job yet."}></NoResultFoundForList>;
            paginationSection = null;
        }

        let formForFilter = { ...this.state.searchCriteria };
        let formForFilterControls = formForFilter.controls.filter(control => control.key !== 'searchKeywordQuery');

        formForFilter = {
            ...formForFilter,
            controls: formForFilterControls
        }

        return (
            <Fragment>
                {/* <Row className="justify-content-center">
                    <Col md="8">
                        <SearchFilterComponent
                            inputChangedHandler={this.inputChangedHandler}
                            submitHandler={this.submitSearchCriteriaHandler}
                            toggleShowFilter={this.toggleShowFilter}
                            showFilter={this.state.showFilter}
                            filtersFormDef={formForFilter}
                        ></SearchFilterComponent>
                    </Col>
                </Row> */}
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
        loading: state.freelancer.proposals.loading,
        listOfProposals: state.freelancer.proposals.list,
        paginationDetails: state.freelancer.proposals.paginationDetails
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetJobProposalsSubmittedByFreelancers: (searchCriteria, paginationFilter) => dispatch(getJobProposalsSubmittedByFreelancers(searchCriteria, paginationFilter))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(ViewSubmittedProposals);