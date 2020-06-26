import React, { Component, Fragment } from "react";
import classes from "./ViewClientProfile.module.css";
import { connect } from 'react-redux';
import { getClientProfile } from 'state/actions';
import { Spinner } from 'components';
import { EDIT_CLIENT_PROFILE_URL } from "routes/routeUrlConstants";
import { UserAvatar } from 'components';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  FormGroup,
  Form,
  Row,
  Col,
  Progress
} from "reactstrap";

class ViewClientProfile extends Component {

  state = {
    data: {
      firstName: null,
      lastName: null,
      email: null,
      title: null,
      languages: null
    }
  }

  componentWillMount() {
    this.props.onGetClientProfile(this.props.userName);
  }

  componentDidMount() {
    // this.checkFormValidity();
  }

  editClientProfile = () => {
    this.props.history.push(EDIT_CLIENT_PROFILE_URL);
  }

  render() {

    let content = null;

    if (this.props.formData) {
      content = (
        <Fragment>

          <Col md="10" sm="12" lg="10" xs="12">
            <Row>
              <Col md="12">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className={"author " + classes.Author}>
                      <UserAvatar className="avatar" username={this.props.userName}></UserAvatar>
                      <h5 className="title">{this.props.formData["firstName"] + ' ' + this.props.formData["lastName"]}</h5>
                      <p className="description">{this.props.formData["title"]}</p>
                    </div>
                    {/* <div className="card-description">
                      <pre className={classes.AboutMe}>
                        {this.props.formData["aboutMe"]}
                      </pre>
                    </div> */}
                  </CardBody>

                </Card>
              </Col>

              <Col md="12">
                <Card>
                  <CardHeader>
                    <h5 className="title">Profile
                  <div className="card-header-actions">
                        <Button onClick={this.editClientProfile} color="link" className="card-header-action btn-setting">Edit <i className="fa fa-edit"></i></Button>
                      </div>
                    </h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label htmlFor="Email View">
                              <b>Email address</b>
                            </label>
                            <div className="description">
                              {this.props.formData["email"]}
                            </div>
                          </FormGroup>
                        </Col>

                        <Col className="pr-md-1" md="4">
                          <FormGroup>
                            <label><b>First Name</b></label>
                            <div className="description">
                              {this.props.formData["firstName"]}
                            </div>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label><b>Last Name</b></label>
                            <div className="description">
                              {this.props.formData["lastName"]}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* <Row>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              <b>Date of Birth</b>
                            </label>
                            <div className="description">
                              {moment(this.props.formData["dateOfBirth"]).format('DD-MM-YYYY')}
                            </div>
                          </FormGroup>
                        </Col>

                      </Row> */}
                      {/* 
                      <Row>
                        <Col className="pl-md-1" md="12">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              <b>Category of Service</b>
                            </label>
                            <div className="description">
                              <h5>
                                {this.props.formData["categoryOfService"].map(category => {
                                  return <Badge key={category} className="mr-1" color="success">{category}</Badge>
                                })}
                              </h5>
                            </div>
                          </FormGroup>
                        </Col>

                      </Row> */}

                    </Form>
                  </CardBody>
                </Card>
              </Col>

            </Row>
          </Col>

          <Col md="2" sm="2" lg="2" xs="2">
            <Row>
              <Col sm="12" md="12" className="mb-sm-2 mb-0 d-md-down-none">
                <Card className="card-user">
                  <CardBody>
                    <div className="text-muted">Profile Completion</div>
                    <strong>Percentage (40.15%)</strong>
                    <Progress className="progress-xs mt-2" color="primary" value="40" />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>

        </Fragment>
      )
    }

    // Show Spinner if loading Authentication Request
    if (this.props.loading) {
      content = <Spinner />
    }

    return (
      <div className="content">
        <Row>
          {content}
        </Row>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    formData: state.client.completeProfile.formData,
    loading: state.client.completeProfile.loading,
    userName: state.auth.userName,
  }
}

const mapDispatchToState = dispatch => {
  return {
    onGetClientProfile: (username) => dispatch(getClientProfile(username))
  }
}

export default connect(mapPropsToState, mapDispatchToState)(ViewClientProfile);