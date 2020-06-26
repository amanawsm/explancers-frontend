import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import { ViewFullProposal } from 'components';
import { Row, Col } from 'reactstrap';
import { getFullJobProposalReceived } from 'state/actions';
import { NoResultFoundForList } from 'components';
import { SUBMIT_JOB_PROPOSAL_URL, CLIENT_ACCEPT_PROPOSAL_MESSAGE_PAGE_URL } from "routes/routeUrlConstants";

class ViewFullProposalReceived extends Component {

    state = {
    }

    componentWillMount() {
        const proposalId = this.props.match.params.proposalId;
        this.props.onGetViewFullProposalReceived(proposalId);
    }

    submitProposal = (proposalId) => {
        this.props.history.push(SUBMIT_JOB_PROPOSAL_URL + proposalId);
    }

    acceptProposalAndMessage = () => {
        this.props.history.push(CLIENT_ACCEPT_PROPOSAL_MESSAGE_PAGE_URL);
    }

    render() {

        let content = <NoResultFoundForList message={"Job Proposal Not Found"}></NoResultFoundForList>;

        if (this.props.proposal) {
            content = <ViewFullProposal
                proposal={this.props.proposal}
                acceptProposalAndMessage={this.acceptProposalAndMessage}>
            </ViewFullProposal>
        }

        let container = (
            <Row className="justify-content-center">
                <Col md="8">
                    {content}
                </Col>
            </Row>
        )
        // Show Spinner if loading Authentication Request
        if (this.props.loading) {
            container = <Spinner />
        }

        return (
            container
        )
    }
}

const mapPropsToState = state => {
    return {
        loading: state.app.job.fullProposalsReceivedForJob.loading,
        proposal: state.app.job.fullProposalsReceivedForJob.proposal
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetViewFullProposalReceived: (proposalId) => dispatch(getFullJobProposalReceived(proposalId))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(ViewFullProposalReceived);
