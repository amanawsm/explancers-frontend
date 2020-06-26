import React, { Component, Fragment } from "react";
import classes from "./ViewUserProfile.module.css";
import { connect } from 'react-redux';
import { getFreelancerProfile } from 'state/actions';
import { Spinner } from 'components';
import { EDIT_FREELANCER_PROFILE_URL } from "routes/routeUrlConstants";
import moment from 'moment';
import { Badge, Button, Card, CardHeader, CardBody, CardText, FormGroup, Form, Row, Col, Progress } from "reactstrap";
import { UserAvatar } from 'components';
import { ViewEducationList } from "components";
import { ViewPortfolioList } from "components";

class ViewUserProfile extends Component {

  state = {
    data: {
      firstName: null,
      lastName: null,
      email: null,
      title: null,
      aboutMe: null,
      categoryOfService: null,
      languages: null
    }
  }

  componentWillMount() {
    this.props.onGetFreelancerProfile(this.props.userName);
  }

  componentDidMount() {
    // this.checkFormValidity();
  }

  editFreelancerProfile = () => {
    this.props.history.push(EDIT_FREELANCER_PROFILE_URL);
  }

  render() {

    let content = null;

    if (this.props.formData) {
      content = (
        <Fragment>

          <Col md="12" sm="12" lg="12" xs="12">
            <Row>
              <Col md="12">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className={"author " + classes.Author}>
                      <UserAvatar className="avatar" username={this.props.userName}></UserAvatar>
                      <h5 className="title">{this.props.formData["firstName"] + ' ' + this.props.formData["lastName"]}</h5>
                      <h4 className="description">{this.props.formData["title"]}</h4>
                    </div>
                    <div className="card-description">
                      <div className={classes.AboutMe}>
                        {this.props.formData["aboutMe"]}
                      </div>
                    </div>
                  </CardBody>
                  {/* <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter> */}
                </Card>
              </Col>

              <Col md="12">
                <Card>
                  <CardHeader>
                    <h5 className="title">Profile
                  <div className="card-header-actions">
                        <Button onClick={this.editFreelancerProfile} color="link" className="card-header-action btn-setting">Edit <i className="fa fa-edit"></i></Button>
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

                      <Row>
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

                      </Row>

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

                      </Row>
                      {/* <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                      {/* <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row> */}
                      {/* <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    </Form>
                  </CardBody>
                </Card>
              </Col>

              {this.props.formData["education"] && this.props.formData["education"].length ?
                <Col md="12">
                  <Card>
                    <CardHeader>
                      <h5 className="title">Education</h5>
                    </CardHeader>
                    <CardBody>
                      <ViewEducationList educationList={this.props.formData["education"]}
                      ></ViewEducationList>
                    </CardBody>
                  </Card>
                </Col> : null}

              {this.props.formData["portfolio"] && this.props.formData["portfolio"].length ?
                <Col md="12">
                  <Card>
                    <CardHeader>
                      <h5 className="title">Portfolio</h5>
                    </CardHeader>
                    <CardBody>
                      <ViewPortfolioList portfolioList={this.props.formData["portfolio"]}
                      ></ViewPortfolioList>
                    </CardBody>
                  </Card>
                </Col> : null}

            </Row>
          </Col>

          {/* <Col md="2" sm="2" lg="2" xs="2">
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
          </Col> */}

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
    formData: state.freelancer.profile.formData,
    loading: state.freelancer.profile.loading,
    userName: state.auth.userName,
  }
}

const mapDispatchToState = dispatch => {
  return {
    onGetFreelancerProfile: (username) => dispatch(getFreelancerProfile(username, { displayOnly: true }))
  }
}

export default connect(mapPropsToState, mapDispatchToState)(ViewUserProfile);