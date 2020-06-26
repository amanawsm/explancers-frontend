import React, { Component, Fragment } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { connect } from 'react-redux';
import { checkValidity } from 'shared/utility';
import { Spinner } from 'components';
import { SearchFilterComponent } from 'components';
import { NoResultFoundForList } from 'components';
import { PaginationFilter } from 'components';
import UsersList from './Users/Users';

import { getUsersListForAdminDashboard } from 'state/actions/admin/admin';

class Dashboard extends Component {

  state = {
    showFilter: false,
    paginationFilter: {
      currentPage: 1,
      pageSize: 10
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
            placeholder: 'Search Users Query'
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
          key: "userType",
          elementType: "radioGroup",
          displayLabel: 'User Type',
          elementConfig: {
            options: [
              { value: "", displayValue: "All" },
              { value: "work", displayValue: "Freelancer" },
              { value: "hire", displayValue: "Client" },
              { value: "admin", displayValue: "Admin" }
            ],
            displayValue: "User Type",
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
        userType: ''
      }
    },
    requestToLoadUsersListForAdminDashboardSent: false
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

    this.props.onGetUsersListForAdminDashboard(dataToSubmit, this.state.paginationFilter);
    // console.log(dataToSubmit);

    this.setState({ requestToLoadFreelanceMarketJobsSent: true });
  }

  componentWillMount() {
    this.props.onGetUsersListForAdminDashboard({}, this.state.paginationFilter);
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

    this.props.onGetUsersListForAdminDashboard(dataToSubmit, paginationFilter);
  }

  render() {

    let content = null;

    content = (
      <Card>
        <CardHeader>
          Clients {' & '} Freelancers
        </CardHeader>
        <CardBody>

          <br />
          <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">

              <tr>
                <th className="text-center"><i className="icon-people"></i></th>
                <th>User</th>
                <th className="text-center">Country</th>
                <th>Registered</th>
                <th className="text-center">Email</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>
              <UsersList {...this.props}></UsersList>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );

    let paginationSection = (
      <Row className="justify-content-center">
        <Col md="10">
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

    if (!this.props.loading && this.state.requestToLoadUsersListForAdminDashboardSent && this.props.users.length === 0) {
      content = <NoResultFoundForList message={"No Users Found"}></NoResultFoundForList>
    }

    let formForFilter = { ...this.state.searchCriteria };
    let formForFilterControls = formForFilter.controls.filter(control => control.key !== 'searchKeywordQuery');

    formForFilter = {
      ...formForFilter,
      controls: formForFilterControls
    }

    return (

      <Fragment>

        <div className="animated fadeIn">

          <Row className="justify-content-center">
            <Col md="10">
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
            <Col md="10">
              {content}
            </Col>
          </Row>
          {paginationSection}

        </div>

      </Fragment>
    );
  }
}

const mapPropsToState = state => {
  return {
    loading: state.admin.dashboard.users.loading,
    users: state.admin.dashboard.users.list,
    paginationDetails: state.admin.dashboard.users.paginationDetails
  }
}

const mapDispatchToState = dispatch => {
  return {
    onGetUsersListForAdminDashboard: (searchCriteria, paginationFilter) =>
      dispatch(getUsersListForAdminDashboard(searchCriteria, paginationFilter))
  }
}

export default connect(mapPropsToState, mapDispatchToState)(Dashboard);