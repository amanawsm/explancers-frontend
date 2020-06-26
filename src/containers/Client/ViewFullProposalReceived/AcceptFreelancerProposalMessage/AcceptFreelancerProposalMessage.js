import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardHeader, Form, CardFooter, Button } from 'reactstrap';
import { checkValidity } from 'shared/utility';
import { formGenerator } from 'shared/form-generator';
import { CLIENT_MESSAGES_URL } from 'routes/routeUrlConstants';

import ChatSocketServer from 'shared/ChatUtils/ChatSocketServer';
import ChatHttpServer from 'shared/ChatUtils/ChatHttpServer';

class AcceptFreelancerProposalMessage extends Component {

    state = {
        acceptFreelancerProposalForm: {
            isValid: false,
            controls: [
                {
                    key: 'message',
                    elementType: 'input',
                    displayLabel: 'Message',
                    elementConfig: {
                        type: 'textarea',
                        placeholder: 'Message',
                        rows: 8
                    },
                    valid: false,
                    validation: {
                        required: true,
                        minLength: 50,
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
                message: ''
            }
        },
        requestToAcceptFreelancerProposalSent: false,
        proposalId: null,
        error: null
    }


    inputChangedHandler = (event, controlName) => {

        const updatedControls = [...this.state.acceptFreelancerProposalForm.controls];
        let updatedDate = { ...this.state.acceptFreelancerProposalForm.data };

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

        let updatedacceptFreelancerProposalForm = {
            ...this.state.acceptFreelancerProposalForm,
            controls: updatedControls,
            data: updatedDate
        };

        let isFormValid = false;
        isFormValid = updatedControls.every((control) => {
            if (control.show)
                return control.valid === true
            return true;
        });

        updatedacceptFreelancerProposalForm = {
            ...updatedacceptFreelancerProposalForm,
            isValid: isFormValid
        };

        this.setState({ acceptFreelancerProposalForm: updatedacceptFreelancerProposalForm });
    }

    submitHandler = async (event) => {
        event.preventDefault();

        let dataToSubmit = this.state.acceptFreelancerProposalForm.controls
            .filter((control) => control.canUpdate && control.show)
            .map((control) => { return { "key": control.key } })
            .reduce((resultFormData, control) => {
                resultFormData[control.key] = this.state.acceptFreelancerProposalForm.data[control.key];
                return resultFormData;
            }, {});

        const fromUserName = await ChatHttpServer.getUserName();
        ChatSocketServer.createRoomForJobProposal(
            fromUserName,
            this.state.proposalId,
            dataToSubmit.message
        );
        ChatSocketServer.eventEmitter.on('create-room-for-job-proposal-success', this.createRoomForJobProposalSuccess);
        ChatSocketServer.eventEmitter.on('create-room-for-job-proposal-fail', this.createRoomForJobProposalFail);
        // this.props.onPostJob(dataToSubmit);
        this.setState({ requestToAcceptFreelancerProposalSent: true });
    }

    componentWillMount() {
        const proposalId = this.props.match.params.proposalId;
        this.setState({ proposalId: proposalId });
        // this.props.onGetViewFullProposalReceived(proposalId);
    }

    async componentDidMount() {
        const result = await ChatHttpServer.checkIfExistsMessageRoomForJobProposal(this.state.proposalId);
        if ((result.error === false && result.message === true) || result.error === true) {
            this.setState({ error: "Proposal Already Accepted For This Job" });
        }
    }

    componentWillUnmount() {
        ChatSocketServer.eventEmitter.removeListener('create-room-for-job-proposal-success', this.createRoomForJobProposalSuccess);
        ChatSocketServer.eventEmitter.removeListener('create-room-for-job-proposal-fail', this.createRoomForJobProposalFail);
    }

    createRoomForJobProposalSuccess = (data) => {
        ChatSocketServer.eventEmitter.removeListener('create-room-for-job-proposal-success', this.createRoomForJobProposalSuccess);
        this.props.history.push(CLIENT_MESSAGES_URL);
    }

    createRoomForJobProposalFail = (data) => {
        ChatSocketServer.eventEmitter.removeListener('create-room-for-job-proposal-fail', this.createRoomForJobProposalFail);
        this.setState({ error: data });
    }
    // submitProposal = (proposalId) => {
    //     this.props.history.push(SUBMIT_JOB_PROPOSAL_URL + proposalId);
    // }

    render() {


        let form = null;

        form = (
            <Form className="form-horizontal">
                {formGenerator(this.state.acceptFreelancerProposalForm,
                    this.state.acceptFreelancerProposalForm.data,
                    this.inputChangedHandler)
                }
            </Form>
        );


        let content = (
            <Fragment>
                <Card>
                    <CardHeader>
                        <strong>Accept Freelancer Proposal</strong>
                    </CardHeader>
                    <CardBody>
                        {form}
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary" disabled={!this.state.acceptFreelancerProposalForm.isValid}
                            onClick={this.submitHandler}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </CardFooter>
                </Card>
            </Fragment>
        );

        if (this.state.requestToAcceptFreelancerProposalSent) {
            content = <Spinner />;
        }

        if (!this.props.requestToAcceptFreelancerProposalSent && this.state.error) {
            content = <p>There is some issue in accepting this Freelancers Proposal.</p>
        }

        let container = (
            <Row className="justify-content-center">
                <Col md="8">
                    {content}
                </Col>
            </Row>
        )

        return (
            container
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

export default connect(mapPropsToState, mapDispatchToState)(AcceptFreelancerProposalMessage);
