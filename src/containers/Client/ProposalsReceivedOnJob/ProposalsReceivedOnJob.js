import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { ProposalsReceivedOnJobList } from 'components';
import { connect } from 'react-redux';
import { getProposalsReceivedForJob } from 'state/actions';
import { Spinner } from 'components';
import NoResultFoundForList from 'components/UI/NoResultFoundForList/NoResultFoundForList';

class ProposalsReceivedOnJob extends Component {

    state = {
        requestToGetProposalsSent: false
    }

    viewClientProfile = () => {
        // this.props.history.push(VIEW_CLIENT_PROFILE_URL);
    }

    componentWillMount() {
        const jobId = this.props.match.params.jobId;
        this.props.onGetProposalsSubmittedForJob(jobId);
        this.setState({ requestToGetProposalsSent: true });
    }

    viewFllProposalReceived = (proposalId) => {
        this.props.history.push(proposalId + '/');
    }

    render() {
        let listComponent = (
            <ProposalsReceivedOnJobList
                proposals={this.props.proposals}
                viewFllProposalReceived={this.viewFllProposalReceived}
            ></ProposalsReceivedOnJobList>
        );

        // Show Spinner if loading Authentication Request
        if (this.props.loading) {
            listComponent = <Spinner />
        }

        if (!this.props.loading && this.state.requestToGetProposalsSent && this.props.proposals.length === 0) {
            listComponent = <NoResultFoundForList message={"No Proposals Received"}></NoResultFoundForList>
        }

        return (
            <Row className="justify-content-center">
                <Col xs="10" md="8">
                    {listComponent}
                </Col>
            </Row>
        )
    }
}

const mapPropsToState = state => {
    return {
        proposals: state.app.job.proposalsReceivedForJob.proposals,
        loading: state.app.job.proposalsReceivedForJob.loading
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetProposalsSubmittedForJob: (jobId) => dispatch(getProposalsReceivedForJob(jobId))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(ProposalsReceivedOnJob);