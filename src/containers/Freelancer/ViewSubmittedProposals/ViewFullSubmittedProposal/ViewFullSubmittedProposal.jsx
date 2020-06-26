import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getFullSubmittedProposalAndJobForFreelancer } from 'state/actions';
import Spinner from 'components/UI/Spinner/Spinner';
import ViewFullJobPost from 'components/Freelancer/ViewFullJobPost/ViewFullJobPost';
import NoResultFoundForList from 'components/UI/NoResultFoundForList/NoResultFoundForList';
import ViewFullProposalForFreelancer from 'components/Freelancer/ViewFullProposalForFreelancer/ViewFullProposalForFreelancer';

class ViewFullSubmittedProposal extends Component {

    state = {
    }

    componentWillMount() {
        const proposalId = this.props.match.params.id;
        this.props.onGetFullSubmittedProposalAndJobForFreelancer(proposalId);
    }

    render() {

        let content = (
            <Col md="8">
                <NoResultFoundForList message={"Job Proposal Not Found"}></NoResultFoundForList>
            </Col>
        );

        if (this.props.jobPost) {
            content = (
                <Fragment>
                    <Col md="8">
                        <ViewFullProposalForFreelancer proposal={this.props.jobProposal}></ViewFullProposalForFreelancer>
                    </Col>
                    <Col md="8">
                        <ViewFullJobPost submitProposal={this.submitProposal} jobPost={this.props.jobPost}></ViewFullJobPost>
                    </Col>
                </Fragment>
            )

        }
        let container = (
            <Row className="justify-content-center">
                {content}
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
        loading: state.freelancer.submittedJobProposalAndJob.loading,
        jobPost: state.freelancer.submittedJobProposalAndJob.job,
        jobProposal: state.freelancer.submittedJobProposalAndJob.jobProposal
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetFullSubmittedProposalAndJobForFreelancer: (proposalId) => dispatch(getFullSubmittedProposalAndJobForFreelancer(proposalId))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(ViewFullSubmittedProposal);
