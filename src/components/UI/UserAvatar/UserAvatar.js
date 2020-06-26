import React, { Component } from 'react';
import { SERVER_BASE_URL, USERS_API, AVATAR_API } from 'shared/app-constants';

class UserAvatar extends Component {

    state = {
        userHasProfileAvatar: true
    }

    toggleUserHasProfileAvatar = () => {
        this.setState({ userHasProfileAvatar: !this.state.userHasProfileAvatar });
    }

    render() {

        let preparedClasses = this.props.className;

        let content = (<img alt="Avatar"
            onClick={this.props.click}
            className={preparedClasses}
            src={'../../../assets/img/avatars/no-avatar-found.png'} />
        );

        if (this.state.userHasProfileAvatar) {
            content = (<img alt="Avatar Server" className={preparedClasses}
                onClick={this.props.click}
                onError={this.toggleUserHasProfileAvatar}
                src={SERVER_BASE_URL + USERS_API + '/' + this.props.username + AVATAR_API} />
            );
        }

        return (content);
    }
}

export default UserAvatar;