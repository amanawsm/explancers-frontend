import React from 'react';
import { Col, Row } from 'reactstrap';
import classes from './ChatListItem.module.css';
import { UserAvatar } from 'components';

const chatListItem = (props) => {

    let content = null;
    let oppositUser = {
        firstName: '',
        lastName: '',
        username: props.currentActiveUsername
    };

    if (props.messageRoom) {

        let classesPrepared = [classes.ChatListItemWrapper, classes.SideBarBody];
        if (props.active) {
            classesPrepared.push(classes.Active);
        }

        if (props.messageRoom.users.length > 1) {
            let allOppositUsers = props.messageRoom.users.filter( (user, userIndex) => user.username !== props.currentActiveUsername );
            oppositUser = allOppositUsers[0];
        }

        content = (
            <Row onClick={props.onSelectRoom} className={classesPrepared.join(' ')} >
                <Col xs="3" sm="3" md="3" className={classes.SideBarAvatar}>
                    <div className={classes.AvatarIcon}>
                        {/* <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" /> */}
                        <UserAvatar className={classes.UserAvatar} 
                        username={oppositUser.username}></UserAvatar>
                    </div>
                </Col>
                <Col xs="9" sm="9" md="9" className={classes.SideBarMain}>
                    <Row className={classes.SideBarMainRow}>
                        <Col xs="12" sm="12" md="12" className={classes.SideBarRoomName}>
                            <strong className={classes.NameMeta}>{(oppositUser.firstName + ' ' + oppositUser.lastName).substring(0, 20) + "..."}</strong>
                        </Col>
                        <Col xs="12" sm="12" md="12" className={classes.SideBarRoomName}>
                            <span className={classes.NameMeta}>{props.messageRoom.roomName.substring(0, 20) + "..."}</span>
                        </Col>
                        {/* <Col xs="12" sm="12" md="12" className={classes.SideBarDescription}>
                            <span className={classes.NameMeta}>{props.messageRoom.lastMessage.substring(0, 20) + "..."}</span>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        )
    }

    return (
        content
    );
}

export default chatListItem;