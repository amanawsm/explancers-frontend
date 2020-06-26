import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import { ViewFullJobPost } from 'components';
import { Row, Col } from 'reactstrap';
import { getFullJobPostForFreelancer } from 'state/actions';
import { NoResultFoundForList } from 'components';
import { SUBMIT_JOB_PROPOSAL_URL } from "routes/routeUrlConstants";

class FreelancerViewFullJobPost extends Component {

    state = {
    }

    componentWillMount() {
        const jobId = this.props.match.params.id;
        this.props.onGetFullJobPostForFreelancer(jobId);
    }

    submitProposal = (jobId) => {
        this.props.history.push(SUBMIT_JOB_PROPOSAL_URL + jobId);
    }

    render() {

        let content = <NoResultFoundForList message={"Job Post Not Found"}></NoResultFoundForList>;

        if (this.props.jobPost) {
            content = <ViewFullJobPost submitProposal={this.submitProposal} jobPost={this.props.jobPost}></ViewFullJobPost>
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
        loading: state.app.job.fullJobPostForFreelancer.loading,
        jobPost: state.app.job.fullJobPostForFreelancer.data
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetFullJobPostForFreelancer: (jobId) => dispatch(getFullJobPostForFreelancer(jobId))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(FreelancerViewFullJobPost);
