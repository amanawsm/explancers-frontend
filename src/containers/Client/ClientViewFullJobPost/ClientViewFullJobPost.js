import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import { ViewFullJobPostClientComponent } from 'components';
import { Row, Col } from 'reactstrap';
import { getFullJobPostForClient } from 'state/actions';
import { NoResultFoundForList } from 'components';

class ClientViewFullJobPost extends Component {

    state = {
    }

    componentWillMount() {
        const jobId = this.props.match.params.id;
        this.props.onGetFullJobPostForClient(jobId);
    }

    render() {

        let content = <NoResultFoundForList message={"Job Post Not Found"}></NoResultFoundForList>;

        if (this.props.jobPost) {
            content = <ViewFullJobPostClientComponent
                jobPost={this.props.jobPost}>
            </ViewFullJobPostClientComponent>
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
        loading: state.app.job.fullJobPostForClient.loading,
        jobPost: state.app.job.fullJobPostForClient.data
    }
}

const mapDispatchToState = dispatch => {
    return {
        onGetFullJobPostForClient: (jobId) => dispatch(getFullJobPostForClient(jobId))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(ClientViewFullJobPost);
