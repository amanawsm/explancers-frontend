import React from 'react';
import * as classes from './UsersListItem.module.css';
import UserAvatar from 'components/UI/UserAvatar/UserAvatar';
import { Progress } from 'reactstrap';
import moment from 'moment';

const usersListItem = (props) => {

    let user = (
        <tr>
            <td className="text-center">
                <UserAvatar username={props.username}
                    className={classes.UserAvatar}>
                </UserAvatar>
            </td>
            <td>
                <div>{props.firstName} {props.lastName}</div>
                <div className="small text-muted">
                    <span>New</span> | Updated: {moment(props.updatedAt).format("MM/DD/YYYY")}
            </div>
            </td>
            <td className="text-center">
                <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
            </td>
            <td>
                <div className="clearfix">
                    {/* <div className="float-left">
                        <strong>50%</strong>
                    </div> */}
                    <div className="float-left">
                        <small className="text-muted">{moment(props.createdAt).format("MM/DD/YYYY")}</small>
                    </div>
                </div>
                {/* <Progress className="progress-xs" color="success" value="50" /> */}
            </td>
            <td className="text-left">
                {props.email}
            </td>
            <td>
                <strong>{props.status}</strong>
            </td>
        </tr>
    );

    return user;
}

export default usersListItem;