import React, { Fragment } from 'react';
import classes from './MessageBoxUI.module.css';
import { UserAvatar } from 'components';
import { TimeFromNowUpdateLive } from 'components';
import { SERVER_BASE_URL } from "shared/app-constants";

const messageBoxUi = (props) => {

    let parentClasses = [classes.Message];
    let timeClasses = [classes.TimeRight];
    let userStatusClasses = [classes.Online];
    let authorizedImageMime = ['image/jpeg', 'image/png', 'image/gif'];

    if (props.isSelfMessage) {
        parentClasses.push(classes.Darker);
        timeClasses = [classes.TimeLeft];
    }

    if (!props.isUserOnline) {
        userStatusClasses = [classes.Offline];
    }

    let messageContent = null;
    if (props.conversation.type === "file") {

        const isImage = authorizedImageMime.includes(props.conversation.file.mimetype);

        if (isImage) {
            messageContent = (<img alt="Message Img Not Available" className={classes.MessageSendImageViewer}
                src={SERVER_BASE_URL + `/readFileMessage/` + props.conversation._id} />
            );
        } else {
            messageContent = (
                <a href={SERVER_BASE_URL + `/readFileMessage/` + props.conversation._id} >
                    {SERVER_BASE_URL + `/readFileMessage/` + props.conversation._id}
                </a>
            )
        }
    } else if (props.conversation.type === "string") {
        messageContent = <p>{props.conversation.message}</p>;
    }

    return (
        <Fragment>
            <div className={parentClasses.join(' ')}>
                <div className={classes.ImageHeader}>
                    <UserAvatar className={classes.UserAvatar} username={props.conversation.sender.username}></UserAvatar>
                    <span className={userStatusClasses.join(' ')}></span>
                </div>
                <div className={classes.MessageBodyWrapper}>
                    <label><strong className={classes.UserNameLabel}>{props.conversation.sender.firstName + ' ' + props.conversation.sender.lastName}</strong></label>
                    {messageContent}
                    <span className={timeClasses.join(' ')}>Sent: <TimeFromNowUpdateLive timestamp={props.conversation.createdAt}></TimeFromNowUpdateLive></span>
                </div>
            </div>
        </Fragment>
    )

}

export default messageBoxUi;