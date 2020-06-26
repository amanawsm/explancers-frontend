import React, { Component, Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import { EditFreelancerProfileDetails } from 'components';
import { VIEW_FREELANCER_PROFILE_URL } from "routes/routeUrlConstants";
import { updateUserProfileAvatar } from 'state/actions';
import { connect } from 'react-redux';
import { EditProfileAvatar } from 'components';

class EditFreelancerProfile extends Component {

    state = {
        showImageCropper: false
    }

    viewFreelancerProfile = () => {
        this.props.history.push(VIEW_FREELANCER_PROFILE_URL);
    }

    toggleImageCropperShow = () => {
        this.setState({ showImageCropper: !this.state.showImageCropper });
    }

    updateUserProfileAvatar = (image) => {
        if (!image) {
            return;
        }
        this.props.onUpdateUserProfileAvatar(image);
    }

    render() {

        let content = (
            <Fragment>
                <Col xs="12" md="12">
                    <EditProfileAvatar showImageCropper={this.state.showImageCropper}
                        toggleImageCropperShow={this.toggleImageCropperShow}
                        updateUserProfileAvatar={this.updateUserProfileAvatar}
                        {...this.props}
                    ></EditProfileAvatar>
                </Col>
                <Col xs="12" md="12">
                    <EditFreelancerProfileDetails toggleEditMode={this.viewFreelancerProfile}></EditFreelancerProfileDetails>
                </Col>
            </Fragment>
        );

        return (
            <Row>
                {content}
            </Row>
        )
    }

}

const mapPropsToState = state => {
    return {
        loading: state.app.user.avatar.loading
    }
}

const mapDispatchToState = dispatch => {
    return {
        onUpdateUserProfileAvatar: (image) => dispatch(updateUserProfileAvatar(image))
    }
}

export default connect(mapPropsToState, mapDispatchToState)(EditFreelancerProfile);
