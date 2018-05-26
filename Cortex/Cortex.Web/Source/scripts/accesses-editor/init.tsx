import * as ReactDOM from 'react-dom';
import * as React from 'react';
import AccessesEditor from './AccessesEditor';
import User from './models/User';

function getUsers(elementId): User[] {
    const usersElement = document.getElementById(elementId);
    const users: User[] = [];

    for (let i = 0; i < usersElement.children.length; i++) {
        const element = usersElement.children.item(i);

        const id = element.attributes['data-id'].value;
        const name = element.attributes['data-name'].value;
        const userName = element.attributes['data-user-name'].value;

        users.push(new User(id, `${name} <${userName}>`))
    }

    return users;
}

const element = document.getElementById('access-editor');

if (element) {
    const viewMode = Number(element.attributes['data-view-mode'].value);
    const editMode = Number(element.attributes['data-edit-mode'].value);
    const viewUsersElementId = element.attributes['data-view-users-id'].value;
    const editUsersElementId = element.attributes['data-edit-users-id'].value;
    const viewUsers = getUsers(viewUsersElementId);
    const editUsers = getUsers(editUsersElementId);

    ReactDOM.render(<AccessesEditor viewMode={viewMode} editMode={editMode} viewUsers={viewUsers} editUsers={editUsers} />, element);
}