import React from 'react';
import UsersListItem from './UsersListItem/UsersListItem';

const usersList = (props) => {   
    let users = [];

    users = props.users.map(((user, index) => {
        return <UsersListItem key={index} {...user}>
        </UsersListItem>
    }));

    return users;
}

export default usersList;