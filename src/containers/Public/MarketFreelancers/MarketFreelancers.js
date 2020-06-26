import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { MarketFreelancersList } from 'components';
import { getMarketFreelancers } from 'state/actions';
import { Spinner } from 'components';
import { SearchFilterComponent } from 'components';
import { checkValidity } from 'shared/utility';
import { NoResultFoundForList } from 'components';
import { PaginationFilter } from 'components';
import { FREELANCER_URL } from 'routes/routeUrlConstants';

class MarketFreelancers extends Component {

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
        requestToLoadFreelanceMarketJobsSent: false
    }

    toggleShowFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
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

        this.props.onGetMarketFreelancers(dataToSubmit, this.state.paginationFilter);
        // console.log(dataToSubmit);

        this.setState({ requestToLoadFreelanceMarketJobsSent: true });
    }

    componentWillMount() {
        this.props.onGetMarketFreelancers({}, this.state.paginationFilter);
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

        this.props.onGetMarketFreelancers(dataToSubmit, paginationFilter);
    }

    viewFullFreelancerProfile = (username) => {
        this.props.history.push(FREELANCER_URL + username);
    }

    render() {
        let content = null;

        content = <MarketFreelancersList {...this.props}
            submitProposal={this.submitProposal}
            viewFullFreelancerProfile={this.viewFullFreelancerProfile}></MarketFreelancersList>;

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

        if (!this.props.loading && this.state.requestToLoadFreelanceMarketJobsSent && this.props.freelancers.length === 0) {
            content = <NoResultFoundForList message={"No Freelancers Found in the Market"}></NoResultFoundForList>
        }

        let formForFilter = { ...this.state.searchCriteria };
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
        loading: state.freelancer.market.loading,
        freelancers: state.freelancer.market.freelancers,
        paginationDetails: state.freelancer.market.paginationDetails
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetMarketFreelancers: (searchCriteria, paginationFilter) => dispatch(getMarketFreelancers(searchCriteria, paginationFilter))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(MarketFreelancers);